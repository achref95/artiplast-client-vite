import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import productMethods from "../services/product.service";

const ClientsPage = () => {
  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);

  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await productMethods.getAllClients();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter clients based on search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render client list
  const renderClients = filteredClients.map((client) => (
    <li key={client._id} className="bg-blue-500 text-white p-4 rounded shadow">
      <Link to={`/client/${client._id}`}>{client.name}</Link>
    </li>
  ));

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
    isLoggedIn && (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Clients</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search clients..."
            className="border p-2 rounded"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderClients}
        </ul>
      </div>
    )
  );
};

export default ClientsPage;
