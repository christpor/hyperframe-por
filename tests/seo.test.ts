import { describe, expect, it } from "bun:test";
import { existsSync, readFileSync, statSync } from "node:fs";

describe("SEO & Favicon Verification", () => {
  it("bundles SVG favicons in public directory", () => {
    expect(existsSync("public/favicon-dark.svg")).toBe(true);
    expect(existsSync("public/favicon-light.svg")).toBe(true);
    expect(existsSync("public/favicon.svg")).toBe(true);
    expect(existsSync("src/app/icon.svg")).toBe(true);
    expect(statSync("public/favicon-dark.svg").size).toBeGreaterThan(500);
  });

  it("bundles official HeyGen HyperFrames SVG logos", () => {
    expect(existsSync("public/logo-dark.svg")).toBe(true);
    expect(existsSync("public/logo-light.svg")).toBe(true);
    expect(statSync("public/logo-dark.svg").size).toBeGreaterThan(2000);
  });

  it("declares icon and SEO metadata in layout.tsx", () => {
    const layout = readFileSync("src/app/layout.tsx", "utf-8");
    expect(layout).toContain("HyperFrames Studio — HyperFrames");
    expect(layout).toContain("/favicon-dark.svg");
    expect(layout).toContain("image/svg+xml");
    expect(layout).toContain("summary_large_image");
  });
});
