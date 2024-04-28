import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/dummy-data';

export default function HomePage() {
  const featuredEvent = getFeaturedEvents();

  return (
    <div>
      <EventList events={featuredEvent} />
    </div>
  );
}
