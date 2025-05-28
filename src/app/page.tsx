"use client";

import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ScrollProgress } from "@/components/scroll-progress";
import { AosInitializer } from "@/components/aos-initializer";
import { StarBackground } from "@/components/star-background";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <AosInitializer />
      <StarBackground />
      <section id="home">
        <HeroSection />
      </section>
      <section id="skills">
        <SkillsSection />
        <TechStackSection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="experience">
        <ExperienceSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
