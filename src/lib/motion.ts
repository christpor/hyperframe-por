/**
 * Decompiled HyperFrames scale function `rd(top, height, vh)`:
 * Math.min(1, Math.max(0.5, (vh - top - 32) / height))
 */
export function calculateHeroScale(
  top: number,
  height: number,
  viewportHeight: number
): number {
  if (height <= 0) return 1;
  const raw = (viewportHeight - top - 32) / height;
  return Math.min(1, Math.max(0.5, raw));
}
