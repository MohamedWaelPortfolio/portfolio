"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
      aria-label="Scroll to top"
    >
      <div className="relative">
        <ArrowUp className="w-5 h-5" />
        
        {/* Circular progress */}
        <svg
          className="absolute -inset-1 w-7 h-7 rotate-[-90deg]"
          viewBox="0 0 32 32"
        >
          <circle
            cx="16"
            cy="16"
            r="14"
            className="stroke-primary-foreground/20"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="16"
            cy="16"
            r="14"
            className="stroke-primary-foreground"
            strokeWidth="2"
            fill="none"
            style={{
              pathLength: scaleX,
            }}
          />
        </svg>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary-foreground/10"
        initial={false}
        whileHover={{
          scale: 1.5,
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary-foreground/20"
        initial={false}
        whileTap={{
          scale: 1.5,
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      {/* Tooltip */}
      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            x: isVisible ? 0 : -10
          }}
          className="bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-lg whitespace-nowrap"
        >
          Scroll to top
        </motion.div>
      </div>
    </motion.button>
  );
}
