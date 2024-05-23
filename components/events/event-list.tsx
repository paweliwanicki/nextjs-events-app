import EventItem from './event-item';
import classes from './event-list.module.css';

export type EventType = {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
};

type EventListProps = {
  events: EventType[];
};

export default function EventList({ events }: EventListProps) {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={`event-item-${event.id}`} event={event} />
      ))}
    </ul>
  );
}
