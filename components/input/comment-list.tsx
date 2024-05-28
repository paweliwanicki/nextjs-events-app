import { CommentBody } from "@/lib/events";
import classes from "./comment-list.module.css";

type CommentsListProps = {
  comments: CommentBody[];
};

export default function CommentList({ comments }: CommentsListProps) {
  return (
    <ul className={classes.comments}>
      {comments.map(({ id, eventId, text, name }) => (
        <li key={`comment-${eventId}-${id}`}>
          <p>{text}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}
