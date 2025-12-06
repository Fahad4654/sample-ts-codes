import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface Data {
  message: string;
  timestamp: number;
}

const useFirebaseData = (path: string): [Data | null, (data: Data) => void] => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const dataRef = ref(database, path);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val() as Data;
      setData(firebaseData);
    });

    return () => unsubscribe();
  }, [path]);

  const updateData = (newData: Data) => {
    const dataRef = ref(database, path);
    set(dataRef, newData);
  };

  return [data, updateData];
};

const FirebaseComponent: React.FC = () => {
  const [data, updateData] = useFirebaseData('myData');
  const [newMessage, setNewMessage] = useState('');

  const handleUpdate = () => {
    updateData({ message: newMessage, timestamp: Date.now() });
    setNewMessage('');
  };

  return (
    <div>
      <h1>Firebase Data Sync</h1>
      <p>Message: {data?.message}</p>
      <p>Timestamp: {data?.timestamp}</p>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Message</button>
    </div>
  );
};

export default FirebaseComponent;