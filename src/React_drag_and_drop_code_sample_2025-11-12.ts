import React, { useState, useRef, DragEvent } from 'react';

interface Item {
  id: string;
  text: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
  ]);

  const draggedItem = useRef<Item | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: Item) => {
    draggedItem.current = item;
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData('text/plain');
    const droppedItemIndex = items.findIndex((item) => item.id === droppedItemId);
    const targetItemIndex = items.findIndex((item) => item.id === draggedItem.current?.id);

    if (droppedItemIndex === -1 || targetItemIndex === -1) return;

    const newItems = [...items];
    const [droppedItem] = newItems.splice(droppedItemIndex, 1);
    newItems.splice(targetItemIndex, 0, droppedItem);

    setItems(newItems);
    draggedItem.current = null;
  };

  return (
    <div style={{ display: 'flex' }}>
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            border: '1px solid black',
            margin: '10px',
            padding: '10px',
            cursor: 'move',
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default App;