import React, { useState } from 'react';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isUser }) => {
  const bubbleStyle = {
    backgroundColor: isUser ? '#DCF8C6' : '#FFFFFF',
    borderRadius: '10px',
    padding: '8px 12px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    marginBottom: '4px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={bubbleStyle}>{text}</div>
    </div>
  );
};

interface ChatWindowProps { }

const ChatWindow: React.FC<ChatWindowProps> = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; }[]>([
    { text: 'Hello!', isUser: false },
    { text: 'Hi there!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
  ]);

  return (
    <div style={{ padding: '16px' }}>
      {messages.map((message, index) => (
        <MessageBubble key={index} text={message.text} isUser={message.isUser} />
      ))}
    </div>
  );
};

export default ChatWindow;