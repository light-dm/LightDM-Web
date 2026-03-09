"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

function SafariDetector() {
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium");
    
    if (isSafariBrowser) {
      document.documentElement.classList.add("is-safari");
    }
  }, []);
  
  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SafariDetector />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
