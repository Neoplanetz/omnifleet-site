# omnifleet-site

Marketing landing page for [Omnifleet](https://github.com/Neoplanetz) — a multi-robot
fleet control dashboard for ROS 2. Apple-style dark single page, Korean (`/`) and
English (`/en/`), deployed on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # i18n parity + tsc + astro build → dist/
npm run preview
```

## Media pipeline

`public/videos/*.{mp4,webm}` + `public/posters/*.jpg` are real omnifleet dashboard
screen recordings captured 2026-06 against a rosbag-driven dev instance.

**Re-capture:**

```bash
OMNIFLEET_CAPTURE_ID=<operator> OMNIFLEET_CAPTURE_PW=<password> node scripts/capture.mjs
```

Requires a running dashboard (`OMNIFLEET_BASE_URL`, default `http://localhost:3000`)
with rosbridge + rosbag live, and optional
`OMNIFLEET_ROS_HOST` / `OMNIFLEET_ROS_PORT` (default `localhost:9090`).

`PROBE=1` runs a non-recording probe pass (short dwells, screenshots to `/tmp`) to
verify navigation without committing to a full recording session.

The script records one headless-Chromium session and writes a raw `.webm` +
`capture-out/markers.json` (gitignored). Cut showcase clips using the ffmpeg commands
in the `scripts/capture.mjs` header comment. Keep every file under 10 MB
(Cloudflare Pages limit: 25 MB/file).

`scripts/make-placeholders.sh` regenerates dark animated-gradient stand-ins if you
ever need to develop without the real footage.

## Deploy

Cloudflare Pages, GitHub integration: build `npm run build`, output `dist`,
env `NODE_VERSION=22`.
