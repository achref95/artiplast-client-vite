import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const generate = async ({ client, product, price, quantity}) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post(`/invoice/generate`, { client, product, price, quantity }, config);
      console.log(response)
      return response.data;
    } catch (error) {
      throw error;
    }
  };

const getInvoices = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/invoice/get`, config);
      return response.data.invoice;
    } catch (error) {
      console.log(error)
    }
}

const deleteInvoices = async (_id) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.delete(`/invoice/delete/${_id}` , config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getClients = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/client/suggestions`, config)
    console.log(response.data.clients)
    return response.data.clients
  } catch (error) {
    console.log(error)
  }
};

const productMethods = {
    generate,
    getInvoices,
    deleteInvoices,
    getClients,
};

export default productMethods;