import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import type { PublicListing, PublicBusiness } from "./public-types";

export function getPublicDiscoveryClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_APP_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://yoiyqxtpmxnrrbqqidcs.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_APP_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaXlxeHRwbXhucnJicXFpZGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMDY5OTksImV4cCI6MjA3NTY4Mjk5OX0.xL4t7V9BiaOxtdGrYqJMBXKLtP6JTwdU2akNwPP8t-w";
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

// Anonymous reads only: the existing database policies remain the access boundary.
async function getPublicDiscoveryUncached() {
  const client = getPublicDiscoveryClient();
  if (!client)
    return {
      listings: [] as PublicListing[],
      businesses: [] as PublicBusiness[],
      unavailable: { marketplace: true, businesses: true },
    };
  const [listings, businesses] = await Promise.all([
    client
      .from("posts")
      .select(
        "id,title,text,image_urls,price,category,sub_category,state,lga,ward",
      )
      .in("category", ["For Sale", "Giveaway"])
      .eq("is_sold", false)
      .order("created_at", { ascending: false })
      .limit(36)
      .abortSignal(AbortSignal.timeout(8000)),
    client
      .from("businesses")
      .select(
        "id,name,description,category,logo,cover_image,image_urls,state,lga,ward",
      )
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(24)
      .abortSignal(AbortSignal.timeout(8000)),
  ]);
  return {
    listings: (listings.data || []) as PublicListing[],
    businesses: (businesses.data || []) as PublicBusiness[],
    unavailable: { marketplace: Boolean(listings.error), businesses: Boolean(businesses.error) },
  };
}


// Public homepage discovery is non-personalized and can tolerate a short cache.
// This prevents every anonymous homepage request from issuing duplicate DB reads.
export const getPublicDiscovery = unstable_cache(
  getPublicDiscoveryUncached,
  ["yrdly-public-discovery-v1"],
  { revalidate: 60, tags: ["public-discovery"] },
);
