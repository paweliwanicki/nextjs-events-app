import Button from '../common/button/button';
import classes from './results-title.module.css';

type ResultsTitleProps = {
  date: Date;
};

function ResultsTitle({ date }: ResultsTitleProps) {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {formattedDate}</h1>
      <Button href="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
