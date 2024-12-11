import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function DeleteConfirmationModal({ expense, onClose, onConfirm }) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <Dialog.Title className="text-lg font-semibold">
                Delete Expense
              </Dialog.Title>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Are you sure you want to delete this expense? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(expense)}
              className="btn bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}