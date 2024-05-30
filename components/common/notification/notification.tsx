import { useContext } from 'react';

import classes from './notification.module.css';
import { NotificationContext } from '@/store/notification-context';

export enum NotificationStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type NotificationTypes = {
  title: string;
  message: string;
  status: NotificationStatus;
};

export default function Notification({
  title,
  message,
  status,
}: NotificationTypes) {
  const { hideNotification } = useContext(NotificationContext);

  const activeClasses = `${classes.notification} ${classes[status]}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

Notification;
