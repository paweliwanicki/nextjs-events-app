import { FormEvent, useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import { HttpMethod } from '@/enums/HttpMethod';
import { NotificationContext } from '@/store/notification-context';
import { NotificationStatus } from '../common/notification/notification';

export default function NewsletterRegistration() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { showNotification, hideNotification } =
    useContext(NotificationContext);

  function registrationHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    showNotification({
      title: 'Joining up...',
      message: 'Joining to the newsletter...',
      status: NotificationStatus.PENDING,
    });

    fetch('/api/newsletter', {
      method: HttpMethod.POST,
      body: JSON.stringify({
        email: inputRef.current?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(() => {
        showNotification({
          title: 'Success!',
          message: 'Successfuly joined to the newsletter!',
          status: NotificationStatus.SUCCESS,
        });
      })
      .catch((error) => {
        console.error(error);
        showNotification({
          title: 'Error!',
          message: 'Error joining to the newsletter!',
          status: NotificationStatus.ERROR,
        });
      });
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
