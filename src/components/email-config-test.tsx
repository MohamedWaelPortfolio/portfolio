"use client";

import { useEffect } from "react";
import { EMAIL_CONFIG } from "@/config/email-config";

export function EmailConfigTest() {
  useEffect(() => {
    // Configuration is checked silently
  }, []);

  return (
    <div className="fixed bottom-4 right-4 rounded-lg bg-white/10 p-4 text-sm backdrop-blur-lg">
      <h3 className="mb-2 font-semibold">EmailJS Config Test</h3>
      <div className="space-y-1 text-xs">
        <p>Public Key: {EMAIL_CONFIG.PUBLIC_KEY ? "✅" : "❌"}</p>
        <p>Service ID: {EMAIL_CONFIG.SERVICE_ID ? "✅" : "❌"}</p>
        <p>Template ID: {EMAIL_CONFIG.TEMPLATE_ID ? "✅" : "❌"}</p>
      </div>
    </div>
  );
}
