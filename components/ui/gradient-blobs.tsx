"use client";

import { motion } from "framer-motion";

interface GradientBlobsProps {
  variant?: "hero" | "section" | "contact";
}

export function GradientBlobs({ variant = "hero" }: GradientBlobsProps) {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-[20%] -right-[15%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle at 40% 40%, #F5C518 0%, #E6A800 20%, #CC8800 40%, transparent 65%)",
            filter: "blur(120px)",
            opacity: 0.35,
          }}
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute top-[50%] -left-[15%] w-[45vw] h-[45vw] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle at center, #FFD700 0%, #FFA500 30%, transparent 60%)",
            filter: "blur(100px)",
            opacity: 0.2,
          }}
          animate={{
            scale: [1.03, 1, 1.03],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute bottom-[5%] right-[20%] w-[25vw] h-[25vw] rounded-full will-change-transform hidden md:block"
          style={{
            background: "radial-gradient(circle at center, #FFC107 0%, #FF9800 25%, transparent 55%)",
            filter: "blur(80px)",
            opacity: 0.15,
          }}
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }
  
  if (variant === "contact") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-[30%] -left-[15%] w-[60vw] h-[60vw] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle at center, #F5C518 0%, #E6A800 25%, transparent 55%)",
            filter: "blur(140px)",
            opacity: 0.25,
          }}
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute top-[10%] -right-[10%] w-[35vw] h-[35vw] rounded-full will-change-transform hidden md:block"
          style={{
            background: "radial-gradient(circle at center, #FFD700 0%, transparent 55%)",
            filter: "blur(90px)",
            opacity: 0.15,
          }}
          animate={{
            scale: [1.03, 1, 1.03],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] md:w-[35vw] md:h-[35vw] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle at center, #F5C518 0%, transparent 55%)",
          filter: "blur(110px)",
          opacity: 0.1,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-[30vw] h-[30vw] rounded-full will-change-transform hidden md:block"
        style={{
          background: "radial-gradient(circle at center, #FFD700 0%, transparent 55%)",
          filter: "blur(90px)",
          opacity: 0.08,
        }}
        animate={{
          scale: [1.03, 1, 1.03],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
