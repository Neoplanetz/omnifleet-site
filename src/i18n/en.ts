import type { Dict } from './types';

export const en = {
  meta: {
    title: 'Omnifleet — Multi-Robot Fleet Control',
    description:
      'Your entire ROS 2 fleet in one browser tab. Live map control, fleet dashboard, safety controls, and record & replay — Omnifleet multi-robot fleet control.',
  },
  nav: { contact: 'Contact', langToggle: '한국어', langLabel: '한국어로 전환' },
  hero: {
    eyebrow: 'MULTI-ROBOT FLEET CONTROL',
    title1: 'Every robot.',
    title2: 'One screen.',
    sub: 'Omnifleet monitors and controls your ROS 2 robot fleet from a single web browser — nothing to install.',
    scrollHint: 'SCROLL',
  },
  showcase: {
    features: [
      {
        kicker: 'Live map control',
        title: 'Your whole fleet on the map. Live.',
        body: 'Every robot’s position, planned path, and goal updates in real time on the occupancy grid. Zoom, pan, select — full situational awareness on one screen.',
      },
      {
        kicker: 'Fleet dashboard',
        title: 'Status you see before you ask.',
        body: 'Per-robot battery, task assignment, and localization confidence rolled into cards and KPIs. Anomalies surface faster than numbers can.',
      },
      {
        kicker: 'Control & safety',
        title: 'Emergency stop. One click away.',
        body: 'Send navigation goals by clicking the map or picking a saved location, and stop a robot instantly in an emergency. Battery, e-stop, and localization events arrive as live alerts.',
      },
      {
        kicker: 'Record & replay',
        title: 'Rewind any run.',
        body: 'Record fleet operations and scrub back through the timeline. Events and trajectories replay over the map — see exactly what happened on site.',
      },
    ],
  },
  stats: [
    { value: '10+', label: 'robots controlled at once' },
    { value: '0', label: 'installs — just a browser' },
    { value: '60min', label: 'continuous recording' },
    { value: '24/7', label: 'anomaly watch' },
  ],
  intel: {
    eyebrow: 'INTELLIGENT OPERATIONS',
    title: 'The system watches. You decide.',
    anomaly: {
      kicker: 'Live anomaly detection',
      title: 'Anomalies have nowhere to hide.',
      body: "Low battery, emergency stops, degraded localization confidence — every robot’s telemetry is monitored in real time, and anomalies are flagged the moment they appear. Even when no one is watching the screen.",
      alerts: [
        { level: 'critical', title: 'Emergency stop — robot_0', meta: '12s ago · emg_state = 1' },
        { level: 'warning', title: 'Low battery — robot_2', meta: 'battery 18% · threshold 20%' },
        { level: 'warning', title: 'Localization confidence drop — robot_3', meta: 'converged = false' },
      ],
    },
    copilot: {
      kicker: 'Fleet copilot',
      title: 'Just ask your fleet.',
      body: 'The fleet copilot reads live fleet data and answers in plain language. Robot status, task progress, anomalies — ask in one line instead of digging through dashboards.',
      chat: [
        { role: 'user', text: 'How is robot_2 doing?' },
        { role: 'bot', text: 'robot_2 is running pickup-4 → delivery-21. Battery 71%, localization healthy, no anomalies in the last 5 minutes.' },
        { role: 'user', text: 'Which robot has the lowest battery?' },
        { role: 'bot', text: 'robot_0 at 23% — about 40 minutes of runtime left. I recommend returning it to the charging station.' },
      ],
      hint: 'Summon anywhere with Ctrl + /',
    },
  },
  grid: {
    eyebrow: 'AND MORE',
    title: 'Everything else a control room needs.',
    items: [
      { title: 'Live camera', body: "Stream each robot’s onboard camera right in cards and on the map." },
      { title: 'Task monitoring', body: 'Track per-robot task assignment, progress, and history in real time.' },
      { title: 'Operations log', body: 'Task progress and events recorded and filterable per robot.' },
      { title: 'Operator accounts', body: 'Per-operator login and account management. Clean handovers across shifts.' },
      { title: 'KO / EN interface', body: 'Operators switch the dashboard language themselves.' },
      { title: 'Mobile & tablet ready', body: 'The same dashboard from the control room desktop to a tablet on the floor.' },
    ],
  },
  env: {
    eyebrow: 'WORKS WITH YOUR ROBOTS',
    title: 'No robot code changes. Just rosbridge.',
    body: 'If it runs ROS 2, one rosbridge WebSocket connects it. No firmware or node changes — over LAN, VPN, or Tailscale.',
    diagram: { robots: 'ROS 2 robots', bridge: 'rosbridge', browser: 'Web browser' },
    chips: ['ROS 2', 'rosbridge_suite', 'Topic-subscribe map mode', 'Local image map mode', 'LAN · VPN · Tailscale', 'Chrome · Edge · Safari'],
  },
  cta: {
    title: 'Omnifleet, on your floor.',
    sub: 'We’ll help with demos and deployment.',
    button: 'Get in touch',
    mailSubject: 'Omnifleet inquiry',
    copyright: '© 2026 Omnifleet. All rights reserved.',
  },
} satisfies Dict;
