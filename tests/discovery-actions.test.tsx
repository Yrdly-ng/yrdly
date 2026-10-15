// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { DiscoveryBrowser } from "../components/discovery/discovery-browser";
import Header from "../components/header";
import { PwaInstallSection } from "../components/PwaInstallSection";
import { CookieConsent } from "../components/cookie-consent";

const refresh = vi.hoisted(() => vi.fn());
const setTheme = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh }), usePathname: () => "/" }));
vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light", setTheme }) }));
let host: HTMLDivElement;
let root: Root;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  refresh.mockClear();
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.unstubAllGlobals(); });
const button = (name: string) => [...host.querySelectorAll("button")].find(el => el.textContent?.includes(name))!;

it("lets a failed business preview retry the server read", async () => {
  await act(async () => root.render(<DiscoveryBrowser fixedKind initialKind="businesses" unavailable={{ businesses: true }} />));
  expect(host.textContent).toContain("trouble loading");
  await act(async () => button("Try again").click());
  expect(refresh).toHaveBeenCalledOnce();
  expect(host.querySelector('a[href="https://app.yrdly.ng/businesses"]')).not.toBeNull();
});

it("keeps a business failure separate from an empty marketplace", async () => {
  await act(async () => root.render(<DiscoveryBrowser fixedKind unavailable={{ businesses: true }} />));
  expect(host.textContent).not.toContain("trouble loading");
  expect(host.querySelector('a[href="/events"]')).not.toBeNull();
});

it("recovers a failed event request when Try again is pressed", async () => {
  const fetcher = vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true, json: async () => [] });
  vi.stubGlobal("fetch", fetcher);
  await act(async () => root.render(<DiscoveryBrowser fixedKind initialKind="events" />));
  expect(host.textContent).toContain("trouble loading");
  await act(async () => button("Try again").click());
  expect(fetcher).toHaveBeenCalledTimes(2);
  expect(host.textContent).not.toContain("trouble loading");
  expect(host.querySelector('a[href="/marketplace"]')).not.toBeNull();
});

it("clears location filters to recover the available listing", async () => {
  await act(async () => root.render(<DiscoveryBrowser fixedKind listings={[{ id: "test", title: "Local find", state: "Enugu", category: "For Sale" }]} businesses={[{ id: "biz", name: "Local business", state: "Oyo" }]} />));
  const state = host.querySelector<HTMLSelectElement>("#browse-state")!;
  await act(async () => { state.value = "Oyo"; state.dispatchEvent(new Event("change", { bubbles: true })); });
  expect(host.textContent).toContain("Nothing matches");
  await act(async () => button("Clear filters").click());
  expect(host.querySelector(".listing-card")?.textContent).toContain("Local find");
});

it("opens and closes navigation with keyboard recovery and toggles the theme", async () => {
  await act(async () => root.render(<Header />));
  const menu = host.querySelector<HTMLButtonElement>('[aria-label="Open menu"]')!;
  await act(async () => menu.click());
  expect(host.querySelector("#mobile-menu")).not.toBeNull();
  await act(async () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
  expect(host.querySelector("#mobile-menu")).toBeNull();
  expect(document.activeElement).toBe(menu);
  await act(async () => host.querySelector<HTMLButtonElement>('[aria-label="Toggle colour theme"]')!.click());
  expect(setTheme).toHaveBeenCalledWith("dark");
});

it("provides the corresponding installation steps for every device button", async () => {
  await act(async () => root.render(<PwaInstallSection />));
  expect(host.querySelector(".install-steps")?.textContent).toContain("Chrome");
  await act(async () => button("iPhone / iPad").click());
  expect(host.querySelector(".install-steps")?.textContent).toContain("Safari");
  await act(async () => button("Desktop").click());
  expect(host.querySelector(".install-steps")?.textContent).toContain("Edge");
});

it("dismisses the cookie notice when accepted", async () => {
  document.cookie = "yrdly_cookie_consent=; max-age=0; path=/";
  await act(async () => root.render(<CookieConsent />));
  expect(host.querySelector(".cookie-notice")).not.toBeNull();
  await act(async () => button("Accept").click());
  expect(host.querySelector(".cookie-notice")).toBeNull();
  expect(document.cookie).toContain("yrdly_cookie_consent=true");
});
