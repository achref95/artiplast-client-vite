import { useState, useEffect } from "react";
import productMethods from "../services/product.service";

const ProductSearchBar = ({ setProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Function to fetch product suggestions
    const fetchProductSuggestions = async () => {
      try {
        const response = await productMethods.getProduct();
        setSuggestions(response);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch product suggestions when the component mounts
    fetchProductSuggestions();
  }, []);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setProduct(value);

    // Show suggestions when input changes, hide them when empty
    setShowSuggestions(!!value);
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false); // Hide suggestions after clicking
    setProduct(suggestion);
  };

  // Filter suggestions based on the search term
  const filteredSuggestions = suggestions.filter((product) =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        className="input input-bordered input-primary w-full max-w-xs"
        value={searchTerm}
        onChange={handleInputChange}
        required
      />
      {showSuggestions && (
        <ul>
          {filteredSuggestions.map((product, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(product)}
            >
              {product}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearchBar;
