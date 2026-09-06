"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Portado del listener de clics global de script.js: registra data-track,
// y detecta clics hacia WhatsApp, Instagram y LinkedIn en cualquier enlace.
export default function AnalyticsTracker() {
  useEffect(() => {
    function onClick(event) {
      const link = event.target.closest("a");
      if (!link) return;
      if (link.dataset.track) track(link.dataset.track, { programa: link.dataset.program || "" });
      if (link.href.includes("wa.me")) track("click_whatsapp");
      if (link.href.includes("instagram.com")) track("click_instagram");
      if (link.href.includes("linkedin.com")) track("click_linkedin");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
