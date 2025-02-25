import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable } from './DataTable';
import { Column } from '../TableCell';

interface IRecepie {
  id: number;
  name: string;
  ingredients: number;
  preparationTime: number;
}
const columns: Column<IRecepie>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "ingredients", label: "Ingredients", align: "left" },
  { key: "preparationTime", label: "Preparation Time", sortable: true },
];

describe('DataTable Component', () => {
  test('renders the DataTable with the correct label', () => {
    const sampleData: IRecepie[] = [
      {id: 1, name: "test", ingredients: 2, preparationTime: 20}
    ];

    render(<DataTable columns={columns} data={sampleData} />);
    const t = screen.getByRole('columnheader', {name: "Name"});
    expect(t).toBeInTheDocument();
  });
});