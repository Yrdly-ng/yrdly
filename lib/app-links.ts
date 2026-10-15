// Keep all product journeys on the existing web app.
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.yrdly.ng";
export const appLink = (path = "") => `${APP_URL.replace(/\/$/, "")}${path}`;
