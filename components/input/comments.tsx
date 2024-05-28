import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { CommentBody } from "@/lib/events";
import { HttpMethod } from "@/enums/HttpMethod";

type CommentsProps = {
  eventId: string;
};

export default function Comments({ eventId }: CommentsProps) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentBody[]>([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: Partial<CommentBody>) {
    fetch(`/api/comments/${eventId}`, {
      method: HttpMethod.POST,
      body: JSON.stringify({
        eventId,
        ...commentData,
      }),
    });
  }

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`, {
        method: HttpMethod.GET,
      })
        .then((res) => res.json())
        .then(({ comments }) => {
          setComments(comments);
        });
    }
  }, [showComments, eventId]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}
