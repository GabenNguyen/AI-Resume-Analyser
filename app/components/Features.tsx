"use client";

import { FileText, Brain, Gauge } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Understands hiring signals, not just keywords.",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Gauge,
    title: "ATS Score",
    description: "See how your resume performs in real ATS systems.",
    color: "from-green-400 to-green-600",
  },
  {
    icon: FileText,
    title: "Actionable Feedback",
    description: "Clear fixes, bullet rewrites, and structure advice.",
    color: "from-yellow-400 to-yellow-500",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <motion.h2
        className="text-center mb-12 font-bold text-4xl sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Key Features
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-3">
        {features.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="group relative rounded-3xl bg-card p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:dark:shadow-zinc-700"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r ${feature.color} text-white mb-6 transition-transform group-hover:scale-110`}
              >
                <FeatureIcon className="h-8 w-8" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
