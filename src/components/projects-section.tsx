"use client";

import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { ExternalLink, Github, Image as ImageIcon } from "lucide-react";

// Types
interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  technologies?: string[];
  role?: string;
}

// Styles
const styles = {
  section: "py-20 relative bg-no-repeat bg-cover bg-[url('/images/sections/projects/dot-pattern.svg')]",
  container: "container mx-auto px-4",
  header: "text-center mb-12",
  heading: "text-4xl md:text-5xl font-bold mb-6",
  subheading: "text-white/60 text-lg",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  card: "bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-blue-500/20 hover:bg-black/40 group",
  imageWrapper: "relative h-48 bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center",
  overlay: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4",
  content: "p-6",
  title: "text-xl font-semibold mb-2 text-white/90 group-hover:text-blue-400/90 transition-colors",
  description: "text-white/60 mb-4",
  tags: "flex flex-wrap gap-2 mb-4",
  tag: "px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white/70 border border-white/10",
  link: "inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors",
};

// Project data
const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js, TailwindCSS, and Framer Motion. Features responsive design, dark mode, and smooth animations.",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    link: "https://github.com/HHFD31/mohamed-wael-portfolio",
    github: "https://github.com/HHFD31/mohamed-wael-portfolio",
    featured: true,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: "Full Stack Developer",
  },
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and secure payments.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/yourusername/ecommerce",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    role: "Backend Developer",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    tags: ["React", "Firebase", "Material-UI"],
    link: "https://task-app-demo.com",
    technologies: ["React", "Firebase", "Material-UI", "Redux"],
    role: "Frontend Developer",
  },
];

// ProjectCard Component
const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <ImageIcon className="w-12 h-12 text-white/30" />
        <div className={styles.overlay}>
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              aria-label={`Visit ${project.title} website`}
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github className="w-5 h-5 text-white" />
            </motion.a>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        {project.role && (
          <p className="text-sm text-white/50 mb-2">
            Role: {project.role}
          </p>
        )}
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {project.technologies && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 text-white/70">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400/90 rounded border border-blue-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export function ProjectsSection() {
  // Memoize the heading animation
  const headingAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true }
  }), []);

  return (
    <section
      id="projects"
      className={styles.section}
      aria-label="Projects showcase"
    >
      <div className={styles.container}>
        <motion.div
          {...headingAnimation}
          className={styles.header}
        >
          <h2 className="bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
            Projects
          </h2>
          <p className={styles.subheading}>
            Check out some of my recent work
          </p>
        </motion.div>

        <div 
          className={styles.grid}
          role="list"
          aria-label="Project showcase grid"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
