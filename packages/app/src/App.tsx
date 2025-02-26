import './App.css'
import '@react5/lib/dist/index.css'
import { useTranslation } from 'react-i18next'
import { translationNs } from './i18n/ns'
import { useState } from 'react'
import { type Column, DataTable } from '@react5/lib'
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const sampleData: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 22 },
  { id: 4, name: "Alice Johnson", email: "alice@example.com", age: 28 },
  { id: 5, name: "Bob Smith", email: "bob@example.com", age: 34 },
  { id: 6, name: "Charlie Brown", email: "charlie@example.com", age: 22 },
  { id: 7, name: "Alice Johnson", email: "alice@example.com", age: 28 },
  { id: 8, name: "Bob Smith", email: "bob@example.com", age: 34 },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com", age: 22 },
  { id: 10, name: "Alice Johnson", email: "alice@example.com", age: 28 },
  { id: 11, name: "Bob Smith", email: "bob@example.com", age: 34 },
  { id: 12, name: "Charlie Brown", email: "charlie@example.com", age: 22 },
  { id: 13, name: "Alice Johnson", email: "alice@example.com", age: 28 },
  { id: 14, name: "Bob Smith", email: "bob@example.com", age: 34 },
  { id: 15, name: "Charlie Brown", email: "charlie@example.com", age: 22 },
];

const columns: Column<User>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", align: "left" },
  { key: "age", label: "Age", sortable: true },
];

function App() {
  const { t } = useTranslation(translationNs)
  const [ data ] = useState(sampleData);

  const handleSelectionChange = (selectedItems: User[]) => {
    console.log(selectedItems);
  }
  return (
    <>
      <h1>{t('app.title')}</h1>
      <h2>With selection</h2>
      <div className='table-container'>
        <DataTable pageSize={5} selectable data={data} columns={columns} onSelectionChange={handleSelectionChange} />
      </div>

      <h2>Without selection</h2>
      <div className='table-container'>
        <DataTable noPaging data={data} columns={columns} onSelectionChange={handleSelectionChange} />
      </div>

      <h2>With sorting</h2>
      <div className='table-container'>
        <DataTable data={data} columns={columns} onSelectionChange={handleSelectionChange} />
      </div>
    </>
  )
}
export default App
