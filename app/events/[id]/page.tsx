"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ContentImage } from "@/components/discovery/content-image";
import { appLink } from "@/lib/app-links";
import { eventIsPast, priceLabel, type PublicEvent } from "@/lib/public-types";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [event, setEvent] = useState<PublicEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const past = event ? eventIsPast(event) : false;
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setFailed(false);
    params
      .then(async ({ id }) => {
        const res = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]),
        });
        if (!res.ok) throw new Error("Unavailable");
        const events = await res.json();
        setEvent(
          Array.isArray(events)
            ? events.find((e: PublicEvent) => e.id === id) || null
            : null,
        );
      })
      .catch((error) => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [params, attempt]);
  return (
    <>
      <Header />
      <main id="main-content" className="wrap">
        <Link href="/events" className="text-link" style={{ marginTop: 25 }}>
          ← All events
        </Link>
        {loading ? (
          <div className="section" role="status">
            <p>Finding the details…</p>
            <div className="preview-skeleton">
              <div />
              <div />
            </div>
          </div>
        ) : !event ? (
          <section className="section">
            <h1 className="text-3xl">
              {failed
                ? "We couldn’t load this event."
                : "This event isn’t available here."}
            </h1>
            <p className="my-5">
              You can browse other public events or check the latest details in
              the app.
            </p>
            <div className="inline-actions">
            {failed && <button className="button button-primary" onClick={() => setAttempt(value => value + 1)}>Try again ↻</button>}
            <Link href="/events" className="text-link">Browse public events ↗</Link>
            <a href={appLink("/events")} className="text-link">
              Explore events on YRDLY ↗
            </a>
            </div>
          </section>
        ) : (
          <article className="event-detail">
            <div className="event-detail-media">
              <ContentImage src={event.image} alt={event.name} eager />
            </div>
            <div className="event-detail-copy">
              <p className="eyebrow">
                {event.category || "GET TOGETHER ON YRDLY"}
              </p>
              <h1>{event.name}</h1>
              <p>{event.description}</p>
              <dl className="event-facts">
                <div>
                  <dt>When</dt>
                  <dd>
                    {event.date}
                    {event.time ? ` · ${event.time}` : ""}
                  </dd>
                </div>
                <div>
                  <dt>Where</dt>
                  <dd>{event.location || "See location details in the app"}</dd>
                </div>
                <div>
                  <dt>{past ? "Event status" : "Tickets"}</dt>
                  <dd>
                    {past ? "This event has passed." : priceLabel(event.lowestPrice)}
                    {!past && event.lowestPrice > 0 ? " · starting price" : ""}
                  </dd>
                </div>
                {!past && event.attendees && (
                  <div>
                    <dt>Availability</dt>
                    <dd>{event.attendees}</dd>
                  </div>
                )}
              </dl>
              <a
                href={appLink(event.appEventUrl)}
                className="button button-primary"
              >
                {past || event.attendees === "Sold Out"
                  ? "View event on YRDLY"
                  : "Tickets & event details"}{" "}
                ↗
              </a>
              <p style={{ fontSize: 11, marginTop: 12 }}>
                {past ? "See the event page in the app, or find your next plan below." : "Continue in the app for current availability and booking."}
              </p>
              {past && <Link href="/events" className="text-link">Find another event ↗</Link>}
            </div>
          </article>
        )}
      </main>
      <Footer />
    </>
  );
}
