import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const email = vi.hoisted(() => ({
  sendContactEmail: vi.fn(), sendWelcomeEmail: vi.fn(), subscribeNewsletterContact: vi.fn(),
}));
vi.mock("@/lib/resend-email", () => email);
vi.mock("@/lib/supabase-client", () => ({ checkRateLimit: vi.fn().mockResolvedValue(0), recordRateLimit: vi.fn() }));
import { POST as contact } from "../app/api/contact/route";
import { POST as newsletter } from "../app/api/newsletter/route";

const request = (body: unknown) => new NextRequest("https://example.test/api/form", {
  method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" },
});

beforeEach(() => {
  vi.clearAllMocks();
  email.sendContactEmail.mockResolvedValue({ success: true });
  email.sendWelcomeEmail.mockResolvedValue({ success: true });
  email.subscribeNewsletterContact.mockResolvedValue("qa-contact-id");
});

describe("contact delivery feedback", () => {
  it("does not claim a lost message was delivered", async () => {
    email.sendContactEmail.mockResolvedValue({ success: false, error: "Unavailable" });
    const response = await contact(request({ name: "QA Test", email: "qa@example.test", message: "A local test message" }));
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ success: false });
  });
  it("confirms accepted delivery", async () => {
    const response = await contact(request({ name: "QA Test", email: "qa@example.test", message: "A local test message" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
  });
  it("rejects incomplete forms before sending mail", async () => {
    expect((await contact(request({ email: "bad" }))).status).toBe(400);
    expect(email.sendContactEmail).not.toHaveBeenCalled();
  });
});

describe("newsletter subscription feedback", () => {
  it("does not send a welcome message when subscription storage fails", async () => {
    email.subscribeNewsletterContact.mockRejectedValue(new Error("Unavailable"));
    const response = await newsletter(request({ email: "qa@example.test" }));
    expect(response.status).toBe(503);
    expect(email.sendWelcomeEmail).not.toHaveBeenCalled();
  });
  it("returns an accepted response when welcome delivery fails", async () => {
    email.sendWelcomeEmail.mockResolvedValue({ success: false });
    const response = await newsletter(request({ email: "qa@example.test" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
  });
  it("sends welcome mail for an accepted contact", async () => {
    const response = await newsletter(request({ email: "qa@example.test" }));
    expect(response.status).toBe(200);
    expect(email.subscribeNewsletterContact).toHaveBeenCalledOnce();
    expect(email.sendWelcomeEmail).toHaveBeenCalledWith(
      { email: "qa@example.test", source: "newsletter-signup" },
      "qa-contact-id",
    );
  });
  it("gives the same response for an unsubscribed contact without sending email", async () => {
    const accepted = await newsletter(request({ email: "qa@example.test" }));
    email.sendWelcomeEmail.mockClear();
    email.subscribeNewsletterContact.mockResolvedValue(null);
    const optedOut = await newsletter(request({ email: "opted-out@example.test" }));
    expect(optedOut.status).toBe(accepted.status);
    expect(await optedOut.json()).toEqual(await accepted.json());
    expect(email.sendWelcomeEmail).not.toHaveBeenCalled();
  });
});
