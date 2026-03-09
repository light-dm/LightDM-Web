"use client";

import { useState, useEffect } from "react";

export function useIsSafari(): boolean {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium");
    setIsSafari(isSafariBrowser);
    
    if (isSafariBrowser) {
      document.documentElement.classList.add("is-safari");
    }
  }, []);

  return isSafari;
}
