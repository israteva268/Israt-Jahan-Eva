"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { timelineData, TimelineItem } from "@/data/experience";
import { Briefcase, GraduationCap, Calendar, ArrowUpRight } from "lucide-react";

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.2, ease: "easeInOut" as const },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
    },
  };

  return (
    <section id="experience" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Journey & <span className="text-primary">Education</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[3px] bg-primary mx-auto rounded-full"
          />
        </div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical timeline line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ originY: 0 }}
            className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[2px] bg-card-border pointer-events-none"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-12"
          >
            {timelineData.map((item: TimelineItem, idx: number) => {
              const isEven = idx % 2 === 0;
              const isEdu = item.type === "education";

              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline node icon */}
                  <div className="absolute left-6 md:left-1/2 top-4 md:top-auto -translate-x-[15px] z-20">
                    <motion.div
                      variants={dotVariants}
                      className={`w-8 h-8 rounded-full border-2 bg-background flex items-center justify-center shadow-lg transition-colors duration-300 ${
                        isEdu
                          ? "border-primary text-primary"
                          : "border-secondary text-secondary"
                      }`}
                    >
                      {isEdu ? (
                        <GraduationCap className="h-4 w-4" />
                      ) : (
                        <Briefcase className="h-4 w-4" />
                      )}
                    </motion.div>
                  </div>

                  {/* Left / Right timeline card container */}
                  <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      variants={cardVariants}
                      className="p-6 sm:p-8 rounded-2xl border border-card-border bg-card/25 hover:bg-card/45 backdrop-blur-md relative overflow-hidden group hover:border-primary/20 transition-all shadow-[0_5px_20px_rgba(0,0,0,0.15)]"
                    >
                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Timeline Duration */}
                      <div
                        className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-3 text-muted ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{item.duration}</span>
                      </div>

                      {/* Degree / Job Role */}
                      <h3 className="text-lg font-bold text-foreground mb-1 leading-snug">
                        {item.roleOrDegree}
                      </h3>

                      {/* Institution / Company */}
                      <div className="text-sm font-semibold text-primary mb-4 flex items-center gap-1 hover:brightness-110 transition-all justify-start inline-flex">
                        {item.orgUrl ? (
                          <a
                            href={item.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 hover:underline"
                          >
                            <span>{item.organization}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span>{item.organization}</span>
                        )}
                      </div>

                      {/* Details */}
                      <p className="text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacing element for grid layout balance */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
