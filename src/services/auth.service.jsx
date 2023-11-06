import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});

const signup = async ({ username, password }) => {
  try {
    const response = await api.post("/auth/signup", {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};


const login = async ({ username, password }) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return {responseData: response.data, responseStatus: response.status}
  } catch (err) {
    console.error(err);
    return err
  }
};

const verifyToken = async (storedToken) => {
  try {
    const response = await api.get("/auth/verify", {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    
    return response.data;
  } catch (err) {
    console.error(err);
  }
};


const getCurrentUser = async () => {
  const storedToken = localStorage.getItem("authToken");
  try {
    const response = await api.get("/user", {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};


const passwordUpdate = async ({ currentPassword, newPassword }) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.put(
      "/profile/password",
      { currentPassword, newPassword },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const authMethods = {
  signup,
  login,
  verifyToken,
  getCurrentUser,
  passwordUpdate,
};

export default authMethods;