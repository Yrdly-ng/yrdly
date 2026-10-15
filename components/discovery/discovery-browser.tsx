"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { appLink } from "@/lib/app-links";
import type {
  PublicListing,
  PublicBusiness,
  PublicEvent,
} from "@/lib/public-types";
import { ListingCard, BusinessCard, EventCard } from "./cards";

type Kind = "marketplace" | "events" | "businesses";
const labels: Record<Kind, string> = {
  marketplace: "Marketplace",
  events: "Events",
  businesses: "Businesses",
};
export function DiscoveryBrowser({
  listings = [],
  businesses = [],
  initialKind = "marketplace",
  compact = false,
  fixedKind = false,
  unavailable = {},
}: {
  listings?: PublicListing[];
  businesses?: PublicBusiness[];
  initialKind?: Kind;
  compact?: boolean;
  fixedKind?: boolean;
  unavailable?: Partial<Record<Kind, boolean>>;
}) {
  const router = useRouter();
  const [refreshing, startRefresh] = useTransition();
  const [kind, setKind] = useState<Kind>(initialKind);
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventError, setEventError] = useState(false);
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (fixedKind && initialKind !== "events") {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setEventError(false);
    fetch("/api/events", { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]) })
      .then((res) => {
        if (!res.ok) throw new Error("Events unavailable");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid events");
        setEvents(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setEventError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt, fixedKind, initialKind]);
  const all = useMemo(
    () => [...listings, ...businesses, ...events],
    [listings, businesses, events],
  );
  const states = [
    ...new Set(
      all.map((item) => item.state).filter((s): s is string => Boolean(s)),
    ),
  ].sort();
  const areas = [
    ...new Set(
      all
        .filter((item) => item.state === state)
        .map((item) => item.lga)
        .filter((s): s is string => Boolean(s)),
    ),
  ].sort();
  const items =
    kind === "marketplace"
      ? listings
      : kind === "businesses"
        ? businesses
        : events;
  const categories = [
    ...new Set(
      items
        .map((item) =>
          "sub_category" in item
            ? item.sub_category || item.category
            : item.category,
        )
        .filter((s): s is string => Boolean(s)),
    ),
  ].sort();
  const filtered = items.filter((item) => {
    const title =
      "name" in item ? item.name : `${item.title || ""} ${item.text || ""}`;
    const itemCategory =
      "sub_category" in item
        ? item.sub_category || item.category
        : item.category;
    return (
      (!state || item.state === state) &&
      (!area || item.lga === area) &&
      (!category || category === itemCategory) &&
      `${title} ${item.state || ""} ${item.lga || ""} ${item.ward || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });
  const shown = compact ? filtered.slice(0, 4) : filtered;
  const hasError = kind === "events" ? eventError : Boolean(unavailable[kind]);
  const hasFilters = Boolean(state || area || search || category);
  const reset = () => {
    setState("");
    setArea("");
    setSearch("");
    setCategory("");
  };
  return (
    <div className="discovery-browser">
      <div className="discovery-toolbar">
        {!fixedKind && (
          <div
            className="discovery-tabs"
            role="group"
            aria-label="What would you like to discover?"
          >
            {(Object.keys(labels) as Kind[]).map((key) => (
              <button
                key={key}
                aria-pressed={kind === key}
                onClick={() => {
                  setKind(key);
                  setCategory("");
                }}
              >
                {labels[key]}
              </button>
            ))}
          </div>
        )}
        <div className="location-controls">
          <span className="country-label">Nigeria</span>
          <label className="sr-only" htmlFor="browse-state">
            State or FCT
          </label>
          <select
            id="browse-state"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setArea("");
            }}
          >
            <option value="">All locations</option>
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {state && (
            <>
              <label className="sr-only" htmlFor="browse-area">
                Local government area
              </label>
              <select
                id="browse-area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">All local areas</option>
                {areas.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
      {!compact && (
        <div className="discovery-search">
          <label>
            <span className="sr-only">Search {labels[kind].toLowerCase()}</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${labels[kind].toLowerCase()} or places…`}
            />
          </label>
          <label>
            <span className="sr-only">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div aria-live="polite" aria-atomic="true" className="results-caption">
        {kind === "events" && loading
          ? "Finding public events…"
          : hasError ? "Public previews are temporarily unavailable."
          : `${filtered.length} public ${kind === "marketplace" ? "listing" : kind === "businesses" ? "business" : "event"}${filtered.length === 1 ? "" : kind === "businesses" ? "es" : "s"}${state ? ` in ${area || state}` : " · a look around YRDLY"}`}
      </div>
      {kind === "events" && loading ? (
        <div className="preview-skeleton" aria-label="Loading events">
          <div />
          <div />
          <div />
        </div>
      ) : shown.length ? (
        <div className={`${kind}-grid`}>
          {shown.map((item) =>
            kind === "marketplace" ? (
              <ListingCard key={item.id} item={item as PublicListing} />
            ) : kind === "businesses" ? (
              <BusinessCard key={item.id} item={item as PublicBusiness} />
            ) : (
              <EventCard key={item.id} item={item as PublicEvent} />
            ),
          )}
        </div>
      ) : (
        <div className="discovery-empty">
          <span className="editorial-mark" aria-hidden="true">
            y.
          </span>
          <div>
            <h3>
              {hasError
                ? "A little trouble loading this corner."
                : hasFilters ? "Nothing matches this search yet." : "Something good could start here."}
            </h3>
            <p>
              {hasError
                ? "Try again in a moment, or keep exploring in the app."
                : hasFilters ? "Try a different area, change your search or clear the filters to see what’s available."
                : "No public previews here just yet. Explore another part of YRDLY or start something in your neighbourhood."}
            </p>
            <div className="inline-actions">
              {hasFilters && (
                <button className="text-link" onClick={reset}>
                  Clear filters ↗
                </button>
              )}
              {hasError && (
                <button
                  className="text-link"
                  disabled={refreshing}
                  onClick={() => kind === "events" ? setAttempt((a) => a + 1) : startRefresh(() => router.refresh())}
                >
                  {refreshing ? "Refreshing…" : "Try again ↻"}
                </button>
              )}
              {!hasFilters && !hasError && (
                <Link href={kind === "marketplace" ? "/events" : "/marketplace"} className="text-link">
                  {kind === "marketplace" ? "Discover events" : "Browse marketplace finds"} ↗
                </Link>
              )}
              <a href={appLink(`/${kind}`)} className="text-link">
                Explore in the app ↗
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="discovery-bottom">
        <p>Public previews. No account needed to look around.</p>
        {compact ? (
          <Link className="text-link" href={`/${kind}`}>
            More {labels[kind].toLowerCase()} <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <a className="text-link" href={appLink(`/${kind}`)}>
            Keep exploring on YRDLY ↗
          </a>
        )}
      </div>
    </div>
  );
}
