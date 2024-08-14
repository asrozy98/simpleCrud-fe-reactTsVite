import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function ModalDelete({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-1/4 transform overflow-hidden rounded-lg text-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-gray-500 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h1"
                  className="text-2xl font-semibold leading-6"
                >
                  Delete Customer
                </DialogTitle>
                <p className="text-xl mt-4">
                  Are you sure you want to delete customer? All customer data
                  will be permanently removed. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="bg-gray-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={onSubmit}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-green-600/40 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalDelete;
