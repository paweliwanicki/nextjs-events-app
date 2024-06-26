import { useRef } from 'react';
import Button from '../common/button/button';
import classes from './events-search.module.css';

type EventsSearchProps = {
  onSubmit: (year: string, month: string) => void;
};

export default function EventsSearch({ onSubmit }: EventsSearchProps) {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selectedYear = yearInputRef?.current?.value ?? '';
    const selectedMonth = monthInputRef?.current?.value ?? '';
    onSubmit(selectedYear, selectedMonth);
  }

  return (
    <form className={classes.form} onSubmit={submitSearch}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}
