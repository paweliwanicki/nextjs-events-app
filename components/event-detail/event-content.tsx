import classes from './event-content.module.css';

type EventContentProps = {
  children: React.ReactNode;
};

export default function EventContent({ children }: EventContentProps) {
  return <section className={classes.content}>{children}</section>;
}