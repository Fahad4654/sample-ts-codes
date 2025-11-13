import React, { useState, useEffect } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
}

const items: Item[] = [
  { id: 1, name: 'Apple', description: 'A red fruit' },
  { id: 2, name: 'Banana', description: 'A yellow fruit' },
  { id: 3, name: 'Orange', description: 'An orange fruit' },
];

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  useEffect(() => {
    const results = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilter;