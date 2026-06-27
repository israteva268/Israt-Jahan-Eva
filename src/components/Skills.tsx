"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillCategories, SkillCategory, Skill } from "@/data/skills";
import {
  Code,
  Palette,
  FileCode2,
  FileCode,
  Atom,
  Layers,
  Wind,
  Binary,
  Cpu,
  Terminal,
  Database,
  DatabaseBackup,
  Flame,
  GitBranch,
  AppWindow,
  Compass,
  Triangle,
} from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";

// Icon mapping dictionary
const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Palette,
  FileCode2,
  FileCode,
  Atom,
  Layers,
  Wind,
  Binary,
  Cpu,
  Terminal,
  Database,
  DatabaseBackup,
  Flame,
  GitBranch,
  Github,
  AppWindow,
  Compass,
  Triangle,
};

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 10 } },
  };

  return (
    <section id="skills" className="py-24 px-6 bg-background relative overflow-hidden">
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
            My <span className="text-primary">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[3px] bg-primary mx-auto rounded-full"
          />
        </div>

        {/* Skill categories grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((cat: SkillCategory, catIdx: number) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              className="p-8 rounded-3xl border border-card-border bg-card/25 hover:bg-card/45 backdrop-blur-md relative overflow-hidden group hover:border-primary/20 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.2)]"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

              <h3 className="text-xl font-bold mb-6 text-foreground border-b border-card-border/50 pb-3 flex items-center justify-between">
                <span>{cat.title}</span>
                <span className="text-xs text-primary font-mono font-medium">Category {catIdx + 1}</span>
              </h3>

              {/* Badges container */}
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill: Skill) => {
                  const IconComponent = iconMap[skill.iconName] || Code;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={badgeVariants}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              scale: 1.05,
                              boxShadow: "0 0 15px rgba(var(--primary-rgb), 0.15)",
                              borderColor: "var(--primary)",
                              color: "var(--foreground)",
                            }
                      }
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-card-border bg-card/65 text-muted hover:text-foreground cursor-pointer transition-colors duration-200"
                    >
                      <IconComponent className="h-4 w-4 text-primary shrink-0" />
                      <span>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
