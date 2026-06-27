"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, AlertCircle, CheckCircle } from "lucide-react";
import { Github, Linkedin } from "@/components/icons/BrandIcons";

interface FormFields {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormFields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<FormFields> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        
        // Trigger celebratory confetti effect
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00f2fe", "#9d4edd", "#ff007f"],
        });
      } else {
        setApiError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setApiError("Failed to send message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background relative overflow-hidden">
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
            Get In <span className="text-primary">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[3px] bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Left Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Let's discuss something great!
              </h3>
              <p className="text-muted leading-relaxed mb-8">
                I am always open to discussing new projects, design ideas, collaboration, or opportunities in software engineering. Feel free to shoot me a message!
              </p>

              {/* Social Channels / Details */}
              <div className="flex flex-col gap-5">
                {/* Email */}
                <a
                  href="mailto:israteva8084@gmail.com"
                  className="flex items-center gap-4 group cursor-pointer text-muted hover:text-foreground transition-colors"
                >
                  <div className="p-3.5 rounded-xl border border-card-border bg-card/40 group-hover:border-primary/40 group-hover:text-primary transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted/60">Email me</div>
                    <div className="text-sm font-semibold break-all">israteva8084@gmail.com</div>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer text-muted hover:text-foreground transition-colors"
                >
                  <div className="p-3.5 rounded-xl border border-card-border bg-card/40 group-hover:border-primary/40 group-hover:text-primary transition-all">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted/60">GitHub</div>
                    <div className="text-sm font-semibold">github.com/israteva</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer text-muted hover:text-foreground transition-colors"
                >
                  <div className="p-3.5 rounded-xl border border-card-border bg-card/40 group-hover:border-primary/40 group-hover:text-primary transition-all">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted/60">LinkedIn</div>
                    <div className="text-sm font-semibold">linkedin.com/in/israt-jahan-eva</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Status badge */}
            <div className="p-4 rounded-xl border border-card-border bg-card/20 backdrop-blur-md flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-xs font-semibold text-muted">Currently active on development sprints</span>
            </div>
          </div>

          {/* Form Right Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl border border-card-border bg-card/25 backdrop-blur-md shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {success ? (
                  // Success State
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <CheckCircle className="h-16 w-16 text-emerald-500 mb-6 animate-bounce" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent Successfully!</h3>
                    <p className="text-muted max-w-sm mb-8 text-sm">
                      Thank you for reaching out, Eva! I will read your message and reply as soon as possible.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-card border border-card-border hover:border-foreground/30 text-foreground cursor-pointer transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  // Form State
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {apiError && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <span>{apiError}</span>
                      </div>
                    )}

                    {/* Name Input */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-muted mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-input border transition-all duration-300 text-foreground placeholder-muted/50 focus:outline-none focus:ring-2 ${
                          errors.name
                            ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500"
                            : "border-input-border focus:ring-primary/20 focus:border-primary"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-muted mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-input border transition-all duration-300 text-foreground placeholder-muted/50 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500"
                            : "border-input-border focus:ring-primary/20 focus:border-primary"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message Input */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-muted mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-input border transition-all duration-300 text-foreground placeholder-muted/50 focus:outline-none focus:ring-2 ${
                          errors.message
                            ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500"
                            : "border-input-border focus:ring-primary/20 focus:border-primary"
                        }`}
                        placeholder="Hi Eva, I'd like to talk about..."
                      />
                      {errors.message && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-primary text-background font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4.5 w-4.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
