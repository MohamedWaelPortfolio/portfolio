"use client";

import { useEffect, useRef, memo, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Briefcase, Code, Laptop } from "lucide-react";

// Types
interface ExperienceCardProps {
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
  icon: "briefcase" | "code" | "laptop";
  alignment: "left" | "right";
}

// Styles
const styles = {
  section: "py-20 relative overflow-hidden",
  container: "container mx-auto px-4",
  heading: "text-4xl md:text-5xl font-bold text-center mb-16",
  timeline:
    "absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-blue-500/50",
  card: "p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/20 hover:bg-black/40 transition-all duration-300",
  cardTitle: "text-xl font-semibold text-white/90",
  cardCompany: "text-white/60",
  cardDuration: "text-sm text-white/50",
  cardDescription: "text-white/70 mb-4",
  skillTag:
    "px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400/90 border border-blue-500/20",
};

// Animation variants
const cardVariants = {
  hidden: (alignment: "left" | "right") => ({
    opacity: 0,
    x: alignment === "left" ? -50 : 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Experience data
const experiences: Omit<ExperienceCardProps, "alignment">[] = [
  {
    title: "Full Stack Developer",
    company: "Mohamed Wael",
    duration: "2025 - Present",
    description:
      "Led development of modern web applications using Next.js, React, and TypeScript. Implemented responsive designs and optimized performance.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    icon: "briefcase",
  },
  {
    title: "Frontend Developer",
    company: "Freelance",
    duration: "2023 - 2025",
    description:
      "Developed responsive web applications for various clients. Focused on creating engaging user interfaces and optimizing performance.",
    skills: ["React", "JavaScript", "HTML/CSS", "Responsive Design", "UI/UX"],
    icon: "code",
  },
  {
    title: "Web Developer Intern",
    company: "Tech Startup",
    duration: "2023",
    description:
      "Assisted in developing and maintaining web applications. Learned modern development practices and collaborated with senior developers.",
    skills: ["JavaScript", "HTML", "CSS", "Git", "Agile"],
    icon: "laptop",
  },
];

const IconComponent = ({ icon }: { icon: ExperienceCardProps["icon"] }) => {
  switch (icon) {
    case "briefcase":
      return <Briefcase className="h-8 w-8 text-blue-400/90" />;
    case "code":
      return <Code className="h-8 w-8 text-violet-400/90" />;
    case "laptop":
      return <Laptop className="h-8 w-8 text-purple-400/90" />;
    default:
      return null;
  }
};

// Memoized ExperienceCard component
const ExperienceCard = memo(function ExperienceCard({
  title,
  company,
  duration,
  description,
  skills,
  icon,
  alignment,
}: ExperienceCardProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div
      className={`flex justify-${alignment === "left" ? "start" : "end"} w-full`}
      role="listitem"
    >
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        custom={alignment}
        className={`w-[calc(50%-2rem)] ${styles.card} ${
          alignment === "left" ? "mr-8" : "ml-8"
        }`}
      >
        <div className="mb-4 flex items-start gap-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
            <IconComponent icon={icon} />
          </div>
          <div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardCompany}>{company}</p>
            <p className={styles.cardDuration}>{duration}</p>
          </div>
        </div>

        <p className={styles.cardDescription}>{description}</p>

        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Skills used"
        >
          {skills.map((skill, index) => (
            <span key={index} className={styles.skillTag} role="listitem">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
});

export function ExperienceSection() {
  const sectionRef = useRef(null);

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
      ref={sectionRef}
      id="experience"
      className={`${styles.section} bg-[url('/images/sections/experience/timeline-bg.svg')] bg-cover bg-no-repeat`}
      aria-label="Work experience timeline"
    >
      <div className={styles.container}>
        <motion.h2 {...headingAnimation} className={styles.heading}>
          <span className="animate-gradient bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
            Experience
          </span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className={styles.timeline} role="presentation" />

          {/* Experience cards */}
          <div className="space-y-16" role="list">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${exp.title}`}
                {...exp}
                alignment={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
