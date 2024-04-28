import Button from '@/components/common/button/button';
import ErrorAlert from '@/components/common/error-alert/error-alert';
import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/results-title/results-title';
import { getFilteredEvents } from '@/dummy-data';
import { useRouter } from 'next/router';

export default function FilteredEventsPage() {
  const router = useRouter();

  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = filteredData as string[];
  const [numYear, numMonth] = [+year, +month];

  if (isNaN(numYear) || isNaN(+numMonth)) {
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

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

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

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
}
