import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('notes', {
    header: 'Notes',
    cell: info => info.getValue(),
  }),
]

const data = [
  { id: 1, date: '2023-11-01', category: 'Food', amount: 25.50, notes: 'Lunch' },
  { id: 2, date: '2023-11-02', category: 'Transport', amount: 15.00, notes: 'Bus fare' },
  { id: 3, date: '2023-11-03', category: 'Entertainment', amount: 50.00, notes: 'Movie tickets' },
]

export default function ExpenseTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b dark:border-gray-700">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="text-left p-4">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b dark:border-gray-700">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}