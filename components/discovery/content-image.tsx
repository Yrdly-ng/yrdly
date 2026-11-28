"use client";
import { useState } from "react";
import Image from "next/image";

export function ContentImage({
  src,
  alt,
  className = "",
  eager = false,
  sizes = "(max-width: 600px) 44vw, (max-width: 900px) 28vw, 22vw",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [optimizerFailed, setOptimizerFailed] = useState(false);
  const optimizable =
    src?.startsWith("/") ||
    /^https:\/\/(api\.yrdly\.ng|[a-z0-9-]+\.supabase\.co|images\.unsplash\.com)\//.test(
      src || "",
    );
  return src && !failed ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={eager}
      unoptimized={!optimizable || optimizerFailed}
      onError={() => {
        if (optimizable && !optimizerFailed) setOptimizerFailed(true);
        else setFailed(true);
      }}
    />
  ) : (
    <div
      className={`image-placeholder ${className}`}
      role="img"
      aria-label={`No photo available for ${alt}`}
    >
      <span aria-hidden="true">y.</span>
      <small>Photo to come</small>
    </div>
  );
}
