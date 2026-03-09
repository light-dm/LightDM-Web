"use client";

import { motion, useInView } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";

interface ContactProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export function Contact({ setRef }: ContactProps) {
  const { toast } = useToast();
  
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitContactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
      
      let endpoint = "/api/contact";
      const isExternal = typeof window !== "undefined" && !window.location.hostname.includes("replit");
      if (isExternal) {
        if (webhookUrl) {
          endpoint = webhookUrl;
        } else if (formspreeId) {
          endpoint = `https://formspree.io/f/${formspreeId}`;
        } else {
          const subject = encodeURIComponent(`Kontaktanfrage von ${data.name} - ${data.type}`);
          const body = encodeURIComponent(`Name: ${data.name}\nE-Mail: ${data.email}\nProjektart: ${data.type}\n\nNachricht:\n${data.message}`);
          window.location.href = `mailto:info@light-dm.de?subject=${subject}&body=${body}`;
          return { success: true, mailto: true };
        }
      }
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: data.type,
          message: data.message,
          source: "Startseite - Kontaktformular",
          page: typeof window !== "undefined" ? window.location.href : "/",
        }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error || "Fehler beim Senden");
      }
      return response.json().catch(() => ({ success: true }));
    },
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", type: "", message: "" });
      setErrors({});
    },
    onError: (error: Error) => {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    },
  });

  function validateForm() {
    const newErrors: Record<string, string> = {};
    if (formData.name.length < 2) newErrors.name = "Bitte Name eingeben.";
    if (!formData.email.includes("@")) newErrors.email = "Gültige E-Mail eingeben.";
    if (!formData.type) newErrors.type = "Projektart wählen.";
    if (formData.message.length < 10) newErrors.message = "Etwas mehr Details bitte.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateForm()) {
      submitContactMutation.mutate(formData);
    }
  }

  return (
    <section ref={setRef("contact")} id="contact" className="py-16 md:py-24 relative">
      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-lg text-white/50"
          >
            Kontakt
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            >
              <span className="text-white">Bereit Ihr Business zu </span>
              <span className="text-gradient">transformieren?</span>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 md:mt-6 text-base md:text-lg text-white/40"
          >
            Buchen Sie ein kostenloses Strategiegespräch und erfahren Sie, wie wir Ihr Unternehmen voranbringen.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto p-6 md:p-12 rounded-2xl md:rounded-3xl border backdrop-blur-sm border-white/10 bg-white/[0.02]"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12 md:py-16"
              data-testid="contact-success"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#F5C518] to-[#E6A800] flex items-center justify-center">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-[#1a1918]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Nachricht gesendet</h3>
              <p className="text-white/60 text-sm md:text-base mb-8 max-w-md mx-auto">
                Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="rounded-full h-11 md:h-12 px-6 md:px-8 text-sm font-semibold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                data-testid="button-new-message"
              >
                Neue Nachricht senden
              </Button>
            </motion.div>
          ) : (
          <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 text-white/50">
                  Name
                </label>
                <Input 
                  id="contact-name"
                  placeholder="Ihr Name" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/[0.03] border rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base focus-visible:ring-1 focus-visible:ring-[#F5C518] transition-all border-white/10 text-white placeholder:text-white/30"
                  data-testid="input-name" 
                />
                {errors.name && <p className="text-red-400 text-xs md:text-sm mt-2">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 text-white/50">
                  E-Mail
                </label>
                <Input 
                  id="contact-email"
                  placeholder="ihre@email.de" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/[0.03] border rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base focus-visible:ring-1 focus-visible:ring-[#F5C518] transition-all border-white/10 text-white placeholder:text-white/30"
                  data-testid="input-email" 
                />
                {errors.email && <p className="text-red-400 text-xs md:text-sm mt-2">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-type" className="block text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 text-white/50">
                Projektart
              </label>
              <select
                id="contact-type"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-white/[0.03] border rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base focus:ring-1 focus:ring-[#F5C518] focus:outline-none border-white/10 text-white appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                data-testid="select-project-type"
              >
                <option value="" className="bg-[#1a1918]">Auswählen</option>
                <option value="website" className="bg-[#1a1918]">Website</option>
                <option value="branding" className="bg-[#1a1918]">Branding</option>
                <option value="consulting" className="bg-[#1a1918]">IT-Beratung</option>
                <option value="other" className="bg-[#1a1918]">Sonstiges</option>
              </select>
              {errors.type && <p className="text-red-400 text-xs md:text-sm mt-2">{errors.type}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 text-white/50">
                Nachricht
              </label>
              <Textarea 
                id="contact-message"
                placeholder="Erzählen Sie uns von Ihrem Projekt..." 
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-white/[0.03] border rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base focus-visible:ring-1 focus-visible:ring-[#F5C518] min-h-[100px] md:min-h-[120px] resize-none transition-all border-white/10 text-white placeholder:text-white/30"
                data-testid="textarea-message"
              />
              {errors.message && <p className="text-red-400 text-xs md:text-sm mt-2">{errors.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 md:pt-4">
              <p className="text-[10px] md:text-xs text-white/40">
                Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
              </p>
              <Button 
                type="submit" 
                disabled={submitContactMutation.isPending}
                className="w-full sm:w-auto rounded-full h-11 md:h-12 px-6 md:px-8 text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-[#F5C518] to-[#E6A800] text-[#1a1918] hover:shadow-xl hover:shadow-[#F5C518]/25 transition-all hover:scale-105 active:scale-95"
                data-testid="button-submit"
              >
                {submitContactMutation.isPending ? "Senden..." : "Absenden"}
              </Button>
            </div>
          </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
