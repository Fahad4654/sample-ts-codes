import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface CollaborationProps {
  roomId: string;
}

const CollaborationComponent: React.FC<CollaborationProps> = ({ roomId }) => {
  const [text, setText] = useState('');
  const socket = useRef<Socket | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    socket.current = io('http://localhost:3001'); // Replace with your server URL

    socket.current.emit('joinRoom', roomId);

    socket.current.on('textChange', (newText: string) => {
      if (textareaRef.current && document.activeElement !== textareaRef.current) {
        setText(newText);
      }
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [roomId]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    socket.current?.emit('textChange', newText, roomId);
  };

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleTextChange}
      style={{ width: '100%', height: '300px' }}
    />
  );
};

export default CollaborationComponent;

// Example Server (Node.js with Socket.IO):
// const io = require('socket.io')(3001, {
//   cors: {
//     origin: "http://localhost:3000", // Replace with your React app URL
//     methods: ["GET", "POST"]
//   }
// });

// io.on("connection", (socket) => {
//   socket.on("joinRoom", (room) => {
//     socket.join(room);
//   });

//   socket.on("textChange", (text, room) => {
//     socket.to(room).emit("textChange", text);
//   });
// });