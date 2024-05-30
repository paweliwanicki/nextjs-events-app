import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { CommentBody } from '@/lib/events';
import { HttpMethod } from '@/enums/HttpMethod';
import { NotificationContext } from '@/store/notification-context';
import { NotificationStatus } from '../common/notification/notification';

type CommentsProps = {
  eventId: string;
};

export default function Comments({ eventId }: CommentsProps) {
  const { showNotification } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentBody[]>([]);
  const [isFetchingComments, setFetchingComments] = useState<boolean>(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: Partial<CommentBody>) {
    showNotification({
      title: 'Sending Comment...',
      message: 'Your comment is processing...',
      status: NotificationStatus.PENDING,
    });

    fetch(`/api/comments/${eventId}`, {
      method: HttpMethod.POST,
      body: JSON.stringify({
        eventId,
        ...commentData,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(() => {
        showNotification({
          title: 'Success!',
          message: 'Successfuly added a comment!',
          status: NotificationStatus.SUCCESS,
        });
      })
      .catch((error) => {
        console.error(error);
        showNotification({
          title: 'Error!',
          message: 'Error during adding a comment!',
          status: NotificationStatus.ERROR,
        });
      });
  }

  useEffect(() => {
    if (showComments) {
      setFetchingComments(true);
      fetch(`/api/comments/${eventId}`, {
        method: HttpMethod.GET,
      })
        .then((res) => res.json())
        .then(({ comments }) => {
          setComments(comments);
          setFetchingComments(false);
        });
    }
  }, [showComments, eventId]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}
