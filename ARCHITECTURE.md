# Architecture & Specification — HyperFrames Studio Clone

## 1. Executive Context & Anti-Goals
- **Target Site**: `https://www.hyperframes.dev`
- **Objective**: 100% pixel-perfect, zero-slop Next.js (App Router) + Tailwind CSS + TypeScript clone featuring the live WebGL2 iridescent shader background, GSAP ScrollTrigger + Lenis kinetic scaling hero card, authentic HeyGen video streams, multi-platform download drawer, prompt demo carousel, and live OSS metric counters.
- **Anti-Goals**:
  - NO emojis anywhere in buttons, cards, or navigation (strictly `lucide-react` or clean SVGs).
  - NO flat colored placeholder boxes (`bg-emerald-700`, etc.) — all media uses authentic scraped CDN assets or vector geometry.
  - NO heavy backend server or external DB requirement for this static/client-hydrated showcase.
  - NO unverified hand-wavy scroll mechanics — exact formula: `scale = Math.min(1, Math.max(0.5, (vh - top - 32) / height))` scrubbed via GSAP ScrollTrigger and smoothed with Lenis.

---

## 2. MADR Decision Graph & Trade-Offs

### MADR-001: WebGL2 Fragment Shader for Pearlescent Iridescent Background
- **Context**: HyperFrames uses a custom WebGL2 shader on `.sr-ground-canvas` layered under a `.sr-ground-veil` (`#f7ecd3cc`) to achieve a silky, chromatic oil-slick / prism ambient glow.
- **Decision**: Embed the exact GLSL fragment shader (`distort(vec2 p, float offset)` with domain warping and `pow(..., uColorScale)`) in a canvas component with `ResizeObserver`, visibility pause, and `prefers-reduced-motion` detection.
- **Trade-off**: Requires WebGL2 context; graceful fallback to smooth CSS radial/conic gradient if WebGL2 is unsupported or device has reduced motion enabled.

### MADR-002: GSAP ScrollTrigger + Lenis for Kinetic Viewport Scaling
- **Context**: The hero video card starts embedded inside a rounded frame and progressively scales up smoothly to 1.0x (full container width) as the user scrolls down into the viewport.
- **Decision**: Combine Lenis smooth scrolling (duration: 1.1s) with GSAP ScrollTrigger scrub (`trigger: heroRef, start: 0, end: "top 10%", scrub: true, invalidateOnRefresh: true`).
- **Trade-off**: Requires careful cleanup in `useEffect` / `useLayoutEffect` to prevent memory leaks and hydration mismatches. Lenis must ignore scroll-locked modals using `data-lenis-prevent`.

### MADR-003: Asset Pipeline & Media Optimization
- **Context**: Media elements include HeyGen studio video (`studio-launch-nib-sf-audio.mp4`), poster image, brand fonts (`ABCSolarDisplay-Bold`, `TT_Norms_Pro`), and template videos.
- **Decision**: Stream high-res media directly from official high-availability CDNs (`static.heygen.ai`) with local SVG fallbacks and preloaded poster frames, adhering to the 15MB local bundle ceiling.

---

## 3. Strict TypeScript Data Contracts

```typescript
export interface StudioCopy {
  name: string;
  nameLight: string;
  headlineLines: string[];
  headline: string;
  sub: string;
}

export interface RepoStats {
  stars: number;
  forks: number;
  contributors: number;
  npmWeek: number;
}

export interface TemplateShowcaseItem {
  id: string;
  title: string;
  category: "showcase" | "primitive" | "composition";
  videoUrl: string;
  posterUrl?: string;
  tags: string[];
}

export interface DownloadPlatform {
  os: "macos" | "windows" | "linux" | "enterprise";
  label: string;
  badge?: string;
  formats: {
    arch: string;
    ext: string;
    url?: string;
    comingSoon?: boolean;
  }[];
}
```

---

## 4. TDD Test Matrix

| Layer | Target Component / Unit | Test Gate | Verification Command |
|---|---|---|---|
| **Shader & Canvas** | `IridescentCanvas` | Mounts cleanly, checks WebGL2 context, handles resize & cleanup | `bun test tests/shader.test.ts` |
| **Kinetic Motion** | `scaleFormula (rd)` | Math boundary conditions (clamps between 0.5 and 1.0) | `bun test tests/motion.test.ts` |
| **OSS Stats** | `RepoStats` formatter | Correct numeric abbreviation (`60.6k`, `750.3k`, `5.4k`) | `bun test tests/stats.test.ts` |
| **Download Drawer** | `DownloadDrawer` | Platform selection & link integrity | `bun test tests/download.test.ts` |
| **Integration Build** | Next.js App Router | Strict TypeScript check + production bundle compile | `bun run build` |
