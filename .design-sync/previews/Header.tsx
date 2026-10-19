import { Header } from "team-slug";

// Ported from src/pages.ts — the generic content-page hero, shown with two
// real title/lead pairs to sweep title length (a one-word page vs. a
// multi-word one) while the lede stays a short, punchy tagline either way.
export function Default() {
  return <Header title="Model" lead="Predict. Simulate. Refine." />;
}

export function LongTitle() {
  return (
    <Header
      title="Collaboration and Partnership"
      lead="Better together."
    />
  );
}
