# November Businessplace campaign

Implemented locally, 31 October 2026. Shared approved rules, backend contract, migration and rollout requirements: [product handoff](../../../yrdly-app/output/qa/small-business-campaign-working.md).

- Public `/campaigns/small-businesses` with home/header/business-directory entry points, real-text yellow/green presentation, product-only rules, enrollment/create-business links, sharing and leaderboard.
- Same-origin proxy validates an allowlist of public backend fields; no scores are calculated in the marketing application.
- Website build, TypeScript and full lint pass. Lint has zero errors and 27 warnings at the initial run; new campaign warnings were then fixed. Initial sandbox font-fetch failure resolved with approved network access.
- Browser checks at 390px and 1440px show no horizontal overflow. Network-intercepted QA standings and stale-refresh handling checked; sample scores are not live data.
- Screenshots: `small-business-campaign-390.png`, `small-business-campaign-1440.png`.
- No deployment. Requires the separately approved backend migration/deployment first. Full authenticated enrollment/provider and native device checks remain in the canonical handoff.
