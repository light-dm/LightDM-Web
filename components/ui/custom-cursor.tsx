"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    const updatePosition = () => {
      const lerp = 0.35;
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerp;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerp;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      rafRef.current = requestAnimationFrame(updatePosition);
    };
    
    const moveCursor = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      const relatedTarget = e.relatedTarget as Element | null;
      if (target.closest('a, button, [data-cursor-hover]') && 
          !relatedTarget?.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };
    
    rafRef.current = requestAnimationFrame(updatePosition);
    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-[#F5C518] rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0) translate(-50%, -50%)' }}
      />
      <div
        ref={cursorOuterRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[#F5C518]/40 will-change-transform transition-[width,height] duration-150 ${
          isHovering ? 'w-12 h-12' : 'w-7 h-7'
        }`}
        style={{ transform: 'translate3d(0, 0, 0) translate(-50%, -50%)' }}
      />
    </>
  );
}
