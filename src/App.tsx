import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ModalCreate from "./components/ModalCreate";
import ModalDelete from "./components/ModalDelete";
import ApiClient from "./libs/apiClient";

export interface customerTypes {
  no?: number | undefined;
  nama: string;
  alamat: string;
  kota: string;
}
function App() {
  const [defaultApi, setDefaultApi] = useState("express");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [customers, setCustomers] = useState<customerTypes[]>([]);
  const [formData, setFormData] = useState<customerTypes>({
    no: undefined,
    nama: "",
    alamat: "",
    kota: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("form", e, name, value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getCustomers = async () => {
    const response = await ApiClient.getCustomers(defaultApi);

    setCustomers(response?.data);
    console.log("teashg", response.data);
  };

  const createCustomer = async () => {
    const response = await ApiClient.addCustomer(defaultApi, formData);

    if (response.status == 200 || response.status == 201) {
      getCustomers();
      setFormData({
        nama: "",
        alamat: "",
        kota: "",
      });
      setModalOpen(false);
      setModalUpdate(false);
    }
  };

  const getDetailCustomer = async (no: number | undefined) => {
    const response = await ApiClient.getCustomerByNo(defaultApi, no);

    setFormData({
      no: response?.data?.no,
      nama: response?.data?.nama,
      alamat: response?.data?.alamat,
      kota: response?.data?.kota,
    });
    console.log("detail", response.data);
  };

  const updateCustomer = async () => {
    const response = await ApiClient.updateCustomer(defaultApi, formData);

    if (response.status == 200 || response.status == 201) {
      getCustomers();
      setFormData({
        no: undefined,
        nama: "",
        alamat: "",
        kota: "",
      });
      setModalOpen(false);
      setModalUpdate(false);
    }
  };

  const deleteCustomer = async () => {
    const response = await ApiClient.deleteCustomer(defaultApi, formData);

    if (response.status == 200 || response.status == 201) {
      getCustomers();
      setFormData({
        no: undefined,
        nama: "",
        alamat: "",
        kota: "",
      });
      setModalDelete(false);
    }
  };

  useEffect(() => {
    getCustomers();
    console.log("teashg2", customers);
  }, [defaultApi]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (modalUpdate) {
      updateCustomer();
    } else {
      createCustomer();
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center text-white">
      <div className="w-2/3 min-h-[500px] flex flex-col bg-gray-600 rounded-md">
        <h1 className="text-4xl text-center my-5">List Data Customers</h1>
        <div className="w-full flex justify-between mb-6 p-2">
          <div>
            <button
              className={
                "w-32 rounded-l-md px-6 pb-2 pt-2.5 text-md font-medium text-white shadow-green-400 transition duration-150 ease-in-out hover:bg-green-600/40 hover:shadow-green-800 focus:bg-green-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-black motion-reduce:transition-none" +
                (defaultApi == "express" ? " bg-green-600" : " bg-green-800")
              }
              onClick={() => setDefaultApi("express")}
            >
              Express JS
            </button>
            <button
              className={
                "w-32 rounded-r-md px-6 pb-2 pt-2.5 text-md font-medium text-white shadow-green-400 transition duration-150 ease-in-out hover:bg-green-600/40 hover:shadow-green-800 focus:bg-green-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-black motion-reduce:transition-none" +
                (defaultApi == "nest" ? " bg-green-600" : " bg-green-800")
              }
              onClick={() => setDefaultApi("nest")}
            >
              Nest JS
            </button>
          </div>
          <button
            className="inline-block rounded bg-green-800 px-6 pb-2 pt-2.5 text-md font-medium text-white shadow-green-400 transition duration-150 ease-in-out hover:bg-green-600/40 hover:shadow-green-800 active:bg-green-800 active:shadow-black motion-reduce:transition-none"
            onClick={() => setModalOpen(true)}
          >
            Create Customer
          </button>
        </div>
        <div className="w-full flex justify-center rounded-md">
          <table className="w-full h-auto text-center m-2">
            <thead className="border-b border-neutral-200 bg-green-800 rounded-md">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((item, index) => (
                <tr className="border-b border-neutral-200" key={index}>
                  <td>{item?.no}</td>
                  <td>{item?.nama}</td>
                  <td>{item?.alamat}</td>
                  <td>{item?.kota}</td>
                  <td>
                    <button
                      className="inline-block rounded-full p-2 text-white shadow-green-400 transition duration-150 ease-in-out hover:bg-green-600/40 hover:shadow-green-800 active:bg-green-800 active:shadow-black motion-reduce:transition-none"
                      onClick={() => {
                        setModalOpen(true);
                        setModalUpdate(true);
                        getDetailCustomer(item?.no);
                      }}
                    >
                      <PencilIcon className="size-6" />
                    </button>
                    <button
                      className="inline-block rounded-full p-2 text-white shadow-green-400 transition duration-150 ease-in-out hover:bg-red-600/40 hover:shadow-red-800 active:bg-red-800 active:shadow-black motion-reduce:transition-none"
                      onClick={() => {
                        setModalDelete(true);
                        setFormData({ ...formData, no: item?.no });
                      }}
                    >
                      <TrashIcon className="size-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCreate
        open={modalOpen}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        modalUpdate={modalUpdate}
        onClose={() => {
          setModalOpen(false);
          if (modalUpdate) setModalUpdate(false);
        }}
      />
      <ModalDelete
        open={modalDelete}
        onSubmit={deleteCustomer}
        onClose={() => setModalDelete(false)}
      />
    </div>
  );
}

export default App;
