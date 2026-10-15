import Link from "next/link";
import { appLink } from "@/lib/app-links";
import {
  firstImage,
  eventIsPast,
  locationLabel,
  priceLabel,
  type PublicListing,
  type PublicBusiness,
  type PublicEvent,
} from "@/lib/public-types";
import { ContentImage } from "./content-image";

export function ListingCard({ item }: { item: PublicListing }) {
  const title = item.title || item.text || "Marketplace find";
  return (
    <a href={appLink(`/marketplace/${item.id}`)} className="listing-card">
      <div className="listing-image">
        <ContentImage src={firstImage(item.image_urls)} alt={title} />
        <span className="image-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="listing-copy">
        <p className="card-overline">{item.sub_category || item.category}</p>
        <h3>{title}</h3>
        <p className="card-location">{locationLabel(item)}</p>
        <p className="listing-price">{priceLabel(item.price)}</p>
      </div>
    </a>
  );
}
export function BusinessCard({ item }: { item: PublicBusiness }) {
  return (
    <a href={appLink(`/businesses/${item.id}`)} className="business-card">
      <div className="business-image">
        <ContentImage
          src={item.cover_image || firstImage(item.image_urls) || item.logo}
          alt={item.name}
        />
      </div>
      <div>
        <p className="card-overline">{item.category || "Local business"}</p>
        <h3>{item.name}</h3>
        <p className="card-location">{locationLabel(item)}</p>
        {item.description && (
          <p className="business-description">{item.description}</p>
        )}
      </div>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
export function EventCard({ item }: { item: PublicEvent }) {
  const past = eventIsPast(item);
  return (
    <Link href={`/events/${item.id}`} className="event-card">
      <div className="event-image">
        <ContentImage src={item.image} alt={item.name} />
      </div>
      <div className="event-copy">
        <p className="event-date">
          {item.date}
          <span>{past ? "Past event" : priceLabel(item.lowestPrice)}</span>
        </p>
        <h3>{item.name}</h3>
        <p className="card-location">{item.location || locationLabel(item)}</p>
        <p className="card-overline">
          {item.category || "Community"} <span aria-hidden="true">↗</span>
        </p>
      </div>
    </Link>
  );
}
