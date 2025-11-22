interface NotificationOptions {
  body?: string;
  icon?: string;
  data?: any;
  tag?: string;
  renotify?: boolean;
  silent?: boolean;
  requireInteraction?: boolean;
  vibrate?: number[];
  actions?: NotificationAction[];
}

interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

class BrowserNotificationManager {
  private permission: NotificationPermission;

  constructor() {
    this.permission = Notification.permission;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (this.permission === "granted") {
      return this.permission;
    }
    this.permission = await Notification.requestPermission();
    return this.permission;
  }

  showNotification(title: string, options?: NotificationOptions): Promise<Notification | null> {
    return new Promise((resolve) => {
      if (this.permission !== "granted") {
        resolve(null);
        return;
      }
      const notification = new Notification(title, options);
      notification.onshow = () => resolve(notification);
      notification.onerror = () => resolve(null);
      notification.onclick = () => notification.close();

    });
  }

  isSupported(): boolean {
    return 'Notification' in window;
  }
}

export default BrowserNotificationManager;