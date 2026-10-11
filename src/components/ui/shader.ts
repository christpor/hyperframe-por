export const VERTEX_SHADER_SRC = `#version 300 es
layout(location = 0) in vec2 aPos;
out vec2 vUv;

void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER_SRC = `#version 300 es
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
`;

export interface ShaderUniforms {
  colorScale: number;
  frequency: number;
  baseColor: [number, number, number];
}

export const DEFAULT_SHADER_UNIFORMS: ShaderUniforms = {
  colorScale: 10.0,
  frequency: 7.0,
  baseColor: [1.0, 1.0, 1.0],
};
