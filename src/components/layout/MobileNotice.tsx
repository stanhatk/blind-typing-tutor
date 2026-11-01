"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface MobileNoticeProps {
  desktopRequired: string;
  description: string;
  closeLabel: string;
}

/**
 * Dismissible banner for touch-only devices. The trainer still renders below
 * it, so phone visitors (and Googlebot Smartphone) see the real page.
 */
export const MobileNotice: React.FC<MobileNoticeProps> = ({
  desktopRequired,
  description,
  closeLabel,
}) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="status"
      className="mx-4 mt-4 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-100"
    >
      <div className="grow">
        <p className="font-semibold">{desktopRequired}</p>
        <p className="mt-1">{description}</p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded hover:bg-amber-100 dark:hover:bg-amber-900 cursor-pointer"
        title={closeLabel}
        aria-label={closeLabel}
      >
        <X size={18} />
      </button>
    </div>
  );
};
