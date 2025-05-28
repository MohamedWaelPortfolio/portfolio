"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useMemo, useCallback } from "react";

// Types
interface Technology {
  name: string;
  level: number;
  color: string;
  description?: string;
}

interface CanvasContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  radius: number;
  isDarkMode: boolean;
}

// Styles
const styles = {
  section: "py-20 relative bg-white dark:bg-[#0a0a0a]",
  container: "container mx-auto px-4",
  heading:
    "text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text",
  canvasWrapper: "relative h-[600px] w-full",
  fallback: "text-center text-gray-600 dark:text-gray-400",
};

// Technologies data
const technologies: Technology[] = [
  {
    name: "React",
    level: 90,
    color: "#61DAFB",
    description:
      "Advanced proficiency in React, including hooks, context, and performance optimization",
  },
  {
    name: "Next.js",
    level: 85,
    color: "#000000",
    description:
      "Extensive experience with Next.js, including SSR, SSG, and API routes",
  },
  {
    name: "TypeScript",
    level: 85,
    color: "#3178C6",
    description:
      "Strong TypeScript skills with focus on type safety and advanced features",
  },
  {
    name: "Node.js",
    level: 80,
    color: "#339933",
    description: "Proficient in Node.js backend development and API creation",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    color: "#38B2AC",
    description: "Expert in Tailwind CSS for rapid UI development",
  },
  {
    name: "MongoDB",
    level: 75,
    color: "#47A248",
    description: "Experienced in MongoDB database design and operations",
  },
  {
    name: "AWS",
    level: 70,
    color: "#FF9900",
    description: "Familiar with AWS services and cloud architecture",
  },
  {
    name: "GraphQL",
    level: 80,
    color: "#E535AB",
    description: "Proficient in GraphQL API development and integration",
  },
];

// Canvas drawing functions
const drawSpiderWeb = ({
  ctx,
  centerX,
  centerY,
  radius,
  isDarkMode,
}: CanvasContext) => {
  const levels = 5;
  for (let i = 1; i <= levels; i++) {
    ctx.beginPath();
    ctx.strokeStyle = isDarkMode
      ? `rgba(255, 255, 255, ${i / (levels * 2)})`
      : `rgba(0, 0, 0, ${i / (levels * 2)})`;
    ctx.lineWidth = 1;

    technologies.forEach((_, j) => {
      const angle = (j / technologies.length) * Math.PI * 2 - Math.PI / 2;
      const r = (radius * i) / levels;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;

      if (j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.stroke();
  }
};

const drawSkillsData = ({
  ctx,
  centerX,
  centerY,
  radius,
  isDarkMode,
}: CanvasContext) => {
  ctx.beginPath();
  ctx.fillStyle = isDarkMode
    ? "rgba(59, 130, 246, 0.2)"
    : "rgba(59, 130, 246, 0.1)";
  ctx.strokeStyle = isDarkMode
    ? "rgba(59, 130, 246, 0.8)"
    : "rgba(59, 130, 246, 0.6)";
  ctx.lineWidth = 2;

  technologies.forEach((tech, i) => {
    const angle = (i / technologies.length) * Math.PI * 2 - Math.PI / 2;
    const r = (radius * tech.level) / 100;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

const drawLabels = ({
  ctx,
  centerX,
  centerY,
  radius,
  isDarkMode,
}: CanvasContext) => {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = isDarkMode ? "white" : "black";
  ctx.font = "14px Inter";

  technologies.forEach((tech, i) => {
    const angle = (i / technologies.length) * Math.PI * 2 - Math.PI / 2;
    const r = radius + 30;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;

    ctx.fillText(tech.name, x, y);
  });
};

export function TechStackSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawGraph = useCallback((context: CanvasContext) => {
    const { ctx, width, height } = context;
    ctx.clearRect(0, 0, width, height);

    drawSpiderWeb(context);
    drawSkillsData(context);
    drawLabels(context);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const context: CanvasContext = {
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height,
      centerX: canvas.width / 2,
      centerY: canvas.height / 2,
      radius: Math.min(canvas.width, canvas.height) / 3,
      isDarkMode: document.documentElement.classList.contains("dark"),
    };

    drawGraph(context);
  }, [drawGraph]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Memoize the heading animation
  const headingAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
    }),
    []
  );

  return (
    <section
      className={styles.section}
      id="skills"
      aria-label="Technical skills visualization"
    >
      <div className={styles.container}>
        <motion.h2 {...headingAnimation} className={styles.heading}>
          Technical Skills
        </motion.h2>

        <div ref={containerRef} className={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            role="img"
            aria-label="Skills radar chart showing proficiency levels in various technologies"
          />
          <div className="sr-only">
            <h3>Technology Proficiency Levels:</h3>
            <ul>
              {technologies.map((tech) => (
                <li key={tech.name}>
                  {tech.name}: {tech.level}% - {tech.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
