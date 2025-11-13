import { useState, useEffect, useRef } from 'react';

interface WebSocketOptions {
    onOpen?: (event: Event) => void;
    onMessage?: (event: MessageEvent) => void;
    onError?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    reconnectInterval?: number;
}

const useWebSocket = (url: string, options: WebSocketOptions = {}) => {
    const [data, setData] = useState<any>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const { onOpen, onMessage, onError, onClose, reconnectInterval = 1000 } = options;

        const connect = () => {
            ws.current = new WebSocket(url);

            ws.current.onopen = (event) => {
                setIsConnected(true);
                onOpen?.(event);
            };

            ws.current.onmessage = (event) => {
                setData(event.data);
                onMessage?.(event);
            };

            ws.current.onerror = (event) => {
                setIsConnected(false);
                onError?.(event);
            };

            ws.current.onclose = (event) => {
                setIsConnected(false);
                onClose?.(event);
                setTimeout(() => connect(), reconnectInterval);
            };
        };

        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url, options]);

    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        }
    };

    return { data, isConnected, sendMessage };
};

export default useWebSocket;