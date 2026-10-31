import { z } from 'zod';

// Strip every field outside the approved public projection at the marketing proxy.
export const publicCampaignSchema = z.object({
  campaign: z.object({
    id: z.string().uuid(), slug: z.literal('small-businesses'), title: z.string(),
    status: z.enum(['upcoming', 'active', 'review', 'finalized']),
    startsAt: z.string().datetime({ offset: true }), endsAt: z.string().datetime({ offset: true }),
    reviewEndsAt: z.string().datetime({ offset: true }), timezone: z.literal('Africa/Lagos'),
    prizePoolNaira: z.literal(500000), rulesVersion: z.string(), integrityReviewRequired: z.boolean(),
  }),
  snapshot: z.object({
    id: z.string(), updatedAt: z.string().datetime({ offset: true }), provisional: z.boolean(),
    participantCount: z.number().int().nonnegative(),
    entries: z.array(z.object({
      rank: z.number().int().positive(), businessId: z.string().uuid(), name: z.string(), logoUrl: z.string().url().nullable(),
      profilePath: z.string(), completedSales: z.number().int().nonnegative(),
    })).max(50),
    prizeAllocations: z.array(z.object({ businessId: z.string().uuid(), amountKobo: z.number().int().positive().max(50000000) })),
  }),
});
