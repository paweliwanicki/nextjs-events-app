import Button from '@/components/common/button/button';
import ErrorAlert from '@/components/common/error-alert/error-alert';
import EventList, { EventType } from '@/components/events/event-list';
import ResultsTitle from '@/components/results-title/results-title';
import { getFilteredEvents } from '@/lib/events';
import Head from 'next/head';
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

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events`} />
    </Head>
  );

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${date.year}/${date.month}`}
      />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {pageHeadData}
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
        {pageHeadData}
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
      {pageHeadData}
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
