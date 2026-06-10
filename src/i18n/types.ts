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
