import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

interface Column {
  title: string;
  render: (data: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onSelectRow?: (data: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onSelectRow }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex} onClick={() => onSelectRow?.(item)} hover style={{ cursor: 'pointer' }}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{column.render(item)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
