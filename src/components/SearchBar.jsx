import { useState, useEffect } from "react";
import productMethods from "../services/product.service";

const SearchBar = ({ setClient }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Function to fetch client suggestions
    const fetchClientSuggestions = async () => {
      try {
        const response = await productMethods.getClients();
        setSuggestions(response);
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
    setClient(value)

  
    // Show suggestions when input changes, hide them when empty
    setShowSuggestions(!!value);
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false); // Hide suggestions after clicking
    setClient(suggestion)
  };

  // Filter suggestions based on the search term
  const filteredSuggestions = suggestions.filter((client) =>
    client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search clients..."
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
              {client}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;


