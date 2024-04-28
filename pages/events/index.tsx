import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/dummy-data';
import { useRouter } from 'next/router';

export default function EventsHomePage() {
  const allEvents = getAllEvents();
  const router = useRouter();

  function filterEventsListHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventsSearch onSubmit={filterEventsListHandler} />
      <EventList events={allEvents} />
    </>
  );
}
