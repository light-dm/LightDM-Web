"use client";

import { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0d0d0c",
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.4s ease-out",
        WebkitTransition: "opacity 0.4s ease-out",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src="/images/logo-symbol.png"
            alt="LIGHT DM"
            style={{
              width: 80,
              height: 80,
              filter: "drop-shadow(0 0 30px rgba(245,197,24,0.5))",
              WebkitFilter: "drop-shadow(0 0 30px rgba(245,197,24,0.5))",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 32,
            width: 120,
            height: 2,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 4,
            overflow: "hidden",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(to right, #F5C518, #E6A800)",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        <p
          style={{
            marginTop: 16,
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
          }}
        >
          LIGHT DM
        </p>
      </div>
    </div>
  );
}
