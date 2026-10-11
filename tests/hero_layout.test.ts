import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";

describe("Hero Visual Parity & Typography Layout", () => {
  it("uses Studio TT Norms font styling on brand headings and headline", () => {
    const heroCode = readFileSync(
      "src/features/hero/StudioHero.tsx",
      "utf-8"
    );
    expect(heroCode).toContain("text-6xl sm:text-8xl");
    expect(heroCode).toContain("Studio_TT_Norms");
    expect(heroCode).toContain("Download for Linux");
  });

  it("navbar uses official SVG logo instead of plain text", () => {
    const navCode = readFileSync(
      "src/components/common/Navbar.tsx",
      "utf-8"
    );
    expect(navCode).toContain("/logo-dark.svg");
    expect(navCode).toContain("Log in");
  });

  it("removes redundant explore docs button from hero", () => {
    const heroCode = readFileSync(
      "src/features/hero/StudioHero.tsx",
      "utf-8"
    );
    expect(heroCode).not.toContain("Explore Docs");
  });
});
