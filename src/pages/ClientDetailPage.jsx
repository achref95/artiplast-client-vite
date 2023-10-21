import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import productMethods from "../services/product.service";

const ClientDetailPage = () => {
   const { isLoggedIn, isLoading, expire } = useContext(AuthContext);
   const { clientId } = useParams(); // Get client ID from URL params
   const [client, setClient] = useState(null);
  

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const data = await productMethods.clientDetail(clientId);
        console.log(data)
        setClient(data); // Set client details received from the API
      } catch (error) {
        console.error("Error fetching client details:", error);
        // Handle error (e.g., redirect to an error page)
      }
    };

    fetchClientDetails();
  }, [clientId]);

  if (!client) {
    // Loading state or error handling can be implemented here
    return (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )
  }

  if (expire) {
    return <div>Please <Link to="/login"><strong>login</strong></Link> again</div>;
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    )
  }

  return (
    isLoggedIn &&
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">{client.name}'s Details</h1>
      <p>Tax Number: {client.taxNumber}</p>
      <p>created at: {client.createdAt}</p>
      <p>{client.invoices}</p>
      {/* Display other client details as needed */}
    </div>
  );
};

export default ClientDetailPage;

