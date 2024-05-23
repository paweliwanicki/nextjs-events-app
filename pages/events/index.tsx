import EventList, { EventType } from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../lib/events';

type EventsHomePageProps = {
  events: EventType[];
};

export default function EventsHomePage({ events }: EventsHomePageProps) {
  const router = useRouter();

  function filterEventsListHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSubmit={filterEventsListHandler} />
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 600,
  };
}
