import ErrorAlert from '@/components/common/error-alert/error-alert';
import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import { EventType } from '@/components/events/event-list';
import { getEventById, getFeaturedEvents } from '@/lib/events';
import Head from 'next/head';

type EventDetailPageProps = {
  event: EventType;
};

export default function EventDetailPage({ event }: EventDetailPageProps) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  const { title, date, location, image, description } = event;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticPaths() {
  const eventsIds = await getFeaturedEvents();
  const paths = eventsIds.map(({ id }) => ({
    params: { eventId: id.toString() },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({
  params,
}: {
  params: { eventId: string };
}) {
  let event;
  const { eventId } = params;
  if (eventId && !Array.isArray(eventId)) {
    event = await getEventById(parseInt(eventId));
  }
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}
