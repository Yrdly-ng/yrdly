"use client";
import { useState } from "react";
import Image from "next/image";

export function ContentImage({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
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
      sizes="(max-width: 600px) 90vw, (max-width: 900px) 50vw, 650px"
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
