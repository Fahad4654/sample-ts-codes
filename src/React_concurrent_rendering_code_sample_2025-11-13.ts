import React, { useState, useRef, useDeferredValue, useTransition } from 'react';
import ReactDOM from 'react-dom/client';

interface Item { id: number; name: string; }

const generateItems = (count: number): Item[] =>
  Array.from({ length: count }, (_, i) => ({ id: i, name: `Item ${i}` }));

function List({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Item[]>(generateItems(20000));
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const filteredItems = React.useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [items, deferredQuery]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setQuery(e.target.value);
    });
  };


  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {isPending ? <p>Updating...</p> : null}
      <List items={filteredItems} />
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
root.render(<App />);