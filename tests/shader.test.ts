import { describe, expect, it } from "bun:test";
import {
  VERTEX_SHADER_SRC,
  FRAGMENT_SHADER_SRC,
  DEFAULT_SHADER_UNIFORMS,
} from "../src/components/ui/shader";

describe("WebGL2 Iridescent Shader Contracts", () => {
  it("vertex shader defines version 300 es and layout location", () => {
    expect(VERTEX_SHADER_SRC).toContain("#version 300 es");
    expect(VERTEX_SHADER_SRC).toContain("layout(location = 0) in vec2 aPos;");
    expect(VERTEX_SHADER_SRC).toContain("vUv = aPos * 0.5 + 0.5;");
  });

  it("fragment shader defines precision highp and output fragColor", () => {
    expect(FRAGMENT_SHADER_SRC).toContain("#version 300 es");
    expect(FRAGMENT_SHADER_SRC).toContain("precision highp float;");
    expect(FRAGMENT_SHADER_SRC).toContain("out vec4 fragColor;");
  });

  it("fragment shader includes domain distortion sinusoidal loop", () => {
    expect(FRAGMENT_SHADER_SRC).toContain("vec2 distort(vec2 p, float offset)");
    expect(FRAGMENT_SHADER_SRC).toContain("sin(i * 5.0 * p.y + uTime)");
    expect(FRAGMENT_SHADER_SRC).toContain("cos(i * 3.0 * p.x + uTime)");
  });

  it("uniforms match HyperFrames design tokens", () => {
    expect(DEFAULT_SHADER_UNIFORMS.colorScale).toBe(10.0);
    expect(DEFAULT_SHADER_UNIFORMS.frequency).toBe(7.0);
    expect(DEFAULT_SHADER_UNIFORMS.baseColor).toEqual([1.0, 1.0, 1.0]);
  });
});
