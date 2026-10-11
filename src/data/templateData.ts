export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  description: string;
}

export const SHOWCASE_PROMPTS = [
  "Add music and sound effects to my vlog",
  "Generate a 3D product reveal for my SaaS release",
  "Animate an interactive Spotify-style bento card",
  "Compose a cinematic launch clip with kinetic typography",
  "Create an animated code review breakdown with Claude",
];

export const SHOWCASE_TEMPLATES: TemplateItem[] = [
  {
    id: "notion",
    title: "Notion Workflow",
    category: "Showcase",
    videoUrl:
      "https://static.heygen.ai/hyperframes/templates/showcase/tpl-notion.mp4",
    description: "Modular workspace walkthrough with animated cards",
  },
  {
    id: "stripe",
    title: "Stripe Billing Flow",
    category: "Composition",
    videoUrl:
      "https://static.heygen.ai/hyperframes/templates/showcase/tpl-stripe.mp4",
    description: "Fintech payment processing visual sequence",
  },
  {
    id: "raycast",
    title: "Raycast Command Bar",
    category: "Showcase",
    videoUrl:
      "https://static.heygen.ai/hyperframes/templates/showcase/tpl-raycast.mp4",
    description: "Sub-second keyboard action reveal",
  },
  {
    id: "dribbble",
    title: "Dribbble Shot Carousel",
    category: "Primitive",
    videoUrl:
      "https://static.heygen.ai/hyperframes/templates/showcase/tpl-dribbble.mp4",
    description: "Design portfolio kinetic showcase",
  },
  {
    id: "spotify",
    title: "Spotify Bento Composition",
    category: "Composition",
    videoUrl:
      "https://static.heygen.ai/hyperframes/templates/compositions/spotify-bento/renders/spotify-bento.mp4",
    description: "High-density audio streaming stats composition",
  },
  {
    id: "claude",
    title: "Claude Code Fights Back",
    category: "Showcase",
    videoUrl:
      "https://static.heygen.ai/hyperframes/templates/compositions/claude-code-fights-back/renders/claude-code-fights-back.mp4",
    description: "Terminal coding duel with deterministic timing",
  },
];
