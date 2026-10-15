// Local-only visual and interaction QA. Public reads are real; form submissions
// and event fixtures are intercepted so this runner never writes to production.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = "1";
const { chromium } = require(
  require.resolve("@playwright/test", {
    paths: [process.cwd(), "../yrdly-app"],
  }),
);
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.QA_BASE_URL || "http://localhost:3100";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname))
  throw new Error("Local preview only");
const output = process.env.QA_OUTPUT || "/private/tmp/yrdly-astra-qa/final";
const sizes = [
  [390, 844],
  [430, 932],
  [768, 1024],
  [1440, 1000],
  [1728, 1117],
];
const routes = [
  "/",
  "/marketplace",
  "/businesses",
  "/events",
  "/login",
  "/signup",
  "/about",
  "/learn-more",
  "/blog",
  "/faq",
  "/contact",
  "/trust-and-safety",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
];
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.QA_CHROME_EXECUTABLE ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const errors = [];
  const report = [];
  try {
    const context = await browser.newContext();
    await context.route(
      /googlesyndication|google-analytics|googletagmanager/,
      (r) => r.abort(),
    );
    await context.addCookies([
      { name: "yrdly_cookie_consent", value: "true", url: base },
    ]);
    const page = await context.newPage();
    page.setDefaultNavigationTimeout(120000);
    page.setDefaultTimeout(15000);
    page.on("pageerror", (e) => errors.push(e.message));
    const settle = async () => {
      await page.locator("img").evaluateAll((images) =>
        images.forEach((image) => {
          image.loading = "eager";
        }),
      );
      await page
        .waitForFunction(
          () => [...document.images].every((image) => image.complete),
          null,
          { timeout: 20000 },
        )
        .catch(() => {});
      if (await page.locator(".results-caption").count())
        await page.waitForFunction(
          () =>
            !document
              .querySelector(".results-caption")
              ?.textContent.includes("Finding public events"),
          null,
          { timeout: 20000 },
        );
    };
    const capture = async (name, width) => {
      await settle();
      const measurements = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        width: innerWidth,
        broken: [...document.images]
          .filter((i) => i.complete && !i.naturalWidth)
          .map((i) => i.getAttribute("src")),
        images: [...document.querySelectorAll(".listing-image img")].map(
          (i) => ({
            image: i.getBoundingClientRect().height,
            container: i.parentElement.getBoundingClientRect().height,
          }),
        ),
      }));
      assert.equal(
        measurements.overflow,
        false,
        `${name} overflows at ${width}`,
      );
      assert.equal(measurements.broken.length, 0, `${name} has broken images`);
      await page.screenshot({
        path: `${output}/${name}-${width}.png`,
        fullPage: true,
        timeout: 20000,
      });
      report.push({ name, width, ...measurements });
      console.log(`PASS ${name} ${width}px`);
    };
    if (process.argv.includes("--measure")) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(base);
      await settle();
      console.log(
        await page
          .locator(".listing-image img")
          .evaluateAll((images) =>
            images.map((i) => ({
              src: i.src,
              natural: [i.naturalWidth, i.naturalHeight],
              rect: i.getBoundingClientRect().toJSON(),
              parent: i.parentElement.getBoundingClientRect().toJSON(),
              css: getComputedStyle(i).height,
              position: getComputedStyle(i).position,
            })),
          ),
      );
      await page.screenshot({
        path: `${output}/hero-desktop.png`,
        timeout: 20000,
      });
      return;
    }
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: "domcontentloaded" });
        await capture(route.slice(1) || "home", width);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base);
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).waitFor();
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .getByRole("button", { name: "Open menu" })
        .getAttribute("aria-expanded"),
      "false",
    );
    await page
      .getByRole("button", { name: "iPhone / iPad", exact: true })
      .click();
    assert.match(await page.locator(".install-steps").innerText(), /Safari/);
    await page.goto(base + "/signup");
    await page
      .getByRole("textbox", { name: "Full name", exact: true })
      .waitFor();
    await page.getByRole("button", { name: "Show password" }).click();
    assert.equal(
      await page.getByLabel("Password", { exact: true }).getAttribute("type"),
      "text",
    );
    await page.goto(base + "/marketplace");
    await page.getByRole("searchbox").fill("no-matching-item-test");
    await page
      .getByRole("heading", { name: "Nothing matches this search yet." })
      .waitFor();
    await page.getByRole("button", { name: "Clear filters" }).click();
    const states = await page
      .locator("#browse-state option")
      .evaluateAll((options) => options.map((o) => o.value).filter(Boolean));
    if (states.length) {
      await page.locator("#browse-state").selectOption(states[0]);
      const locations = await page
        .locator(".listing-card .card-location")
        .allTextContents();
      assert(locations.every((location) => location.includes(states[0])));
    }
    await page.goto(base + "/faq");
    await page
      .getByText("Do I need an account to look around?", { exact: true })
      .click();
    assert.equal(
      await page
        .locator("details")
        .filter({ hasText: "Do I need an account to look around?" })
        .getAttribute("open"),
      "",
    );
    await page.route("**/api/contact", (r) =>
      r.fulfill({ json: { success: true } }),
    );
    await page.goto(base + "/contact");
    await page.getByLabel("First Name", { exact: true }).fill("Design");
    await page.getByLabel("Last Name", { exact: true }).fill("QA");
    await page.getByLabel("Email", { exact: true }).fill("qa@example.test");
    await page
      .getByLabel("Message", { exact: true })
      .fill("Local-only intercepted form check.");
    await page
      .getByRole("button", { name: "Send Message", exact: true })
      .click();
    await page.getByText("Message received!", { exact: true }).waitFor();
    await page.route("**/api/newsletter", (r) =>
      r.fulfill({ json: { success: true, message: "You’re on the list." } }),
    );
    await page.goto(base);
    await page
      .getByRole("textbox", { name: "Email address for the newsletter" })
      .fill("qa@example.test");
    await page.getByRole("button", { name: /Subscribe/ }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "You’re on the list." })
      .waitFor();
    const event = {
      id: "qa-event",
      name: "An afternoon with your neighbourhood",
      date: "24 Oct 2026",
      time: "2:00 pm",
      start_time: "2026-10-24T13:00:00Z",
      location: "Independence Layout, Enugu North, Enugu",
      state: "Enugu",
      lga: "Enugu North",
      attendees: "12 tickets left",
      image: "/editorial/gathering.webp",
      description:
        "Local QA fixture only. Never displayed outside this browser test.",
      category: "Community",
      ticketCapacity: 30,
      lowestPrice: 1500,
      appEventUrl: "/events/qa-event",
    };
    await page.route("**/api/events*", (r) => r.fulfill({ json: [event] }));
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      await page.goto(base + "/events");
      await page
        .getByRole("heading", { name: event.name, exact: true })
        .waitFor();
      await page.locator("#browse-state").selectOption("Enugu");
      await page.locator("#browse-area").selectOption("Enugu North");
      await capture("events-populated-fixture", width);
      await page.getByRole("link", { name: new RegExp(event.name) }).click();
      await page
        .getByRole("heading", { name: event.name, exact: true })
        .waitFor();
      assert.equal(
        await page
          .getByRole("link", { name: "Tickets & event details ↗" })
          .getAttribute("href"),
        "https://app.yrdly.ng/events/qa-event",
      );
      await capture("event-detail-fixture", width);
    }
    await page.route("**/api/events*", (r) =>
      r.fulfill({ status: 503, json: [] }),
    );
    await page.goto(base + "/events");
    await page
      .getByRole("heading", { name: "A little trouble loading this corner." })
      .waitFor();
    await page.getByRole("button", { name: "Try again" }).waitFor();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base);
    await page.getByRole("button", { name: "Toggle colour theme" }).click();
    await capture("home-dark", 1440);
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
      "auto",
    );
    assert.deepEqual(errors, [], "Browser errors");
    console.log(
      "PASS filters, navigation, install instructions, auth presentation, forms, event states, dark mode, reduced motion",
    );
  } finally {
    fs.writeFileSync(
      `${output}/report.json`,
      JSON.stringify({ report, errors }, null, 2),
    );
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
