import React, { useState, useEffect } from 'react';

interface Item {
  id: number;
  label: string;
}

interface AutocompleteProps {
  items: Item[];
  onSelect: (item: Item | null) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ items, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const results = items.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(results);
      setIsOpen(true);
    } else {
      setFilteredItems([]);
      setIsOpen(false);
    }
  }, [searchTerm, items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item: Item) => {
    setSearchTerm(item.label);
    onSelect(item);
    setIsOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Search..."
      />
      {isOpen && (
        <ul>
          {filteredItems.map(item => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              {item.label}
            </li>
          ))}
          {filteredItems.length === 0 && <li>No results found.</li>}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;