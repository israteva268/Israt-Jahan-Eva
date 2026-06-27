"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";

function ProjectCard({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Scale rotation to max 8 degrees
    const rX = -(y / (box.height / 2)) * 8;
    const rY = (x / (box.width / 2)) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      className="p-8 rounded-3xl border border-card-border bg-card/25 hover:bg-card/45 backdrop-blur-md relative overflow-hidden group hover:border-primary/30 transition-all flex flex-col justify-between h-full shadow-[0_10px_35px_rgba(0,0,0,0.25)]"
    >
      {/* Glow highlight */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{ transform: "translateZ(20px)" }}
      />

      <div style={{ transform: "translateZ(30px)" }}>
        {/* Card Header (Project Title) */}
        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors flex items-start justify-between gap-4">
          {project.title}
        </h3>

        {/* Card Description */}
        <p className="text-sm text-muted mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg border border-card-border bg-background/50 text-muted font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div 
        className="flex items-center gap-4 pt-4 border-t border-card-border/50"
        style={{ transform: "translateZ(40px)" }}
      >
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>Code</span>
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:brightness-110 transition-all ml-auto"
        >
          <span>Live Demo</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="projects" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Featured <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[3px] bg-primary mx-auto rounded-full"
          />
        </div>

        {/* Project card grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project: Project) => (
            <motion.div key={project.id} variants={cardContainerVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
