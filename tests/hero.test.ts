import { describe, expect, it } from "bun:test";
import { STUDIO_DATA } from "../src/data/studioData";
import { calculateHeroScale } from "../src/lib/motion";

describe("StudioHero Data and Kinetic Contracts", () => {
  it("includes official HyperFrames studio video asset url", () => {
    expect(STUDIO_DATA.videoUrl).toContain(
      "https://static.heygen.ai/hyperframes-oss/site/studio-launch-nib-sf-audio.mp4"
    );
    expect(STUDIO_DATA.posterUrl).toContain(
      "https://static.heygen.ai/hyperframes-oss/site/studio-launch-nib-sf-audio-poster.jpg"
    );
  });

  it("includes correct brand copy and headline", () => {
    expect(STUDIO_DATA.brand).toBe("HyperFrames");
    expect(STUDIO_DATA.brandLight).toBe("Studio");
    expect(STUDIO_DATA.headline).toBe("The video editor built for agents.");
  });

  it("calculates initial scale on simulated viewport entry", () => {
    // Simulated initial render in 1080p viewport with hero card top at 400px and height 600px
    const initialScale = calculateHeroScale(400, 600, 1080);
    // (1080 - 400 - 32) / 600 = 648 / 600 = 1.08 -> clamped to 1.0
    expect(initialScale).toBe(1.0);

    // When card is below the fold: top at 900px, height 600px, vh 1080
    // (1080 - 900 - 32) / 600 = 148 / 600 = 0.246 -> clamped to 0.5
    const belowFoldScale = calculateHeroScale(900, 600, 1080);
    expect(belowFoldScale).toBe(0.5);
  });
});
