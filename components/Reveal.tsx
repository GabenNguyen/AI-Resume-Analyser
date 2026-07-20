"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger direct children instead of animating the wrapper itself. */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

/**
 * Scroll-triggered entrance built on GSAP + ScrollTrigger.
 * Uses gsap.matchMedia() so users who prefer reduced motion get the
 * content immediately with no transform/opacity animation.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = false,
  delay = 0,
  y = 28,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { motion } = ctx.conditions as {
            motion: boolean;
            reduced: boolean;
          };

          if (!motion) {
            gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
            return;
          }

          const targets = stagger ? Array.from(el.children) : el;
          gsap.from(targets, {
            opacity: 0,
            y,
            duration: 0.7,
            delay,
            ease: "power3.out",
            stagger: stagger ? 0.12 : 0,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
