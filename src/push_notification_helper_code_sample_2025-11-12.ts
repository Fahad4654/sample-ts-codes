interface PushNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
  tag?: string;
  renotify?: boolean;
  requireInteraction?: boolean;
  silent?: boolean;
  vibrate?: number[];
}

class PushNotificationHelper {
  static isSupported(): boolean {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }

  static async requestPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  static async showNotification(title: string, options: PushNotificationOptions): Promise<void> {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, options);
      });
    } else {
      console.warn('Push notification permission not granted.');
    }
  }

  static async registerServiceWorker(swUrl: string): Promise<ServiceWorkerRegistration | undefined> {
    try {
      if ('serviceWorker' in navigator) {
        return await navigator.serviceWorker.register(swUrl);
      }
      return undefined;
    } catch (error) {
      console.error('Service worker registration failed:', error);
      return undefined;
    }
  }

  static async unregisterServiceWorker(swUrl: string): Promise<boolean> {
    try {
      const registration = await navigator.serviceWorker.getRegistration(swUrl);
      if (registration) {
        return await registration.unregister();
      }
      return false;
    } catch (error) {
      console.error('Service worker unregistration failed:', error);
      return false;
    }
  }
}

export default PushNotificationHelper;