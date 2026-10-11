# HyperFrames Reconnaissance & Asset Inventory

## 1. WebGL2 Iridescent Shader (`.sr-ground-canvas`)
```glsl
#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uRes;
uniform float uTime;
uniform float uColorScale;
uniform float uFrequency;
uniform vec3 uBaseColor;

vec2 distort(vec2 p, float offset) {
  p += offset;
  for (float i = 1.0; i < 7.0; i++) {
    p.x += 0.3 / i * sin(i * 5.0 * p.y + uTime);
    p.y += 0.1 / i * cos(i * 3.0 * p.x + uTime);
  }
  return p;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float r = sin(distort(uv, 0.0).x * uFrequency) * 0.5 + 0.5;
  float g = sin(distort(uv, 0.02).x * uFrequency) * 0.5 + 0.5;
  float b = sin(distort(uv, 0.04).x * uFrequency) * 0.5 + 0.5;
  vec3 color = pow(vec3(r, g, b), vec3(uColorScale));
  vec3 finalColor = mix(uBaseColor, color, 0.8);
  fragColor = vec4(finalColor, 1.0);
}
```
- Parameters: `uColorScale = 10.0`, `uFrequency = 7.0`, `uBaseColor = vec3(1.0, 1.0, 1.0)`
- Speed increment: `time += 0.00375 * dt * 60`
- Overlay: `.sr-ground-veil` with `background: #f7ecd3cc`

## 2. Kinetic Scroll Scaling Physics
- Formula:
```typescript
export function calculateHeroScale(top: number, height: number, vh: number): number {
  if (height <= 0) return 1;
  return Math.min(1, Math.max(0.5, (vh - top - 32) / height));
}
```
- GSAP ScrollTrigger configuration:
  - `trigger: heroContainer`
  - `start: 0`
  - `end: "top 10%"`
  - `scrub: true`
  - `invalidateOnRefresh: true`
  - Initial scale: clamped calculation from `calculateHeroScale`
  - Target scale: `1.0`

## 3. Media & Assets Manifest
- Studio Launch Video: `https://static.heygen.ai/hyperframes-oss/site/studio-launch-nib-sf-audio.mp4`
- Studio Launch Poster: `https://static.heygen.ai/hyperframes-oss/site/studio-launch-nib-sf-audio-poster.jpg`
- Product promo video: `https://mintcdn.com/hyperframes/O2nIk7a92XieyP2s/images/templates/product-promo.mp4`
- Showcase Template Videos:
  - Notion: `https://static.heygen.ai/hyperframes/templates/showcase/tpl-notion.mp4`
  - Dribbble: `https://static.heygen.ai/hyperframes/templates/showcase/tpl-dribbble.mp4`
  - Stripe: `https://static.heygen.ai/hyperframes/templates/showcase/tpl-stripe.mp4`
  - Raycast: `https://static.heygen.ai/hyperframes/templates/showcase/tpl-raycast.mp4`
  - Spotify Bento: `https://static.heygen.ai/hyperframes/templates/compositions/spotify-bento/renders/spotify-bento.mp4`
  - Claude Code: `https://static.heygen.ai/hyperframes/templates/compositions/claude-code-fights-back/renders/claude-code-fights-back.mp4`

## 4. Typography & Styling
- Font Title: `ABCSolarDisplay-Bold`
- Font UI: `TT_Norms_Pro`
- Color tokens:
  - Text Primary: `#131109`
  - Border: `rgba(19, 17, 9, 0.18)`
  - Surface Glass: `rgba(247, 236, 211, 0.65)`
  - Pill Background: `#131109`
  - Pill Text: `#f4f1ea`
