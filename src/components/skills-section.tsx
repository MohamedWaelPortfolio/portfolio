"use client";

import { useRef, useState, memo, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  description?: string;
}

interface CategoryData {
  title: string;
  techs: Skill[];
  icon?: string;
}

interface SkillBarProps {
  skill: Skill;
  isInView: boolean;
  delay: number;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}

interface SkillCategoryProps {
  category: CategoryData;
  index: number;
  isInView: boolean;
}

const skillCategories: CategoryData[] = [
  {
    title: "Frontend Development",
    techs: [
      { 
        name: "React.js", 
        level: 90,
        description: "Advanced proficiency in React, including hooks, context, and performance optimization"
      },
      { 
        name: "Next.js", 
        level: 85,
        description: "Experience with SSR, SSG, and API routes in Next.js applications"
      },
      { 
        name: "TypeScript", 
        level: 85,
        description: "Strong typing skills and advanced TypeScript features"
      },
      { 
        name: "Tailwind CSS", 
        level: 90,
        description: "Expert in responsive design and component styling"
      },
    ],
  },
  {
    title: "Backend Development",
    techs: [
      { 
        name: "Node.js", 
        level: 85,
        description: "Building scalable server-side applications and APIs"
      },
      { 
        name: "Python", 
        level: 80,
        description: "Data processing and automation scripts"
      },
      { 
        name: "PostgreSQL", 
        level: 75,
        description: "Database design and optimization"
      },
      { 
        name: "MongoDB", 
        level: 80,
        description: "NoSQL database management and aggregation pipelines"
      },
    ],
  },
  {
    title: "Design & Creative",
    techs: [
      { 
        name: "Adobe Photoshop", 
        level: 85,
        description: "Image editing and manipulation"
      },
      { 
        name: "Adobe Illustrator", 
        level: 80,
        description: "Vector graphics and logo design"
      },
      { 
        name: "UI/UX Design", 
        level: 75,
        description: "User interface design and user experience optimization"
      },
      { 
        name: "Graphic Design", 
        level: 80,
        description: "Creating visually appealing designs and layouts"
      },
    ],
  },
];

const SkillBar = memo(function SkillBar({
  skill,
  isInView,
  delay,
  isHovered,
  onHover,
}: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(skill.name)}
      onBlur={() => onHover(null)}
      className="relative group"
      role="progressbar"
      aria-valuenow={skill.level}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-white/90 font-medium tracking-wide">{skill.name}</span>
          {skill.description && (
            <div className="relative">
              <Info className="w-4 h-4 text-blue-400/70 hover:text-blue-400 transition-colors cursor-help" />
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-black/95 backdrop-blur-sm text-white/90 text-sm rounded-lg pointer-events-none border border-white/10 shadow-xl z-50"
                  >
                    {skill.description}
                    <div className="absolute -bottom-1 left-2 w-2 h-2 bg-black/95 border-r border-b border-white/10 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        <span className="text-blue-400 font-medium">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500/80 via-violet-500/80 to-blue-500/80 bg-[length:200%_auto]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay }}
          style={{
            filter: isHovered ? "brightness(1.2)" : "brightness(1)",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{ 
              x: ["-100%", "100%"],
              backgroundPosition: ["200% 0", "-200% 0"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

const SkillCategory = memo(function SkillCategory({
  category,
  index,
  isInView,
}: SkillCategoryProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-blue-500/20 hover:bg-black/40 transition-all duration-300 group"
    >
      <motion.h3 
        className="text-xl font-semibold text-white/90 mb-6 tracking-wide group-hover:text-blue-400/90 transition-colors"
      >
        {category.title}
      </motion.h3>
      <div className="space-y-4">
        {category.techs.map((tech, techIndex) => (
          <SkillBar
            key={tech.name}
            skill={tech}
            isInView={isInView}
            delay={index * 0.2 + techIndex * 0.1}
            isHovered={hoveredSkill === tech.name}
            onHover={setHoveredSkill}
          />
        ))}
      </div>
    </motion.div>
  );
});

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const headingAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8 }
  }), [isInView]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 lg:py-32 overflow-hidden min-h-screen flex items-center"
      aria-label="Skills and expertise"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/sections/skills/pattern-bg.svg')] bg-repeat opacity-5" />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/50 backdrop-blur-[1px]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          {...headingAnimation}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional expertise,
            showcasing my proficiency across various technologies and tools.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
