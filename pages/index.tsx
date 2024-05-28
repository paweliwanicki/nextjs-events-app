import EventList, { EventType } from '@/components/events/event-list';
import NewsletterRegistration from '@/components/input/newsletter-registration';
import { getFeaturedEvents } from '@/lib/events';
import Head from 'next/head';

type HomePageProps = {
  featuredEvents: EventType[];
};

export default function HomePage({ featuredEvents }: HomePageProps) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
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
