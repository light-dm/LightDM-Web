"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function Marquee({ 
  items, 
  direction = "left", 
  speed = 25,
  className = ""
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span key={i} className="flex items-center" data-testid={`text-marquee-item-${i}`}>
            <span className="px-4 md:px-6">{item}</span>
            <span className="text-[#F5C518] mx-4 md:mx-6 text-lg">●</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
