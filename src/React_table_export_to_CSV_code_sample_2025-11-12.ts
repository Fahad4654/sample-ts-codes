import React, { useState, useCallback } from 'react';
import { useTable, Column } from 'react-table';

interface Data {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}

const generateCSV = (data: Data[]) => {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  return `${header}\n${rows.join('\n')}`;
};

const downloadCSV = (csv: string) => {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const App = () => {
  const [data] = useState<Data[]>([
    { firstName: 'John', lastName: 'Doe', age: 25, visits: 10, status: 'Active', progress: 50 },
    { firstName: 'Jane', lastName: 'Doe', age: 30, visits: 5, status: 'Inactive', progress: 75 },
  ]);

  const columns: Column<Data>[] = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Visits', accessor: 'visits' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Progress', accessor: 'progress' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleExport = useCallback(() => {
    const csvData = generateCSV(data);
    downloadCSV(csvData);
  }, [data]);

  return (
    <>
      <button onClick={handleExport}>Export to CSV</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};

export default App;