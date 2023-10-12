import { useState, useEffect, createContext } from "react";
import authMethods from "../services/auth.service";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [expire, setExpire] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
  
      if (storedToken) {
        const userPayload = await authMethods.verifyToken(storedToken);
  
        if (!userPayload) {
          // Token verification failed
          logOutUser();
          return;
        }
  
        // Check if the token has expired
        const tokenExpirationTimestamp = userPayload.exp * 1000; // Convert seconds to milliseconds
        const currentTime = Date.now();
  
        if (tokenExpirationTimestamp <= currentTime) {
          // You can perfom any logic here, I just loggedout the user
          logOutUser(); // You can add the expire state here
        } else {
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(userPayload);
        }
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
        setExpire(true);
      }
    } catch (error) {
      console.error("Error in authenticateUser:", error);
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      setExpire(true);
    }
  };
  

  const removeToken = () => {
    localStorage.removeItem("authToken");
  }

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, expire, setUser, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };
