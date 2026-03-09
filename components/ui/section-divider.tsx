"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="container-custom"
    >
      <div className="h-px w-full origin-left bg-white/10" />
    </motion.div>
  );
}
