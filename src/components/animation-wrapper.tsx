"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  animation?: "fade" | "slide" | "zoom" | "flip" | "scale";
  duration?: number;
  delay?: number;
  once?: boolean;
}

const animations: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function AnimationWrapper({
  children,
  className = "",
  animation = "fade",
  duration = 0.5,
  delay = 0,
  once = true,
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={`animate-content ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Stagger children animation wrapper
export function StaggerWrapper({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: Omit<AnimationWrapperProps, "animation" | "delay" | "duration"> & {
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={`optimized-animation ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Child component for stagger animations
export function StaggerItem({
  children,
  className = "",
  animation = "fade",
  duration = 0.5,
}: Omit<AnimationWrapperProps, "delay" | "once">) {
  return (
    <motion.div
      variants={animations[animation]}
      className={`animate-content ${className}`}
      transition={{
        duration,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
