import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import productMethods from "../services/product.service";

const ClientDetailPage = () => {
  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);
  const { clientId } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const data = await productMethods.clientDetail(clientId);
        setClient(data);
      } catch (error) {
        console.error("Error fetching client details:", error);
        // Handle error (e.g., redirect to an error page)
      }
    };

    fetchClientDetails();
  }, [clientId]);

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
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
    );
  }

  return (
    isLoggedIn && (
      <div className="min-h-screen bg-slate-50">
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">{client.name}'s Details</h1>
        <p>Tax Number: {client.taxNumber}</p>
        <p>created at: {client.createdAt}</p>
        <div className="mt-4">
          <p>Invoices:</p>
          <ul className="bg-gray-100 p-4 rounded-md space-y-2">
            {client.invoices.map((invoiceId) => (
              <li key={invoiceId} className="bg-white p-2 rounded-md">
                {invoiceId}
              </li>
            ))}
          </ul>
        </div>
        {/* Display other client details as needed */}
      </div>
    </div>
    )
  );
};

export default ClientDetailPage;
