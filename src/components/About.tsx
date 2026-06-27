"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Heart, User, MapPin } from "lucide-react";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="about" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            About <span className="text-primary">Me</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[3px] bg-primary mx-auto rounded-full"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Creative Layout/Left Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl border border-card-border bg-card/30 backdrop-blur-md relative overflow-hidden group hover:border-primary/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Identity</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    Full Name: <span className="text-foreground font-semibold">Israt Jahan Eva</span><br />
                    Nickname: <span className="text-foreground font-semibold">Eva</span><br />
                    Based in: <span className="text-foreground font-semibold">Dhaka, Bangladesh</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl border border-card-border bg-card/30 backdrop-blur-md relative overflow-hidden group hover:border-primary/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Education</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    Pursuing B.Sc. in Computer Science & Engineering at{" "}
                    <span className="text-foreground font-semibold">United International University (UIU)</span>.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl border border-card-border bg-card/30 backdrop-blur-md relative overflow-hidden group hover:border-primary/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Hobby</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    Passionate about <span className="text-foreground font-semibold">Gardening</span>. Tending to plants nurtures a detail-oriented, patient mindset.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Biography Text/Right Columns */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-2 text-foreground"
            >
              Nurturing Code & Growth
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-muted leading-relaxed text-base"
            >
              I am a web developer who approaches programming much like **gardening**. Both crafts require a deep appreciation for structure, continuous nourishment, and immense patience. Just as a seed requires the right soil and watering to bloom, a web project needs clean database architectures, sturdy backend frameworks, and polished frontend styles to thrive.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted leading-relaxed text-base"
            >
              My coding journey took root during my school years and blossomed as I transitioned to college and eventually university. Currently, as a CSE student at **United International University**, I specialize in building full-stack applications with technologies like **PHP (Laravel)**, **Next.js**, and **Tailwind CSS**. I enjoy engineering clean APIs, designing dynamic user interfaces, and automating workflows.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted leading-relaxed text-base"
            >
              When I'm not coding or studying, you can find me in my garden, checking on my plants. Gardening serves as my creative escape, reminding me that the greatest systems—whether digital or biological—grow step-by-step, day-by-day.
            </motion.p>

            {/* Micro Stats Counter */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-card-border/50"
            >
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary">15+</div>
                <div className="text-[10px] sm:text-xs text-muted uppercase tracking-wider font-bold">Projects Built</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-secondary">3+</div>
                <div className="text-[10px] sm:text-xs text-muted uppercase tracking-wider font-bold">Years Coding</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary">100%</div>
                <div className="text-[10px] sm:text-xs text-muted uppercase tracking-wider font-bold">Passionate</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
