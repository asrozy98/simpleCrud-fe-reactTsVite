import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChangeEvent, FormEvent } from "react";
import { customerTypes } from "../App";

function ModalCreate({
  open,
  onClose,
  onSubmit,
  onChange,
  modalUpdate,
  formData,
}: {
  open: boolean;
  onClose: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  modalUpdate: boolean;
  formData: customerTypes;
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
            className="relative w-2/5 transform overflow-hidden rounded-lg text-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form onSubmit={onSubmit}>
              <div className="bg-gray-500 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h1"
                    className="text-2xl font-semibold leading-6"
                  >
                    {modalUpdate ? "Update Customer" : "Create Customer"}
                  </DialogTitle>
                  <div className="mt-2">
                    <div className="sm:col-span-4 my-4">
                      <label
                        htmlFor="nama"
                        className="block text-xl font-medium leading-6 mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="nama"
                        name="nama"
                        type="text"
                        placeholder="isal"
                        value={formData.nama}
                        onChange={onChange}
                        className="w-full border border-white bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0"
                      />
                    </div>
                    <div className="sm:col-span-4 my-4">
                      <label
                        htmlFor="nama"
                        className="block text-xl font-medium leading-6 mb-2"
                      >
                        Address
                      </label>
                      <input
                        id="alamat"
                        name="alamat"
                        type="text"
                        placeholder="indonesia"
                        value={formData.alamat}
                        onChange={onChange}
                        className="w-full border border-white bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0"
                      />
                    </div>
                    <div className="sm:col-span-4 my-4">
                      <label
                        htmlFor="kota"
                        className="block text-xl font-medium leading-6 mb-2"
                      >
                        Kota
                      </label>
                      <input
                        id="kota"
                        name="kota"
                        type="text"
                        placeholder="blitar"
                        value={formData.kota}
                        onChange={onChange}
                        className="w-full border border-white bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-green-600/40 sm:ml-3 sm:w-auto"
                >
                  {modalUpdate ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalCreate;
