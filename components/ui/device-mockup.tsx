"use client";

import { motion } from "framer-motion";

interface DeviceMockupProps {
  src: string;
  alt: string;
  className?: string;
  url?: string;
}

export function LaptopMockup({ src, alt, className = "" }: DeviceMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto" style={{ perspective: "1200px" }}>
        <motion.div
          initial={{ rotateX: 8, rotateY: -5 }}
          whileHover={{ rotateX: 2, rotateY: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-t-xl p-2 shadow-2xl">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#333] border border-[#444]" />
            
            <div className="relative rounded-lg overflow-hidden border border-[#333] bg-black">
              <img 
                src={src} 
                alt={alt}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
          
          <div className="relative">
            <div className="h-4 bg-gradient-to-b from-[#1a1a1a] to-[#252525] rounded-b-lg" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-[#333] rounded-b-full" />
          </div>
          
          <div className="h-2 bg-gradient-to-b from-[#252525] to-[#1f1f1f] mx-[5%] rounded-b-xl shadow-xl" />
        </motion.div>
        
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-gradient-radial from-[#F5C518]/20 via-[#F5C518]/5 to-transparent blur-xl rounded-full" />
      </div>
    </div>
  );
}

export function FloatingMockup({ src, alt, className = "" }: DeviceMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          initial={{ rotateX: 12, rotateY: -8 }}
          whileHover={{ rotateX: 5, rotateY: -3, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5C518]/20 via-transparent to-[#E6A800]/10 z-10 pointer-events-none" />
            
            <div className="absolute -inset-[2px] bg-gradient-to-br from-[#F5C518]/30 via-white/10 to-[#E6A800]/20 rounded-2xl" />
            
            <div className="relative bg-[#0a0a0a] p-1 rounded-2xl">
              <img 
                src={src} 
                alt={alt}
                className="w-full rounded-xl object-cover object-top"
              />
            </div>
          </div>
          
          <div 
            className="absolute -inset-4 bg-gradient-to-br from-[#F5C518]/10 to-[#E6A800]/5 rounded-3xl blur-2xl -z-10"
            style={{ transform: "translateZ(-50px)" }}
          />
        </motion.div>
      </motion.div>
      
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-gradient-radial from-[#F5C518]/30 via-[#F5C518]/10 to-transparent blur-2xl rounded-full" />
    </div>
  );
}

export function BrowserMockup({ src, alt, className = "", url }: DeviceMockupProps) {
  const displayUrl = url ? url.replace(/^https?:\/\//, '') : 'example.com';
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="bg-gradient-to-b from-[#2a2a2a] to-[#222] rounded-t-xl p-2 md:p-3 flex items-center gap-2 border-b border-[#333]">
          <div className="flex gap-1 md:gap-1.5">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#28c840]" />
          </div>
          
          <div className="flex-1 mx-2 md:mx-4">
            <div className="bg-[#1a1a1a] rounded-md px-2 md:px-3 py-1 md:py-1.5 flex items-center gap-2 max-w-md mx-auto">
              <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#28c840] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[#888] text-[10px] md:text-xs truncate">{displayUrl}</span>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-b-xl overflow-hidden border-x border-b border-[#333] bg-black">
          <img 
            src={src} 
            alt={alt}
            className="w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
        
        <div className="absolute -inset-2 bg-gradient-to-br from-[#F5C518]/5 to-transparent rounded-2xl blur-xl -z-10" />
      </motion.div>
    </div>
  );
}

export function PhoneMockup({ src, alt, className = "" }: DeviceMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        className="relative mx-auto"
        style={{ maxWidth: "280px" }}
      >
        <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[3rem] p-2 shadow-2xl shadow-black/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-20" />
          
          <div className="relative rounded-[2.5rem] overflow-hidden bg-black border-4 border-[#333]">
            <img 
              src={src} 
              alt={alt}
              className="w-full aspect-[9/16] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-[#333] rounded-full" />
        </div>
        
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-gradient-radial from-[#F5C518]/25 via-[#F5C518]/10 to-transparent blur-xl rounded-full" />
      </motion.div>
    </div>
  );
}
