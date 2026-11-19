"use client";

import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { fragmentSource, vertexSource } from "./atmosphereShader";
import { params, signals } from "./params";
import styles from "./stage.module.css";

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader failed to compile");
  }
  return shader;
}

const UNIFORMS = [
  "uRes",
  "uTime",
  "uSceneTime",
  "uTone",
  "uDust",
  "uDustSize",
  "uLight",
  "uLightAngle",
  "uScenes",
  "uGrain",
  "uFocus",
  "uPointer",
] as const;

interface AtmosphereProps {
  /** 0 when nothing is on stage, 1 when a piece holds focus. */
  focus: MotionValue<number>;
}

export default function Atmosphere({ focus }: AtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    // Without WebGL2 the canvas stays empty and the CSS fallback shows through.
    if (!canvas || !gl) return;

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(
        gl.getProgramInfoLog(program) ?? "Program failed to link",
      );
    }
    // biome-ignore lint/correctness/useHookAtTopLevel: a WebGL call, not a hook
    gl.useProgram(program);

    // One triangle that covers the screen.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = Object.fromEntries(
      UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;

    const resize = () => {
      // The image is soft by nature, so there is nothing to gain past 1.5x.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let last = performance.now();
    // Start somewhere in the middle of things so the first frame is not the
    // same room every visit.
    let airTime = Math.random() * 500;
    let sceneTime = Math.random() * 100;
    let pointerX = 0;
    let pointerY = 0;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const pace = params.drift * (calm.matches ? 0.2 : 1);
      airTime += dt * pace * (1 + signals.stir * 5);
      sceneTime += (dt * pace) / Math.max(params.sceneSeconds, 1);
      signals.stir *= Math.exp(-dt * 1.6);

      // The room follows the pointer late and softly.
      const follow = 1 - Math.exp(-dt * 2.5);
      pointerX += (signals.pointerX - pointerX) * follow;
      pointerY += (signals.pointerY - pointerY) * follow;

      gl.uniform2f(uniform.uRes, canvas.width, canvas.height);
      gl.uniform1f(uniform.uTime, airTime);
      gl.uniform1f(uniform.uSceneTime, sceneTime);
      gl.uniform1f(uniform.uTone, params.tone);
      gl.uniform1f(uniform.uDust, params.dust);
      gl.uniform1f(uniform.uDustSize, params.dustSize);
      gl.uniform1f(uniform.uLight, params.light);
      gl.uniform1f(uniform.uLightAngle, params.lightAngle);
      gl.uniform1f(uniform.uScenes, params.scenes);
      gl.uniform1f(uniform.uGrain, params.grain);
      gl.uniform1f(uniform.uFocus, Math.min(Math.max(focus.get(), 0), 1));
      gl.uniform2f(uniform.uPointer, pointerX, pointerY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [focus]);

  return <canvas ref={canvasRef} className={styles.atmosphere} aria-hidden />;
}
