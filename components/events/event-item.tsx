import Image from 'next/image';
import { EventType } from './event-list';
import classes from './event-item.module.css';
import Button from '../common/button/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

type EventItemProps = {
  event: EventType;
};

export default function EventItem({ event }: EventItemProps) {
  const { id, title, date, location, image } = event;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');
  return (
    <li className={classes.item}>
      <Image
        src={`/${image}`}
        alt={title}
        width={160}
        height={160}
        fetchPriority="high"
      />
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.summary}>
            <h2>{title}</h2>
          </div>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button href={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
