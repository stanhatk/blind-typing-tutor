"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if the current device is mobile
 * @param breakpoint - Width breakpoint in pixels (default: 768)
 * @returns boolean indicating if device is mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  // Start as desktop so the server render and hydration match
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < breakpoint ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
