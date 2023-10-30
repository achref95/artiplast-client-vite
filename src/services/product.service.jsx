import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});

const generate = async ({ name, products, price, quantity, discount, timbre, tva}) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post(`/invoice/generate`, { name, products, price, quantity, discount, timbre, tva }, config);
      console.log(response.data)
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

const getAllClients = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/client/all`, config)
    console.log(response.data.clients)
    return response.data.clients
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
    const response = await api.get(`/client/get`, config)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
};

const createClient = async ({name, taxNumber}) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post(`/client/add`, { name, taxNumber }, config);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
}

const clientDetail = async (clientId) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/client/${clientId}`, config)
    console.log(response)
    return response.data.client
  } catch (error) {
    console.log(error)
  }
}

const createProduct = async ({ product }) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post(`/product`, { product }, config);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getProduct = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/product/get`, config);
    console.log(response.data)
    return response.data.products;
  } catch (error) {
    console.log(error)
  }
}

const productMethods = {
    generate,
    getInvoices,
    deleteInvoices,
    getAllClients,
    getClients,
    createClient,
    clientDetail,
    createProduct,
    getProduct,
};

export default productMethods;