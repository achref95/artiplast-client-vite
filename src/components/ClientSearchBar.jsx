import React, { useState, useEffect } from "react";
import productMethods from "../services/product.service";

const ClientSearchBar = ({ setClient, setTax }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Function to fetch client suggestions
    const fetchClientSuggestions = async () => {
      try {
        const response = await productMethods.getClients();
        const clientsData = response.clientsData;
        setSuggestions(clientsData);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch client suggestions when the component mounts
    fetchClientSuggestions();
  }, []);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setClient(value);
    setShowSuggestions(!!value); // Show suggestions when input changes, hide them when empty
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (client) => {
    setSelectedClient(client);
    setClient(client.name); // Set the selected client name in your main component state
    setTax(client.taxNumber); // Set the tax number in your main component state
    if (!client.taxNumber) {
      setTax("___________")
    }
    setSearchTerm(client.name); // Set the search term to the selected client name
    setShowSuggestions(false); // Hide suggestions after clicking
  };

  // Filter suggestions based on the search term
  const filteredSuggestions = suggestions.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search clients..."
        className="input input-bordered w-full max-w-xs"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {showSuggestions && (
        <ul>
          {filteredSuggestions.map((client, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(client)}
            >
              {client.name}
            </li>
          ))}
        </ul>
      )}
      {selectedClient && (
        <div>
          <label>Tax Number:</label>
          <input
            type="text"
            value={selectedClient.taxNumber}
            readOnly // Make the input read-only
            className="input input-bordered"
          />
        </div>
      )}
    </div>
  );
};

export default ClientSearchBar;


