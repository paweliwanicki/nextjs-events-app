import EventList, { EventType } from '@/components/events/event-list';
import { getFeaturedEvents } from '@/lib/events';

type HomePageProps = {
  featuredEvents: EventType[];
};

export default function HomePage({ featuredEvents }: HomePageProps) {
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 600,
  };
}
