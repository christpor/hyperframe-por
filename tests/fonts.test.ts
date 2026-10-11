import { describe, expect, it } from "bun:test";
import { existsSync, statSync, readFileSync } from "node:fs";

describe("Typography & Webfont Verification", () => {
  it("bundles ABC Solar Display Bold woff2", () => {
    const path = "public/fonts/ABCSolarDisplay-Bold.woff2";
    expect(existsSync(path)).toBe(true);
    expect(statSync(path).size).toBeGreaterThan(100000);
  });

  it("bundles Studio TT Norms light, regular, and bold woff2 files", () => {
    const files = [
      "public/fonts/tt-norms-light.woff2",
      "public/fonts/tt-norms-regular.woff2",
      "public/fonts/tt-norms-bold.woff2",
    ];
    files.forEach((f) => {
      expect(existsSync(f)).toBe(true);
      expect(statSync(f).size).toBeGreaterThan(120000);
    });
  });

  it("declares font-family rules in globals.css", () => {
    const css = readFileSync("src/app/globals.css", "utf-8");
    expect(css).toContain("font-family: 'ABC Solar Display'");
    expect(css).toContain("font-family: 'Studio TT Norms'");
    expect(css).toContain("/fonts/ABCSolarDisplay-Bold.woff2");
    expect(css).toContain("/fonts/tt-norms-regular.woff2");
  });
});
