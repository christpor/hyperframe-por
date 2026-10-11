import { describe, expect, it } from "bun:test";
import { SHOWCASE_PROMPTS, SHOWCASE_TEMPLATES } from "../src/data/templateData";

describe("TemplateShowcase data contracts", () => {
  it("includes signature prompt from screenshot", () => {
    expect(SHOWCASE_PROMPTS).toContain(
      "Add music and sound effects to my vlog"
    );
  });

  it("contains 6 authentic template compositions with live mp4 assets", () => {
    expect(SHOWCASE_TEMPLATES.length).toBe(6);
    SHOWCASE_TEMPLATES.forEach((tpl) => {
      expect(tpl.videoUrl).toMatch(/^https:\/\/static\.heygen\.ai\/.*\.mp4$/);
      expect(tpl.id).toBeDefined();
      expect(tpl.title).toBeDefined();
    });
  });

  it("includes Notion, Stripe, and Claude Code templates", () => {
    const ids = SHOWCASE_TEMPLATES.map((t) => t.id);
    expect(ids).toContain("notion");
    expect(ids).toContain("stripe");
    expect(ids).toContain("claude");
  });
});
