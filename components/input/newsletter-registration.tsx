import { FormEvent, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import { HttpMethod } from "@/enums/HttpMethod";

export default function NewsletterRegistration() {
  const inputRef = useRef<HTMLInputElement>(null);

  function registrationHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/api/newsletter", {
      method: HttpMethod.POST,
      body: JSON.stringify({
        email: inputRef.current?.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
