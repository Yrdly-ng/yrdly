"use client";
import { useState } from "react";
import { appLink } from "@/lib/app-links";
const instructions = {
  Android: [
    "Open app.yrdly.ng in Chrome and sign in.",
    "Open the browser menu, then choose Install app or Add to Home screen.",
    "Follow the prompt. YRDLY is now a tap away.",
  ],
  "iPhone / iPad": [
    "Open app.yrdly.ng in Safari and sign in.",
    "Tap Share, then choose Add to Home Screen.",
    "Tap Add. Open YRDLY from your home screen.",
  ],
  Desktop: [
    "Open app.yrdly.ng in Chrome or Edge.",
    "Choose the install option in the address bar or browser menu, when available.",
    "Confirm to open YRDLY in its own window.",
  ],
};
export function PwaInstallSection() {
  const [tab, setTab] = useState<keyof typeof instructions>("Android");
  return (
    <section className="section wrap install-section">
      <div>
        <p className="eyebrow">YOUR EVERYDAY, WITHIN REACH</p>
        <h2>
          Your neighbourhood.
          <br />
          <em>In your pocket.</em>
        </h2>
        <p>
          Open YRDLY in your browser, or add it to your home screen. Your
          conversations, saved finds and next plans, all in one place.
        </p>
        <a href={appLink()} className="text-link">
          Open the web app ↗
        </a>
      </div>
      <div>
        <div
          className="install-tabs"
          role="group"
          aria-label="Installation instructions"
        >
          {(Object.keys(instructions) as Array<keyof typeof instructions>).map(
            (key) => (
              <button
                key={key}
                aria-pressed={tab === key}
                onClick={() => setTab(key)}
              >
                {key}
              </button>
            ),
          )}
        </div>
        <ol className="install-steps" aria-label={`${tab} installation`}>
          {instructions[tab].map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
