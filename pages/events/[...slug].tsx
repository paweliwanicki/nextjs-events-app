import Button from '@/components/common/button/button';
import ErrorAlert from '@/components/common/error-alert/error-alert';
import EventList, { EventType } from '@/components/events/event-list';
import ResultsTitle from '@/components/results-title/results-title';
import { getFilteredEvents } from '@/lib/events';
import { useRouter } from 'next/router';

type FilteredEventsPageProps = {
  filteredEvents: EventType[];
  date: {
    year: number;
    month: number;
  };
  hasError: boolean;
};

export default function FilteredEventsPage({
  filteredEvents,
  date,
  hasError,
}: FilteredEventsPageProps) {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filters data!</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || !filteredEvents.length) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={new Date(date.year, date.month - 1)} />
      <EventList events={filteredEvents} />
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { slug: string[] };
}) {
  const filterData = params.slug;
  const [year, month] = filterData as string[];
  const [numYear, numMonth] = [+year, +month];

  if (isNaN(numYear) || isNaN(numMonth)) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year,
    month,
  });

  return {
    props: {
      filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
