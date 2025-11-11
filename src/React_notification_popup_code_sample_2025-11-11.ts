import React, { useState, useEffect } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<{ notification: Notification; onRemove: (id: string) => void }> = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
      <button onClick={() => onRemove(notification.id)}>×</button>
    </div>
  );
};

const NotificationProvider: React.FC<NotificationProps> = ({ notifications, onRemove }) => {
  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} onRemove={onRemove} />
      ))}
    </div>
  );
};

interface UseNotificationResult {
  notifications: Notification[];
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
  NotificationProvider: React.FC<NotificationProps>;
}

const useNotification = (): UseNotificationResult => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substring(7);
    setNotifications([...notifications, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    NotificationProvider: ({ children }: { children: React.ReactNode }) => (
      <NotificationProvider notifications={notifications} onRemove={removeNotification}>
        {children}
      </NotificationProvider>
    ),
  };
};

export default useNotification;