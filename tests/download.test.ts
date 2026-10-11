import { describe, expect, it } from "bun:test";
import { DOWNLOAD_OPTIONS } from "../src/data/downloadData";

describe("DownloadDrawer platform configurations", () => {
  it("includes all target platforms from official landing page", () => {
    const platforms = DOWNLOAD_OPTIONS.map((o) => o.platform);
    expect(platforms).toContain("macOS");
    expect(platforms).toContain("Windows");
    expect(platforms).toContain("Linux");
    expect(platforms).toContain("Enterprise deployment");
  });

  it("includes Linux .deb and AppImage options", () => {
    const linuxOptions = DOWNLOAD_OPTIONS.filter((o) => o.platform === "Linux");
    const formats = linuxOptions.map((o) => o.format);
    expect(formats).toContain(".deb");
    expect(formats).toContain("AppImage");
  });

  it("marks Windows arm64 as coming soon", () => {
    const winArm = DOWNLOAD_OPTIONS.find((o) => o.id === "win-arm");
    expect(winArm?.isComingSoon).toBe(true);
    expect(winArm?.actionText).toBe("Coming soon");
  });

  it("links Enterprise to sales contact form", () => {
    const enterprise = DOWNLOAD_OPTIONS.find((o) => o.id === "enterprise");
    expect(enterprise?.url).toBe("https://www.heygen.com/contact-us/sales");
  });
});
