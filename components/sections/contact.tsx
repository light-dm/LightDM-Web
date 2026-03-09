"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

type SectionTheme = "dark" | "light";

interface ContactProps {
  setRef: (id: string) => (el: HTMLElement | null) => void;
  currentTheme: SectionTheme;
}

const formSchema = z.object({
  name: z.string().min(2, "Bitte Name eingeben."),
  company: z.string().optional(),
  email: z.string().email("Gültige E-Mail eingeben."),
  type: z.string({ required_error: "Projektart wählen." }),
  message: z.string().min(10, "Etwas mehr Details bitte.")
});

type FormValues = z.infer<typeof formSchema>;

export function Contact({ setRef, currentTheme }: ContactProps) {
  const { toast } = useToast();
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const mutedColor = currentTheme === "dark" ? "text-white/40" : "text-black/40";
  const borderColor = currentTheme === "dark" ? "border-white/20" : "border-black/20";
  const accentColor = currentTheme === "dark" ? "text-[#eedea0]" : "text-[#1a1918]";
  const hoverAccent = currentTheme === "dark" ? "hover:text-[#eedea0]" : "hover:text-[#1a1918]/70";
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", company: "", email: "", message: "" },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || null,
          projectType: data.type,
          message: data.message,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Fehler");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Gesendet!", description: "Wir melden uns." });
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    },
  });

  function onSubmit(values: FormValues) {
    submitContactMutation.mutate(values);
  }

  return (
    <section ref={setRef("contact")} id="contact" className="py-24 md:py-32">
      <div className="container-custom">
        
        <div className="flex items-center gap-3 mb-12">
          <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-700 ${mutedColor}`}>Sec.</span>
          <span className={`transition-colors duration-700 ${accentColor}`}>/●</span>
          <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight transition-colors duration-700 ${textColor}`}>Kontakt</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6 transition-colors duration-700 ${textColor}`}>
              PROJEKT<br/>IM KOPF?
            </h3>
            <p className={`text-base leading-relaxed mb-8 transition-colors duration-700 ${mutedColor}`}>
              Schreiben Sie uns. Wir melden uns innerhalb von 24 Stunden.
            </p>

            <div className={`space-y-4 text-sm transition-colors duration-700 ${mutedColor}`}>
              <div className={`pb-4 border-b transition-colors duration-700 ${borderColor}`}>
                <a href="mailto:info@light-dm.de" className={`${hoverAccent} transition-colors ${textColor}`}>info@light-dm.de</a>
              </div>
              <div>Deutschland / Remote</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-[10px] uppercase tracking-widest ${mutedColor}`}>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ihr Name" 
                          {...field} 
                          className={`bg-transparent border-0 border-b rounded-none px-0 py-3 text-base focus-visible:ring-0 ${borderColor} ${textColor}`}
                          data-testid="input-name" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-[10px] uppercase tracking-widest ${mutedColor}`}>E-Mail</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ihre@email.de" 
                          {...field} 
                          className={`bg-transparent border-0 border-b rounded-none px-0 py-3 text-base focus-visible:ring-0 ${borderColor} ${textColor}`}
                          data-testid="input-email" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-[10px] uppercase tracking-widest ${mutedColor}`}>Projektart</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger 
                            className={`bg-transparent border-0 border-b rounded-none px-0 py-3 text-base focus:ring-0 ${borderColor} ${textColor}`}
                            data-testid="select-project-type"
                          >
                            <SelectValue placeholder="Auswählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="consulting">IT-Beratung</SelectItem>
                          <SelectItem value="other">Sonstiges</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-[10px] uppercase tracking-widest ${mutedColor}`}>Nachricht</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ihr Vorhaben..." 
                          className={`bg-transparent border-0 border-b rounded-none px-0 py-3 text-base focus-visible:ring-0 min-h-[80px] resize-none ${borderColor} ${textColor}`}
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={submitContactMutation.isPending}
                  className={`mt-6 rounded-full h-11 px-6 text-sm font-medium ${currentTheme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"}`}
                  data-testid="button-submit"
                >
                  {submitContactMutation.isPending ? "Senden..." : "Absenden"}
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
