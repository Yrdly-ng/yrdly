/**
 * YRDLY product update entries.
 *
 * Add new entries at the top of the `PRODUCT_UPDATES` array.
 * Each entry is independently rendered on /whats-new.
 *
 * Verification policy:
 *   - Only include features confirmed present in the production codebase.
 *   - Do not invent release dates or statistics.
 *   - Flag unverified features in a comment; exclude them from the array.
 */

export type UpdateCategory = "New" | "Improved" | "Fixed" | "Faster";

export interface ProductUpdate {
  id: string;
  /** Short, user-facing headline. Title case. */
  headline: string;
  /** One or two sentences. Friendly, community-first voice. */
  description: string;
  category: UpdateCategory;
  /**
   * ISO 8601 date string if the release date is confirmed.
   * Omit the field rather than guessing.
   */
  date?: string;
  /** Lucide icon name (https://lucide.dev/icons) or a custom SVG path. */
  icon: string;
  /** Optional deep-link into the product. */
  href?: string;
}

/**
 * Unverified / pending editorial review:
 *   - Event analytics dashboard (no dedicated analytics route found in yrdly-app)
 */
export const PRODUCT_UPDATES: ProductUpdate[] = [
  {
    id: "marketplace-checkout-fix",
    headline: "Fewer bumps at checkout",
    description:
      "We resolved account issues that were holding up some marketplace purchases. Buying from a neighbour should now be smooth from first message to handover.",
    category: "Fixed",
    icon: "ShoppingBag",
    href: "https://app.yrdly.ng/marketplace",
  },
  {
    id: "faster-withdrawals",
    headline: "Faster access to your earnings",
    description:
      "Sellers asked for quicker payouts. Withdrawals are now processed faster so you can get back to what matters.",
    category: "Faster",
    icon: "Zap",
    href: "https://app.yrdly.ng/settings/withdraw",
  },
  {
    id: "multiple-event-management",
    headline: "Manage all your events in one place",
    description:
      "Create and manage multiple events without switching context. Everything you need to run a gathering — from ticket settings to your team — lives in one clear dashboard.",
    category: "Improved",
    icon: "CalendarDays",
    href: "https://app.yrdly.ng/events",
  },
  {
    id: "improved-media-viewer",
    headline: "See the whole picture",
    description:
      "Photos and videos your neighbours share now open in a fuller, more immersive view. Swipe through a post's gallery without losing your place.",
    category: "Improved",
    icon: "ImagePlay",
    href: "https://app.yrdly.ng",
  },
  {
    id: "video-trimming",
    headline: "Make every video your own",
    description:
      "Trim the length, adjust the frame, and share the moment exactly how you want it. Video editing tools are now available when you create a post.",
    category: "New",
    icon: "Scissors",
    href: "https://app.yrdly.ng",
  },
];

export interface LaunchStat {
  value: string;
  label: string;
}

/** Confirmed launch-week statistics. Do not replace with estimates. */
export const LAUNCH_STATS: LaunchStat[] = [
  { value: "200+", label: "neighbours joined on launch day" },
  { value: "50+", label: "successful marketplace transactions in launch week" },
];
