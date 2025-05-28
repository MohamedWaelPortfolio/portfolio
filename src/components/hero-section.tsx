"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dot-pattern">
      {/* Background gradient with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/50 backdrop-blur-sm dark:from-background dark:via-background/90 dark:to-background/50" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-primary/20 via-accent/20 to-primary/20 animate-spin-slow" style={{ filter: 'blur(7rem)' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-conic from-accent/20 via-primary/20 to-accent/20 animate-spin-slow" style={{ filter: 'blur(7rem)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001
            }
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Mohamed Wael
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium text-muted-foreground mb-8"
        >
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "UI/UX Designer",
              2000,
              "Problem Solver",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Passionate about creating elegant solutions to complex problems.
          Specialized in building modern web applications with cutting-edge
          technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 font-medium text-lg shadow-lg shadow-primary/25"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 font-medium text-lg shadow-lg shadow-accent/25"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-sm text-muted-foreground mb-2 font-medium">Scroll</span>
        <div className="w-[2px] h-12 bg-muted-foreground/20 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-accent to-primary animate-scroll" />
        </div>
      </motion.div>
    </div>
  );
}
