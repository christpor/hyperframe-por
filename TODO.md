# TODO — HyperFrames Studio Flagship Clone
<!-- agent-gate: on | max_loops: 8 -->
Goal: 100% pixel-perfect HyperFrames Studio clone with WebGL2 iridescent shader, GSAP kinetic scroll, and real video assets.
States: [ ] todo · [~] doing · [x] done (harness re-verifies) · [?] research needed · [!] blocked (reason required)

- [x] T0: Recon — verify extracted shader, scroll formulas, and asset manifest | file: .scratchpad/recon.md | verify: `test -f .scratchpad/recon.md`
- [x] T1: Project scaffold & motion math contracts | file: tests/motion.test.ts | verify: `bun test tests/motion.test.ts`
- [x] T2: WebGL2 iridescent background shader canvas and veil | file: src/components/ui/IridescentCanvas.tsx | verify: `bun test tests/shader.test.ts`
- [x] T3: Kinetic scaling hero card with exact GSAP ScrollTrigger formula + Lenis | file: src/features/hero/StudioHero.tsx | verify: `bun test tests/hero.test.ts`
- [x] T4: Open Source metrics bar with real numbers and copyable npx command | file: src/features/oss/OpenSourceStats.tsx | verify: `bun test tests/stats.test.ts`
- [x] T5: Interactive prompt carousel and template showcase video grid | file: src/features/showcase/TemplateShowcase.tsx | verify: `bun test tests/showcase.test.ts`
- [ ] T6: Multi-platform OS download drawer with platform selection | file: src/features/download/DownloadDrawer.tsx | verify: `bun test tests/download.test.ts`
- [ ] T7: Integration build + full production compile | file: package.json | verify: `bun run build`
- [ ] T8: Vercel deployment & verification | file: vercel.json | verify: `curl -sf -o /dev/null https://hyperframe-por.vercel.app`
