import React, { useEffect, useState } from "react";
import productMethods from "../services/product.service";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch clients when the component mounts
    const fetchClients = async () => {
      try {
        const data = await productMethods.getClients();
        setClients(data); // Update the state with the fetched data
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
        {clients.map((client, index) => (
          <li key={index}>{client}</li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default ClientsPage;