"use client";
import { useId, useState } from "react";
import { useNewsletter } from "@/hooks/use-newsletter";
export function NewsletterSignup({
  placeholder = "Your email address",
  buttonText = "Subscribe",
  className = "",
  source = "newsletter-signup",
}: {
  placeholder?: string;
  buttonText?: string;
  className?: string;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const { isLoading, isSuccess, error, message, subscribe, reset } =
    useNewsletter();
  const id = useId();
  return (
    <form
      className={className}
      onSubmit={async (event) => {
        event.preventDefault();
        if (!isLoading) await subscribe(email.trim(), source);
      }}
    >
      <label htmlFor={id} className="sr-only">
        Email address for the newsletter
      </label>
      <div className="newsletter-form-row">
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          required
          disabled={isLoading}
          onChange={(event) => {
            setEmail(event.target.value);
            if (isSuccess || error) reset();
          }}
        />
        <button disabled={isLoading || !email.trim()}>
          {isLoading ? "Joining…" : buttonText}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p role="status" className="newsletter-message">
        {error || (isSuccess ? message : "")}
      </p>
    </form>
  );
}
