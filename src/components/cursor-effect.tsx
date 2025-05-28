"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const handleCursorStyle = useCallback(() => {
    const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y);
    if (hoveredElement) {
      const style = window.getComputedStyle(hoveredElement);
      setIsPointer(
        style.cursor === "pointer" || 
        hoveredElement.tagName.toLowerCase() === "button" ||
        hoveredElement.tagName.toLowerCase() === "a"
      );
    }
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsHidden(false);
      });
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleCursorStyle, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleCursorStyle);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleCursorStyle]);

  return (
    <AnimatePresence>
      {!isHidden && (
        <>
          {/* Main cursor */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[999] hidden mix-blend-difference md:block"
            animate={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
              scale: isPointer ? 1.2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 1000,
              damping: 50,
              mass: 0.2,
            }}
          >
            <motion.div 
              className="h-6 w-6 rounded-full bg-white opacity-50"
              animate={{
                scale: isPointer ? 1.2 : 1,
              }}
              transition={{
                duration: 0.15,
              }}
            />
          </motion.div>

          {/* Secondary cursor (dot) */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
            animate={{
              x: mousePosition.x - 2,
              y: mousePosition.y - 2,
              scale: isPointer ? 0 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 1500,
              damping: 50,
              mass: 0.1,
            }}
          >
            <div className="h-1 w-1 rounded-full bg-white opacity-100" />
          </motion.div>

          {/* Subtle magnetic field effect */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[998] hidden md:block"
            animate={{
              x: mousePosition.x - 50,
              y: mousePosition.y - 50,
              scale: isPointer ? 1.1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 40,
              mass: 0.5,
            }}
          >
            <div className="h-[100px] w-[100px] rounded-full bg-white/5 backdrop-blur-[1px]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
