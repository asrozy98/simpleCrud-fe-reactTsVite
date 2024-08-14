import Axios from "axios";
import { customerTypes } from "../App";

const expressUrl = import.meta.env.VITE_EXPRESS_URL;
const nestUrl = import.meta.env.VITE_NEST_URL;

function defaultClient(server: string = 'express') {
    console.log("Calling API", server);

    return Axios.create({
        baseURL: server == 'express' ? expressUrl : nestUrl,
    });
}

const ApiClient = {
    getCustomers: (server: string) => {
        console.log("Calling get customer from API", server);
        return defaultClient(server).get('api/customers');
    },

    addCustomer: (server: string, data: customerTypes) => {
        console.log("Calling post customer from API");
        return defaultClient(server).post('api/customer', data);
    },

    getCustomerByNo: (server: string, no: number | undefined) => {
        console.log("Calling get customer from API", server);
        return defaultClient(server).get('api/customer/' + no);
    },

    updateCustomer: (server: string, data: customerTypes) => {
        console.log("Calling put customer from API");
        return defaultClient(server).put('api/customer/' + data?.no, data);
    },

    deleteCustomer: (server: string, data: customerTypes) => {
        console.log("Calling delete customer from API");
        return defaultClient(server).delete('api/customer/' + data?.no);
    },
}


export default ApiClient;