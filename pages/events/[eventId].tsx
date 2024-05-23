import ErrorAlert from '@/components/common/error-alert/error-alert';
import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import { EventType } from '@/components/events/event-list';
import { getEventById, getFeaturedEvents } from '@/lib/events';

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
