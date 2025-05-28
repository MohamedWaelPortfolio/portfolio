"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  color: string;
}

interface StarBackgroundProps {
  count?: number;
}

export function StarBackground({ count = 150 }: StarBackgroundProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Generate random stars with unique IDs
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.2 + 0.1,
        color: Math.random() > 0.5 ? "primary" : "accent",
      }))
    );

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [count]);

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== null) {
        setStars((prevStars) =>
          prevStars.map((star) => {
            // Calculate distance from mouse
            const dx = star.x - mousePosition.x;
            const dy = star.y - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Add slight movement based on mouse position
            const mouseInfluence = Math.max(0, 1 - distance / 20);
            const offsetX = dx * mouseInfluence * 0.1;
            const offsetY = dy * mouseInfluence * 0.1;

            return {
              ...star,
              y: (star.y + star.speed + offsetY + 100) % 100,
              x: (star.x + offsetX + 100) % 100,
              alpha: star.alpha * (1 - mouseInfluence * 0.5) + 0.5,
            };
          })
        );
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [mousePosition.x, mousePosition.y]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-background to-background/50" />
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full ${
            star.color === "primary"
              ? "bg-primary/30 shadow-primary/20"
              : "bg-accent/30 shadow-accent/20"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: star.alpha,
            scale: [1, 1.2, 1],
            x: `${star.x}%`,
            y: `${star.y}%`,
          }}
          transition={{
            opacity: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            },
            scale: {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          style={{
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px currentColor`,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
}
