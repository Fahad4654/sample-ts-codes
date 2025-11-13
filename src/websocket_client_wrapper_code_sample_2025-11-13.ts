interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
}

class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number;
  private onOpenCallback: () => void = () => {};
  private onMessageCallback: (data: any) => void = () => {};
  private onCloseCallback: () => void = () => {};
  private onErrorCallback: (error: Event) => void = () => {};
  private reconnectTimeoutId: number | null = null;

  constructor(config: WebSocketConfig) {
    this.url = config.url;
    this.reconnectInterval = config.reconnectInterval || 3000;
    this.connect();
  }

  private connect(): void {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.onOpenCallback();
      if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
        this.reconnectTimeoutId = null;
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessageCallback(data);
      } catch (error) {
        this.onMessageCallback(event.data);
      }
    };

    this.ws.onclose = (event) => {
      console.log("WebSocket disconnected:", event.code, event.reason);
      this.onCloseCallback();
      if (!event.wasClean) {
        this.reconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.onErrorCallback(error);
    };
  }

  private reconnect(): void {
    if (this.reconnectTimeoutId) return;

    this.reconnectTimeoutId = setTimeout(() => {
      console.log("Attempting to reconnect...");
      this.connect();
      this.reconnectTimeoutId = null;
    }, this.reconnectInterval) as any;
  }

  public send(data: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  }

  public close(): void {
    if (this.ws) {
      this.ws.close();
    }
    if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
        this.reconnectTimeoutId = null;
      }
  }

  public onOpen(callback: () => void): void {
    this.onOpenCallback = callback;
  }

  public onMessage(callback: (data: any) => void): void {
    this.onMessageCallback = callback;
  }

  public onClose(callback: () => void): void {
    this.onCloseCallback = callback;
  }

  public onError(callback: (error: Event) => void): void {
    this.onErrorCallback = callback;
  }
}

export default WebSocketClient;