import { describe, expect, it } from "bun:test";
import { calculateHeroScale } from "../src/lib/motion";

describe("HyperFrames kinetic motion contracts", () => {
  it("clamps scale to minimum 0.5 when card is positioned below viewport", () => {
    // top = 1000, height = 600, vh = 800 -> (800 - 1000 - 32) / 600 < 0
    const scale = calculateHeroScale(1000, 600, 800);
    expect(scale).toBe(0.5);
  });

  it("clamps scale to maximum 1.0 when card is fully entered", () => {
    // top = 50, height = 500, vh = 900 -> (900 - 50 - 32) / 500 = 818/500 > 1.0
    const scale = calculateHeroScale(50, 500, 900);
    expect(scale).toBe(1.0);
  });

  it("calculates proportional intermediate scale smoothly", () => {
    // vh = 1000, top = 500, height = 600 -> (1000 - 500 - 32) / 600 = 468 / 600 = 0.78
    const scale = calculateHeroScale(500, 600, 1000);
    expect(scale).toBeCloseTo(0.78, 2);
  });

  it("safely handles 0 height without division by zero", () => {
    const scale = calculateHeroScale(100, 0, 800);
    expect(scale).toBe(1);
  });
});
