// Scenario-driven screen recorder for the LIVE omnifleet dashboard.
//
// Records ONE long headless-Chromium session (1920x1080 webm) while driving
// five scenarios (hero / map / dashboard / control / replay) and emits a
// marker table (elapsed seconds per scenario) used by ffmpeg post-processing
// to cut the site's showcase clips.
//
// Usage:
//   probe (no video, short dwells, /tmp screenshots):
//     PROBE=1 OMNIFLEET_CAPTURE_ID=... OMNIFLEET_CAPTURE_PW=... node scripts/capture.mjs
//   real recorded run:
//     OMNIFLEET_CAPTURE_ID=... OMNIFLEET_CAPTURE_PW=... node scripts/capture.mjs
//
// Required env: OMNIFLEET_CAPTURE_ID / OMNIFLEET_CAPTURE_PW (operator login).
// Optional env: OMNIFLEET_BASE_URL (default http://localhost:3000),
//               OMNIFLEET_ROS_HOST / OMNIFLEET_ROS_PORT (default localhost:9090).
//
// Hard-won constraints respected here:
//  - page.goto() KILLS the rosbridge connection -> after Connect, navigate
//    ONLY via in-app sidebar links (next/link preserves the connection).
//  - Left-drag on the map canvas ROTATES; pan requires Shift+drag.
//  - Map wheel zoom: positive deltaY zooms IN (ZoomView.zoom ratio > 1).
//  - Robot registry defaults already define robot_0..robot_3 enabled, and a
//    fresh browser context has empty localStorage, so the defaults apply.

import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const PROBE = process.env.PROBE === '1';
const BASE = process.env.OMNIFLEET_BASE_URL ?? 'http://localhost:3000';
const ROS_HOST = process.env.OMNIFLEET_ROS_HOST ?? 'localhost';
const ROS_PORT = process.env.OMNIFLEET_ROS_PORT ?? '9090';
const LOGIN_ID = process.env.OMNIFLEET_CAPTURE_ID;
const LOGIN_PW = process.env.OMNIFLEET_CAPTURE_PW;

const OUT_DIR = 'capture-out';
const SHOT_DIR = '/tmp/omnifleet-capture-probe';

if (!LOGIN_ID || !LOGIN_PW) {
  console.error('Set OMNIFLEET_CAPTURE_ID and OMNIFLEET_CAPTURE_PW env vars.');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
if (PROBE) mkdirSync(SHOT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** Dwell: pure "let the video breathe" waits — heavily shortened in probe mode. */
const dwell = (ms) => sleep(PROBE ? Math.min(ms, Math.round(ms * 0.12)) : ms);

const markers = [];
let t0 = 0;
const elapsedSec = () => Math.round((Date.now() - t0) / 100) / 10;
function mark(scenario, phase) {
  const t = elapsedSec();
  markers.push({ scenario, phase, t });
  console.log(`[marker] ${scenario}.${phase} @ ${t}s`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ...(PROBE
      ? {}
      : { recordVideo: { dir: OUT_DIR, size: { width: 1920, height: 1080 } } }),
  });
  const page = await context.newPage();
  t0 = Date.now(); // video timeline starts at page creation

  page.on('pageerror', (e) => console.log('[pageerror]', e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') console.log('[console.error]', m.text().slice(0, 300));
  });

  const shot = async (name) => {
    if (!PROBE) return;
    await page.screenshot({ path: `${SHOT_DIR}/${name}.png` });
    console.log(`[shot] ${SHOT_DIR}/${name}.png`);
  };

  // Sidebar nav helper — in-app <Link> only, never page.goto() after Connect.
  const navTo = async (href) => {
    await page.locator(`aside a[href="${href}"]`).first().click();
    await page.waitForURL(`**${href}`, { timeout: 15_000 });
  };

  // Wait until the first canvas shows real map content (not a blank fill).
  const waitForMapPixels = async (timeout = 60_000) => {
    await page.waitForSelector('canvas', { timeout });
    await page.waitForFunction(
      () => {
        const c = document.querySelector('canvas');
        if (!c || c.width === 0) return false;
        const ctx = c.getContext('2d');
        if (!ctx) return false;
        const d = ctx.getImageData(0, 0, c.width, c.height).data;
        const colors = new Set();
        for (let i = 0; i < d.length; i += 4 * 1009) {
          colors.add(`${d[i]},${d[i + 1]},${d[i + 2]}`);
          if (colors.size > 4) return true;
        }
        return false;
      },
      { timeout },
    );
  };

  // ---------------------------------------------------------------- setup --
  console.log('[step] login');
  await page.goto(`${BASE}/map`, { waitUntil: 'domcontentloaded' });
  await page.fill('#auth-username', LOGIN_ID);
  await page.fill('#auth-password', LOGIN_PW);
  await page.click('[data-testid="login-submit"]');
  await page.waitForSelector('input[aria-label="Rosbridge host"]', { timeout: 20_000 });
  await shot('01-after-login');

  console.log('[step] connect rosbridge');
  await page.fill('input[aria-label="Rosbridge host"]', ROS_HOST);
  await page.fill('input[aria-label="Rosbridge port"]', ROS_PORT);
  await page.getByRole('button', { name: 'Connect', exact: true }).click();
  await page
    .locator('[data-testid="connection-status"]', { hasText: 'Connected' })
    .first()
    .waitFor({ timeout: 30_000 });
  console.log('[step] wait for map + robots');
  await waitForMapPixels();
  await sleep(PROBE ? 1500 : 5000); // let robot poses/paths arrive and settle
  await shot('02-map-connected');

  // ------------------------------------------------------- start recorder --
  console.log('[step] start footer recorder (/analysis)');
  await navTo('/analysis');
  const startBtn = page.getByRole('button', { name: '녹화 시작' });
  await startBtn.waitFor({ timeout: 10_000 });
  await page.waitForFunction(
    () => {
      const btns = [...document.querySelectorAll('button')];
      const b = btns.find((el) => el.textContent?.includes('녹화 시작'));
      return b && !b.disabled;
    },
    { timeout: 15_000 },
  );
  await startBtn.click();
  await page.getByRole('button', { name: '중지' }).waitFor({ timeout: 10_000 });
  await shot('03-recording-started');

  // ----------------------------------------------------------------- hero --
  console.log('[scenario] hero');
  await navTo('/map');
  await waitForMapPixels();
  await sleep(PROBE ? 500 : 2000);
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  // The rosbag map is a wide thin band; auto-fit leaves the fleet small.
  // Pre-frame: moderate zoom anchored on the active robot cluster (sits
  // slightly right of canvas center) so all 4 robots fill the frame.
  const ax = box.x + box.width * 0.58;
  const ay = box.y + box.height * 0.46;
  await page.mouse.move(ax, ay);
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 120);
    await sleep(110);
  }
  await sleep(PROBE ? 300 : 1000);
  mark('hero', 'start');
  await dwell(30_000); // steady wide framing, all robots moving — no interaction
  mark('hero', 'end');
  await shot('04-hero');

  // ------------------------------------------------------------------ map --
  console.log('[scenario] map (zoom / pan / select)');
  mark('map', 'start');

  // Smooth wheel zoom IN (positive deltaY = zoom in for this viewer),
  // continuing from the hero framing, still anchored on the fleet.
  await page.mouse.move(ax, ay);
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 120);
    await sleep(110);
  }
  await dwell(3000);
  await shot('05-map-zoomed');

  // Pan: Shift+drag (left-drag rotates in this viewer — avoid).
  const smoothDrag = async (fromX, fromY, toX, toY, steps = 28) => {
    await page.keyboard.down('Shift');
    await page.mouse.move(fromX, fromY);
    await page.mouse.down();
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(
        fromX + ((toX - fromX) * i) / steps,
        fromY + ((toY - fromY) * i) / steps,
      );
      await sleep(33);
    }
    await page.mouse.up();
    await page.keyboard.up('Shift');
  };
  await smoothDrag(cx, cy, cx - 320, cy - 160);
  await dwell(3000);
  await smoothDrag(cx, cy, cx + 300, cy + 140);
  await dwell(2500);
  await shot('06-map-panned');

  // Robot select highlight via keyboard (1..4 toggle selection).
  await page.keyboard.press('1');
  await dwell(3500);
  await page.keyboard.press('2');
  await dwell(3500);
  await page.keyboard.press('Escape');
  await dwell(1500);

  // Gentle zoom back out.
  await page.mouse.move(cx, cy);
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, -120);
    await sleep(110);
  }
  await dwell(2500);
  mark('map', 'end');
  await shot('07-map-selected');

  // ------------------------------------------------------------ dashboard --
  console.log('[scenario] dashboard');
  await navTo('/dashboard');
  await sleep(PROBE ? 800 : 3000);
  mark('dashboard', 'start');
  await dwell(25_000); // KPIs / cards updating live
  mark('dashboard', 'end');
  await shot('08-dashboard');

  // -------------------------------------------------------------- control --
  console.log('[scenario] control (goal + EMG on robot_0)');
  await navTo('/robot');
  await page.getByRole('button', { name: '목표 위치 전송' }).waitFor({ timeout: 15_000 });
  await sleep(PROBE ? 500 : 2500);
  mark('control', 'start');
  await dwell(3000);

  const xInput = page.locator('label', { hasText: 'X (m)' }).locator('input');
  const yInput = page.locator('label', { hasText: 'Y (m)' }).locator('input');
  const yawInput = page.locator('label', { hasText: 'Yaw' }).locator('input');
  await xInput.click();
  await xInput.pressSequentially('2.0', { delay: 140 });
  await yInput.click();
  await yInput.pressSequentially('1.5', { delay: 140 });
  await yawInput.click();
  await yawInput.pressSequentially('90', { delay: 140 });
  await dwell(1200);
  await page.getByRole('button', { name: '목표 위치 전송' }).click();
  await dwell(5000);
  await shot('09-goal-sent');

  // EMG (safe: rosbag replay, no real robot). Trigger -> confirm dialog.
  await page.getByRole('button', { name: '긴급 정지', exact: true }).click();
  await page.getByRole('button', { name: '긴급 정지 전송' }).waitFor({ timeout: 5000 });
  await dwell(2000);
  await page.getByRole('button', { name: '긴급 정지 전송' }).click();
  await dwell(8000);
  mark('control', 'end');
  await shot('10-emg-fired');

  // ------------------------------------------------------- stop recorder --
  console.log('[step] stop footer recorder');
  await navTo('/analysis');
  await page.getByRole('button', { name: '중지' }).click();
  // stopping -> idle; session row appears with a playback link
  const openLink = page.locator('a[href^="/analysis/playback/"]').first();
  await openLink.waitFor({ timeout: 30_000 });
  await sleep(PROBE ? 500 : 1500);
  await shot('11-session-saved');

  // --------------------------------------------------------------- replay --
  console.log('[scenario] replay (playback of the recorded session)');
  await openLink.click();
  await page.waitForURL('**/analysis/playback/**', { timeout: 15_000 });
  await page.locator('[data-testid="timeline-track"]').waitFor({ timeout: 30_000 });
  await sleep(PROBE ? 800 : 2500);
  mark('replay', 'start');
  await page.getByRole('button', { name: '재생', exact: true }).click();
  await dwell(10_000);
  // bump speed for visual variety
  await page.getByRole('button', { name: '2×', exact: true }).click();
  await dwell(8000);
  // scrub: click ~40% into the timeline track
  const track = page.locator('[data-testid="timeline-track"]');
  const tbox = await track.boundingBox();
  await page.mouse.click(tbox.x + tbox.width * 0.4, tbox.y + tbox.height / 2);
  await dwell(2000);
  // resume playing if scrub paused it (toggle only when label shows 재생)
  const playBtn = page.getByRole('button', { name: '재생', exact: true });
  if (await playBtn.count()) await playBtn.click();
  await dwell(12_000);
  mark('replay', 'end');
  await shot('12-replay');

  // ----------------------------------------------------------------- done --
  const videoHandle = PROBE ? null : page.video();
  await context.close(); // flushes the webm
  const videoPath = videoHandle ? await videoHandle.path() : null;
  await browser.close();

  const table = {};
  for (const m of markers) {
    table[m.scenario] = table[m.scenario] ?? {};
    table[m.scenario][m.phase] = m.t;
  }
  const result = { videoPath, baseUrl: BASE, probe: PROBE, markers: table };
  writeFileSync(`${OUT_DIR}/markers.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  if (videoPath) console.log(`[video] ${videoPath}`);
}

main().catch((e) => {
  console.error('[capture] FAILED:', e);
  process.exit(1);
});
