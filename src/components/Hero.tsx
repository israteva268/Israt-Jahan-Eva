"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const roles = ["Full Stack Developer", "CSE Student @ UIU", "Gardening Enthusiast"];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[currentRoleIndex];

    const typeSpeed = isDeleting ? 30 : 80;
    const nextActionDelay = isDeleting && displayedRole === "" ? 500 : isDeleting ? typeSpeed : 100;

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length + 1));
        if (displayedRole === currentFullText) {
          // Pause at full text
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length - 1));
        if (displayedRole === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
      timer = setTimeout(handleTyping, typeSpeed);
    };

    timer = setTimeout(handleTyping, nextActionDelay);
    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  // Magnetic button effect hook/state
  const useMagnetic = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const mouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (shouldReduceMotion) return;
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x: x * 0.35, y: y * 0.35 });
    };

    const mouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return { position, mouseMove, mouseLeave };
  };

  const cta1 = useMagnetic();
  const cta2 = useMagnetic();

  // Navigation scroll function
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - navHeight,
        behavior: "smooth",
      });
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-background"
    >
      {/* Grid background overlay with radial fade */}
      <div className="absolute inset-0 grid-bg opacity-75 z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/60 to-background pointer-events-none z-0" 
           style={{ background: "radial-gradient(circle at 50% 50%, transparent 20%, var(--background) 95%)" }} 
      />

      {/* Floating gradient orbs in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-orb-1 opacity-40 blur-3xl"
        />
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: [0, -50, 30, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-orb-2 opacity-40 blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Tag */}
          <motion.div
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Available for Opportunities
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary"
            style={{ lineHeight: 1.15 }}
          >
            Hi, I'm <span className="text-primary">Israt Jahan Eva</span>
          </motion.h1>

          {/* Subheading typing role */}
          <motion.div
            variants={itemVariants}
            className="text-xl sm:text-3xl font-semibold mb-6 h-12 flex items-center text-muted"
          >
            <span>I am a&nbsp;</span>
            <span className="text-foreground border-r-2 border-primary pr-1 min-h-[1.5em] inline-block font-mono text-primary font-bold">
              {displayedRole}
            </span>
          </motion.div>

          {/* Intro text */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-muted mb-10 leading-relaxed"
          >
            A passionate computer science student and full-stack developer dedicated to building responsive, modern web applications. Currently studying CSE at United International University. Let's create something impact-driven together!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            {/* View Projects CTA */}
            <motion.button
              onClick={() => scrollToSection("projects")}
              onMouseMove={cta1.mouseMove}
              onMouseLeave={cta1.mouseLeave}
              animate={{ x: cta1.position.x, y: cta1.position.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              className="w-full sm:w-auto cursor-pointer px-8 py-4 rounded-xl bg-primary text-background font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2 transition-all hover:brightness-110"
            >
              View Projects <ArrowRight className="h-5 w-5" />
            </motion.button>

            {/* Contact Me CTA */}
            <motion.button
              onClick={() => scrollToSection("contact")}
              onMouseMove={cta2.mouseMove}
              onMouseLeave={cta2.mouseLeave}
              animate={{ x: cta2.position.x, y: cta2.position.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              className="w-full sm:w-auto cursor-pointer px-8 py-4 rounded-xl border border-card-border bg-card/50 hover:bg-card text-foreground font-bold backdrop-blur-md flex items-center justify-center gap-2 transition-colors hover:border-foreground/20"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted flex justify-center p-1.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
