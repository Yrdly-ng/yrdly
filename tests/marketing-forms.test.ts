import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const email = vi.hoisted(() => ({
  sendContactEmail: vi.fn(), sendWelcomeEmail: vi.fn(), addAttendeeContact: vi.fn(),
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
  email.addAttendeeContact.mockResolvedValue({ success: true });
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
    email.addAttendeeContact.mockResolvedValue({ success: false, error: "Unavailable" });
    const response = await newsletter(request({ email: "qa@example.test" }));
    expect(response.status).toBe(503);
    expect(email.sendWelcomeEmail).not.toHaveBeenCalled();
  });
  it("distinguishes a saved subscription from delayed email", async () => {
    email.sendWelcomeEmail.mockResolvedValue({ success: false });
    const response = await newsletter(request({ email: "qa@example.test" }));
    expect(response.status).toBe(200);
    expect((await response.json()).message).toContain("subscription is saved");
  });
  it("confirms both subscription and welcome email when successful", async () => {
    const response = await newsletter(request({ email: "qa@example.test" }));
    expect((await response.json()).message).toContain("welcome email");
    expect(email.addAttendeeContact).toHaveBeenCalledOnce();
    expect(email.sendWelcomeEmail).toHaveBeenCalledOnce();
  });
});
