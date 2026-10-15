export interface PublicLocation {
  state?: string | null;
  lga?: string | null;
  ward?: string | null;
}
export interface PublicListing extends PublicLocation {
  id: string;
  title?: string;
  text?: string;
  image_urls?: string[] | string | null;
  price?: number | null;
  category: string;
  sub_category?: string | null;
}
export interface PublicBusiness extends PublicLocation {
  id: string;
  name: string;
  description?: string;
  category?: string;
  logo?: string | null;
  cover_image?: string | null;
  image_urls?: string[] | string | null;
}
export interface PublicEvent extends PublicLocation {
  id: string;
  name: string;
  date: string;
  location: string;
  attendees: string;
  image: string;
  description: string;
  category: string;
  ticketCapacity: number | null;
  lowestPrice: number;
  appEventUrl: string;
  start_time?: string;
  end_time?: string | null;
  time?: string;
}
export function eventIsPast(event: Pick<PublicEvent, "start_time" | "end_time">, now = new Date()) {
  if (event.end_time) return new Date(event.end_time).getTime() < now.getTime();
  if (!event.start_time || Number.isNaN(Date.parse(event.start_time))) return false;
  // Without an end time, keep today's events visible as current all day in Nigeria.
  const localDay = (date: Date) => date.toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
  return localDay(new Date(event.start_time)) < localDay(now);
}
export function locationLabel(item: PublicLocation) {
  return (
    [item.ward || item.lga, item.state].filter(Boolean).join(", ") || "Nigeria"
  );
}
export function firstImage(images: PublicListing["image_urls"]) {
  if (Array.isArray(images)) return images[0] || "";
  if (typeof images === "string") {
    try {
      const parsed: unknown = JSON.parse(images);
      return Array.isArray(parsed) && typeof parsed[0] === "string"
        ? parsed[0]
        : "";
    } catch {
      return "";
    }
  }
  return "";
}
export function priceLabel(price?: number | null) {
  return price === 0
    ? "Free"
    : price == null
      ? "Ask for price"
      : new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 0,
        }).format(price);
}
