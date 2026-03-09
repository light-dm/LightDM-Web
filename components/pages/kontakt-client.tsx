"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function KontaktClient() {
  const { toast } = useToast();
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
          source: "Kontaktseite - Kontaktformular",
          page: typeof window !== "undefined" ? window.location.href : "/kontakt",
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
    <>
      <ScrollToTop />
      <SmoothScroll>
      <div className="min-h-screen font-sans selection:bg-[#F5C518] selection:text-black">
        <Navbar isDarkTheme={true} />
        
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="hidden lg:block absolute top-1/4 -left-32 w-[600px] h-[800px] opacity-[0.08]"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(245, 197, 24, 0.4) 30%, rgba(255, 215, 0, 0.6) 50%, rgba(245, 197, 24, 0.4) 70%, transparent 100%)",
              transform: "rotate(-15deg) skewY(-5deg)",
              filter: "blur(60px)",
            }}
          />
        </div>
        
        <main className="relative z-10 pt-32 pb-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="overflow-hidden mb-4">
                <motion.span 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white/40"
                >
                  Kontakt
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[8vw] sm:text-[7vw] md:text-[5vw] lg:text-[3.5vw] leading-[1.1] font-bold tracking-[-0.02em] mb-6"
                >
                  <span className="text-white">Lassen Sie uns </span>
                  <span className="text-gradient">zusammenarbeiten</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-lg text-white/50"
                >
                  Erzählen Sie uns von Ihrem Projekt und wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </motion.p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                  <Mail className="w-6 h-6 text-[#F5C518] mb-4" />
                  <h3 className="text-white font-semibold mb-2">E-Mail</h3>
                  <p className="text-white/50 text-sm">info@light-dm.de</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                  <Phone className="w-6 h-6 text-[#F5C518] mb-4" />
                  <h3 className="text-white font-semibold mb-2">Telefon</h3>
                  <a href="tel:+494060778244" className="text-white/50 text-sm hover:text-[#F5C518] transition-colors">+49 40 60778244</a>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                  <MapPin className="w-6 h-6 text-[#F5C518] mb-4" />
                  <h3 className="text-white font-semibold mb-2">Standort</h3>
                  <p className="text-white/50 text-sm">Buxtehude, Deutschland</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="p-6 md:p-12 rounded-2xl md:rounded-3xl border backdrop-blur-sm border-white/10 bg-white/[0.02]">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12 md:py-16"
                      data-testid="kontakt-success"
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
                        data-testid="button-kontakt-new-message"
                      >
                        Neue Nachricht senden
                      </Button>
                    </motion.div>
                  ) : (
                  <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label htmlFor="kontakt-name" className="block text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 text-white/50">
                          Name
                        </label>
                        <Input 
                          id="kontakt-name"
                          placeholder="Ihr Name" 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-white/[0.03] border rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base focus-visible:ring-1 focus-visible:ring-[#F5C518] transition-all border-white/10 text-white placeholder:text-white/30"
                          data-testid="input-kontakt-name" 
                        />
                        {errors.name && <p className="text-red-400 text-xs md:text-sm mt-2">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="kontakt-email" className="block text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 text-white/50">
                          E-Mail
                        </label>
                        <Input 
                          id="kontakt-email"
                          placeholder="ihre@email.de" 
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-white/[0.03] border rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base focus-visible:ring-1 focus-visible:ring-[#F5C518] transition-all border-white/10 text-white placeholder:text-white/30"
                          data-testid="input-kontakt-email" 
                        />
                        {errors.email && <p className="text-red-400 text-xs md:text-sm mt-2">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="kontakt-type" className="block text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 text-white/50">
                        Projektart
                      </label>
                      <select
                        id="kontakt-type"
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full bg-white/[0.03] border rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base focus:ring-1 focus:ring-[#F5C518] focus:outline-none border-white/10 text-white appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                        data-testid="select-kontakt-type"
                      >
                        <option value="" className="bg-[#1a1918]">Auswählen</option>
                        <option value="website" className="bg-[#1a1918]">Website</option>
                        <option value="branding" className="bg-[#1a1918]">Branding</option>
                        <option value="consulting" className="bg-[#1a1918]">IT-Beratung</option>
                        <option value="support" className="bg-[#1a1918]">IT-Support</option>
                        <option value="other" className="bg-[#1a1918]">Sonstiges</option>
                      </select>
                      {errors.type && <p className="text-red-400 text-xs md:text-sm mt-2">{errors.type}</p>}
                    </div>

                    <div>
                      <label htmlFor="kontakt-message" className="block text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 text-white/50">
                        Nachricht
                      </label>
                      <Textarea 
                        id="kontakt-message"
                        placeholder="Erzählen Sie uns von Ihrem Projekt..." 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="bg-white/[0.03] border rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base focus-visible:ring-1 focus-visible:ring-[#F5C518] min-h-[100px] md:min-h-[120px] resize-none transition-all border-white/10 text-white placeholder:text-white/30"
                        data-testid="textarea-kontakt-message"
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
                        data-testid="button-kontakt-submit"
                      >
                        {submitContactMutation.isPending ? "Senden..." : "Absenden"}
                      </Button>
                    </div>
                  </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
      </SmoothScroll>
    </>
  );
}
