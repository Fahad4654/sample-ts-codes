import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}

const useChat = (channelId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Simulate fetching messages (replace with actual API call)
    const initialMessages: Message[] = [
      { id: '1', sender: 'Alice', text: 'Hello!', timestamp: new Date() },
      { id: '2', sender: 'Bob', text: 'Hi Alice!', timestamp: new Date() },
    ];
    setMessages(initialMessages);

    // Simulate new message arriving (replace with websocket connection)
    const intervalId = setInterval(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'Eve',
        text: 'Anyone here?',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [channelId]);

  const sendMessage = (text: string, sender: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: sender,
      text: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return { messages, sendMessage };
};

const ChatMessage = ({ message }: { message: Message }) => (
  <div>
    <strong>{message.sender}:</strong> {message.text}
  </div>
);

const ChatInput = ({ onSendMessage }: { onSendMessage: (text: string) => void }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

const ChatWindow = ({ channelId }: { channelId: string }) => {
  const { messages, sendMessage } = useChat(channelId);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    sendMessage(text, 'User');
  };


  return (
    <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={messageEndRef} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export const TeamChat = () => {
  return (
    <div>
      <h1>Team Chat</h1>
      <ChatWindow channelId="general" />
    </div>
  );
};