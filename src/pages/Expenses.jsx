import { useState } from 'react'
import ExpenseTable from '../components/ExpenseTable'
import ExpenseForm from '../components/ExpenseForm'
import { Dialog } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Expenses() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Expense
        </button>
      </div>

      <ExpenseTable />

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add New Expense
            </Dialog.Title>
            <ExpenseForm onClose={() => setIsOpen(false)} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}