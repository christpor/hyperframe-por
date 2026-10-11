"use client";

import React, { useEffect, useRef } from "react";
import {
  VERTEX_SHADER_SRC,
  FRAGMENT_SHADER_SRC,
  DEFAULT_SHADER_UNIFORMS,
} from "./shader";

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initWebGL(canvas: HTMLCanvasElement) {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
    desynchronized: true,
  });

  if (!gl) {
    console.warn("WebGL2 not supported, fallback active");
    return null;
  }

  const vert = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
  const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
  if (!vert || !frag) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.bindAttribLocation(program, 0, "aPos");
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  const buffer = gl.createBuffer();
  if (!buffer) return null;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const uRes = gl.getUniformLocation(program, "uRes");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uColorScale = gl.getUniformLocation(program, "uColorScale");
  const uFrequency = gl.getUniformLocation(program, "uFrequency");
  const uBaseColor = gl.getUniformLocation(program, "uBaseColor");

  let isDisposed = false;
  let isRunning = false;
  let animId = 0;
  let lastTime = 0;
  let elapsed = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  const render = (time: number) => {
    if (!isRunning || isDisposed) return;
    const dt = Math.min(0.05, Math.max(0, (time - lastTime) / 1000)) || 1 / 60;
    lastTime = time;
    elapsed += 0.00375 * dt * 60;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, elapsed);
    gl.uniform1f(uColorScale, DEFAULT_SHADER_UNIFORMS.colorScale);
    gl.uniform1f(uFrequency, DEFAULT_SHADER_UNIFORMS.frequency);
    gl.uniform3f(
      uBaseColor,
      DEFAULT_SHADER_UNIFORMS.baseColor[0],
      DEFAULT_SHADER_UNIFORMS.baseColor[1],
      DEFAULT_SHADER_UNIFORMS.baseColor[2]
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    animId = requestAnimationFrame(render);
  };

  const start = () => {
    if (isDisposed || isRunning) return;
    isRunning = true;
    lastTime = performance.now();
    resize();
    animId = requestAnimationFrame(render);
  };

  const stop = () => {
    isRunning = false;
    if (animId) cancelAnimationFrame(animId);
  };

  const dispose = () => {
    isDisposed = true;
    stop();
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vert);
    gl.deleteShader(frag);
  };

  return { start, stop, resize, dispose };
}

export function IridescentCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = initWebGL(canvas);
    if (!engine) return;

    engine.start();

    const onVisibilityChange = () => {
      if (document.hidden) engine.stop();
      else engine.start();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    const ro = new ResizeObserver(() => engine.resize());
    ro.observe(canvas);
    window.addEventListener("resize", engine.resize);

    return () => {
      window.removeEventListener("resize", engine.resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      ro.disconnect();
      engine.dispose();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 bg-[#fbf6ec]"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90"
        aria-hidden="true"
      />
      {/* Cream veil overlay replicating .sr-ground-veil */}
      <div
        className="absolute inset-0 bg-[#f7ecd3cc] backdrop-blur-[2px]"
        aria-hidden="true"
      />
    </div>
  );
}
