"use client";

import { useCallback, useEffect, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { cn } from "@/core/utils/cn.util";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

// Adapted from Magic UI's gradient-mode Magic Card: https://magicui.design/docs/components/magic-card
export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "var(--magic-card-gradient)",
  gradientOpacity = 0.8,
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const opacity = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const background = useMotionTemplate`
    linear-gradient(var(--background) 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom}, ${gradientTo}, var(--border) 100%) border-box
  `;
  const spotlight = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor}, transparent 100%)
  `;

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
    opacity.set(0);
  }, [gradientSize, mouseX, mouseY, opacity]);

  useEffect(() => {
    const handlePointerOut = (event: globalThis.PointerEvent) => {
      if (!event.relatedTarget) reset();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") reset();
    };
    window.addEventListener("blur", reset);
    window.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("blur", reset);
      window.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [reset]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
    opacity.set(gradientOpacity);
  }

  return (
    <motion.div
      className={cn("relative isolate overflow-hidden rounded-card border border-transparent", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ background }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px rounded-[inherit] transition-opacity duration-300 motion-reduce:transition-none"
        style={{ background: spotlight, opacity }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
