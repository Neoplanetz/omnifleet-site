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
    { value: '4+', label: 'robots controlled at once' },
    { value: '0', label: 'installs — just a browser' },
    { value: '60min', label: 'continuous recording' },
    { value: '2', label: 'map source modes' },
  ],
  grid: {
    eyebrow: 'AND MORE',
    title: 'Everything else a control room needs.',
    items: [
      { title: 'AI copilot', body: 'Ask about fleet status in plain language. The fastest way to read your telemetry.' },
      { title: 'Live event alerts', body: 'Low battery, emergency stops, and localization loss detected and announced instantly.' },
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
