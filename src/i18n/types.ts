export interface ShowcaseFeature {
  kicker: string;
  title: string;
  body: string;
}

export interface Dict {
  meta: { title: string; description: string };
  nav: { contact: string; langToggle: string; langLabel: string };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    sub: string;
    scrollHint: string;
  };
  showcase: { features: ShowcaseFeature[] };
  stats: { value: string; label: string }[];
  intel: {
    eyebrow: string;
    title: string;
    anomaly: {
      kicker: string;
      title: string;
      body: string;
      alerts: { level: 'critical' | 'warning'; title: string; meta: string }[];
    };
    copilot: {
      kicker: string;
      title: string;
      body: string;
      chat: { role: 'user' | 'bot'; text: string }[];
      hint: string;
    };
  };
  grid: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  env: {
    eyebrow: string;
    title: string;
    body: string;
    diagram: { robots: string; bridge: string; browser: string };
    chips: string[];
  };
  cta: {
    title: string;
    sub: string;
    button: string;
    mailSubject: string;
    copyright: string;
  };
}
