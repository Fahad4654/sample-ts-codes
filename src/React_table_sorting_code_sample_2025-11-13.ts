import React, { useState, useMemo } from 'react';

interface Item {
  id: number;
  name: string;
  value: number;
}

interface SortConfig {
  key: keyof Item | null;
  direction: 'ascending' | 'descending' | null;
}

function App() {
  const data: Item[] = useMemo(() => [
    { id: 1, name: 'Charlie', value: 30 },
    { id: 2, name: 'Alice', value: 10 },
    { id: 3, name: 'Bob', value: 20 },
  ], []);

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) {
      return [...data];
    }

    const sortableData = [...data];
    sortableData.sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof Item) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => requestSort('id')}>ID</th>
          <th onClick={() => requestSort('name')}>Name</th>
          <th onClick={() => requestSort('value')}>Value</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;