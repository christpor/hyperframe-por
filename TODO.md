# TODO — Typography, Favicon SEO & GitHub Push
<!-- agent-gate: on | max_loops: 8 -->
Goal: Integrate authentic HyperFrames brand fonts, browser tab favicon/SEO, visual alignment, and clean GitHub push.
States: [ ] todo · [~] doing · [x] done (harness re-verifies) · [?] research needed · [!] blocked (reason required)

- [x] T0: Recon — verify font files and SVG assets on hyperframes.dev | file: .scratchpad/fonts_recon.md | verify: `test -f .scratchpad/fonts_recon.md`
- [x] T1: Ingest brand webfonts and declare @font-face rules | file: src/app/globals.css | verify: `bun test tests/fonts.test.ts`
- [ ] T2: Browser tab favicons, logo SVGs, and metadata SEO | file: src/app/layout.tsx | verify: `bun test tests/seo.test.ts`
- [ ] T3: Align Hero headline typography and button hierarchy | file: src/features/hero/StudioHero.tsx | verify: `bun test tests/hero_layout.test.ts`
- [ ] T4: Integration build + full production compile | file: package.json | verify: `bun run build`
- [ ] T5: Production redeployment & live asset verification | file: vercel.json | verify: `curl -sf -o /dev/null https://hyperframe-por.vercel.app/fonts/ABCSolarDisplay-Bold.woff2`
- [ ] T6: Push clean repository to GitHub christpor/hyperframe-por | file: - | verify: `gh repo view christpor/hyperframe-por --json name`
