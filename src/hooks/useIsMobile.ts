"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect a device without a physical keyboard: no fine pointer
 * (touch only), or a phone user agent. Tablets with a mouse or trackpad and
 * narrow desktop windows count as desktop.
 * @returns boolean indicating if device is mobile
 */
export function useIsMobile(): boolean {
  // Start as desktop so the server render and hydration match
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(any-pointer: fine)");
    const update = () => {
      setIsMobile(
        !finePointer.matches ||
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };

    update();
    finePointer.addEventListener("change", update);
    return () => finePointer.removeEventListener("change", update);
  }, []);

  return isMobile;
}
