import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const letters = "LIGHT".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#1a1918] flex items-center justify-center"
        >
          <div className="flex overflow-hidden">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-[15vw] md:text-[10vw] font-bold text-[#eedea0] tracking-tighter"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[45%] left-1/2 -translate-x-1/2 w-[20vw] md:w-[12vw] h-[2px] bg-[#eedea0] origin-left"
          />
          
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-[38%] text-white/40 text-xs uppercase tracking-[0.3em]"
          >
            Digital Marketing
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
