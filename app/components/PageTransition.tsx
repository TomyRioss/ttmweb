"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "./TransitionContext";

export default function PageTransition() {
  const { state, startExit, reset } = useTransition();
  const router = useRouter();
  const navigatedRef = useRef(false);

  // entering: expand → navigate → exiting
  useEffect(() => {
    if (state.phase !== "entering") return;
    navigatedRef.current = false;

    const timer = setTimeout(() => {
      if (!navigatedRef.current) {
        navigatedRef.current = true;
        router.push(state.href);
        startExit();
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [state.phase, state.href, router, startExit]);

  // exiting: hole grows → reset
  useEffect(() => {
    if (state.phase !== "exiting") return;
    const timer = setTimeout(reset, 650);
    return () => clearTimeout(timer);
  }, [state.phase, reset]);

  if (state.phase === "idle") return null;

  const { x, y } = state;

  if (state.phase === "entering") {
    return (
      <div
        style={
          {
            "--rx": `${x}px`,
            "--ry": `${y}px`,
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#FF6B00",
            animation: "rippleExpand 700ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
            maskImage: `radial-gradient(circle at ${x}px ${y}px, transparent 45px, black 52px)`,
            WebkitMaskImage: `radial-gradient(circle at ${x}px ${y}px, transparent 45px, black 52px)`,
            pointerEvents: "none",
          } as React.CSSProperties & { "--rx": string; "--ry": string }
        }
      />
    );
  }

  // exiting: clip-path stays full, mask hole grows from click outward
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#FF6B00",
        clipPath: `circle(200vmax at ${x}px ${y}px)`,
        maskImage: `radial-gradient(circle at ${x}px ${y}px, transparent var(--hole-r), black calc(var(--hole-r) + 10px))`,
        WebkitMaskImage: `radial-gradient(circle at ${x}px ${y}px, transparent var(--hole-r), black calc(var(--hole-r) + 10px))`,
        animation: "rippleExit 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
        pointerEvents: "none",
      }}
    />
  );
}
