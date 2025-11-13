import React, { useState, useCallback } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface Row {
  id: number;
  name: string;
  age: number;
  city: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'city', headerName: 'City', width: 160 },
];

const initialRows: Row[] = [
  { id: 1, name: 'John Doe', age: 25, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 30, city: 'Los Angeles' },
  { id: 3, name: 'Peter Jones', age: 28, city: 'Chicago' },
];

const ReactDataGrid = () => {
  const [rows, setRows] = useState<GridRowsProp>(initialRows);

  const handleRowUpdate = useCallback((newRow: Row) => {
    setRows((prevRows: any) =>
      prevRows.map((row: Row) => (row.id === newRow.id ? { ...row, ...newRow } : row))
    );
    return newRow;
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={handleRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
};

export default ReactDataGrid;