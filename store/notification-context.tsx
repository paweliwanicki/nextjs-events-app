import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  NotificationStatus,
  NotificationTypes,
} from '@/components/common/notification/notification';

type NoficationContextType = {
  activeNotification?: NotificationTypes;
  showNotification: (notification: NotificationTypes) => void;
  hideNotification: () => void;
};

export const NotificationContext = createContext<NoficationContextType>({
  activeNotification: undefined,
  showNotification: () => undefined,
  hideNotification: () => undefined,
});

type NotificationContextProviderProps = {
  children: ReactNode;
};

export default function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationTypes>();

  const showNotification = useCallback((notification: NotificationTypes) => {
    setActiveNotification(notification);
  }, []);

  const hideNotification = useCallback(() => {
    setActiveNotification(undefined);
  }, []);

  useEffect(() => {
    if (
      activeNotification &&
      activeNotification.status !== NotificationStatus.PENDING
    ) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification, hideNotification]);

  const value = useMemo(
    () => ({
      activeNotification,
      showNotification,
      hideNotification,
    }),
    [activeNotification, showNotification, hideNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
