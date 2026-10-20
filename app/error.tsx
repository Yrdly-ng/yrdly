"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main-content" className="wrap page-intro">
      <p className="eyebrow">LET’S TRY THAT AGAIN</p>
      <h1>A little trouble <em>loading this page.</em></h1>
      <p>Try once more, or head back to discover another corner of YRDLY.</p>
      <div className="inline-actions section">
        <button className="button button-primary" onClick={reset}>Try again ↻</button>
        {/* Full document navigation recovers even when the client router caused the error. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="text-link">Back to YRDLY ↗</a>
        <a href="/contact" className="text-link">Contact support ↗</a>
      </div>
    </main>
  );
}
