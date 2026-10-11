import { describe, expect, it } from "bun:test";
import { formatCompactNumber } from "../src/lib/formatters";
import { STUDIO_DATA } from "../src/data/studioData";

describe("OpenSourceStats formatting contracts", () => {
  it("formats GitHub stars accurately", () => {
    // 60612 -> "60.6k"
    expect(formatCompactNumber(60612)).toBe("60.6k");
  });

  it("formats npm weekly downloads accurately", () => {
    // 750349 -> "750.3k"
    expect(formatCompactNumber(750349)).toBe("750.3k");
  });

  it("formats forks accurately", () => {
    // 5418 -> "5.4k"
    expect(formatCompactNumber(5418)).toBe("5.4k");
  });

  it("leaves sub-thousand numbers unchanged", () => {
    expect(formatCompactNumber(83)).toBe("83");
  });

  it("contains correct npx installation command", () => {
    expect(STUDIO_DATA.skillCommand).toBe(
      "npx skills add heygen-com/hyperframes"
    );
  });
});
