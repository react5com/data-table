
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable } from './DataTable';
import { Column } from '../TableCell';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { CheckBox} from '../CheckBox';

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
  
 

  test('render empty table', () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  
  test('sorts data by name', async () => { // Use async for userEvent
    //const user = userEvent.setup(); // Setup userEvent
    const sampleData: IRecepie[] = [
      { id: 1, name: 'Bb', ingredients: 5, preparationTime: 60 },
      { id: 2, name: 'Ff', ingredients: 7, preparationTime: 45 },
      { id: 3, name: 'Cc', ingredients: 8, preparationTime: 50 },
    ];
  
    render(<DataTable columns={columns} data={sampleData} />);
  
    //Get all the cells of the table (we assume that "Name" is the first column)
    let cells = screen.getAllByRole('cell');
    const nameCells = cells.filter((_, index) => index % columns.length === 0); // first column
    expect(nameCells[0]).toHaveTextContent('Bb');
    expect(nameCells[1]).toHaveTextContent('Ff');
    expect(nameCells[2]).toHaveTextContent('Cc');
  
    // Click on the "Name" heading to sort in ascending order
    const nameHeader = screen.getByRole('columnheader', { name: 'Name' }); 
    await nameHeader.click(); // Use await with userEvent
  
    // Check the ascending sort
    cells = screen.getAllByRole('cell');
    const sortedAsc = cells.filter((_, index) => index % columns.length === 0);
    expect(sortedAsc[0]).toHaveTextContent('Bb');
    expect(sortedAsc[1]).toHaveTextContent('Cc');
    expect(sortedAsc[2]).toHaveTextContent('Ff');
  
    // Click again to sort in descending order
    await nameHeader.click();
  
    // Сheck the descending sorting
    cells = screen.getAllByRole('cell');
    const sortedDesc = cells.filter((_, index) => index % columns.length === 0);
    expect(sortedDesc[0]).toHaveTextContent('Ff');
    expect(sortedDesc[1]).toHaveTextContent('Cc');
    expect(sortedDesc[2]).toHaveTextContent('Bb');
  });

 

  test('Correct pagination', () => {
    const sampleData = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      ingredients: 3,
      preparationTime: 20,
    }));

    render(<DataTable columns={columns} data={sampleData} pageSize={5}/>);

    // Check that the first 5 items are displayed on the first page
    sampleData.slice(0, 5).forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    // Check that items 6 through 15 are not displayed on the first page
    sampleData.slice(5).forEach(item => {
      expect(screen.queryByText(item.name)).not.toBeInTheDocument();
    });

    // look for the button to go to the next page and click on it
    const nextPageButton = screen.getByText('>');
    fireEvent.click(nextPageButton);

    // Check that items 6 through 10 are displayed on the second page
    sampleData.slice(5, 10).forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    //Check that items 1-5 and 11-15 are not displayed on the second page
    sampleData.slice(0, 5).concat(sampleData.slice(10)).forEach(item => {
      expect(screen.queryByText(item.name)).not.toBeInTheDocument();
    });
  });

  test('click on a checkbox it switches: clicked - checked, clicked again - unchecked', async () => {
    render(<CheckBox label="Test Checkbox" />);

    //Get the checkbox by its role and text label
    const checkbox = screen.getByRole('checkbox', { name: 'Test Checkbox' });

    // the checkbox should be unchecked
    expect(checkbox).not.toBeChecked();

    // Click on the checkbox and make sure it is checked.
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Click on the checkbox again and check that the mark is removed.
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

