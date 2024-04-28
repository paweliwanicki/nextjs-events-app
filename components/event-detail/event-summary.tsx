import classes from './event-summary.module.css';

type EventSummaryprops = {
  title: string;
};

export default function EventSummary({ title }: EventSummaryprops) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}
