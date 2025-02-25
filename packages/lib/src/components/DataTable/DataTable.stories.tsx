import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { Column } from '../TableCell';

const meta: Meta<typeof DataTable> = {
  title: 'Example/DataTable',
  component: DataTable,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;
export default meta;

type Story = StoryObj<typeof DataTable>;

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
const sampleData: IRecepie[] = [
  {id: 1, name: "test", ingredients: 2, preparationTime: 20}
];
export const TextDataTable: Story = {
  render: () => <DataTable columns={columns} data={sampleData}/>,
};
