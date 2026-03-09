import { motion } from "framer-motion";

type SectionTheme = "dark" | "light";

interface ProcessProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  currentTheme: SectionTheme;
}

const steps = [
  { num: "01", title: "DISCOVERY", desc: "Analyse & Zielgruppe" },
  { num: "02", title: "STRATEGIE", desc: "Roadmap & Tech Stack" },
  { num: "03", title: "DESIGN", desc: "UI/UX & Prototypen" },
  { num: "04", title: "ENTWICKLUNG", desc: "Frontend & Backend" },
  { num: "05", title: "LAUNCH", desc: "Testing & Go-live" },
];

export function Process({ setRef, currentTheme }: ProcessProps) {
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const borderColor = currentTheme === "dark" ? "border-white/10" : "border-black/10";

  return (
    <section ref={setRef("process")} id="process" className="py-24 md:py-32">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-12">
          <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-700 ${mutedColor}`}>Sec.</span>
          <span className="text-[#eedea0]">/●</span>
          <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight transition-colors duration-700 ${textColor}`}>Prozess</h2>
        </div>

        <div className={`border-t transition-colors duration-700 ${borderColor}`}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`border-b py-6 md:py-8 grid grid-cols-12 gap-2 md:gap-4 items-center transition-colors duration-700 ${borderColor}`}
            >
              <div className={`col-span-2 md:col-span-1 font-mono text-xs transition-colors duration-700 ${mutedColor}`}>{step.num}</div>
              <div className={`col-span-5 md:col-span-5 text-base sm:text-lg md:text-xl font-bold transition-colors duration-700 ${textColor}`}>{step.title}</div>
              <div className={`col-span-5 md:col-span-6 text-xs sm:text-sm transition-colors duration-700 ${mutedColor}`}>{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
