import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import productMethods from "../services/product.service";

const ClientsPage = () => {
  const { isLoggedIn, /*isLoading*/ expire } = useContext(AuthContext);

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch clients when the component mounts
    const fetchClients = async () => {
      try {
        const data = await productMethods.getAllClients();
        console.log(data)
        setClients(data); // Update the state with the fetched data
        setFilteredClients(data); // Set filteredClients initially to all clients
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredClients = clients.filter(client =>
      client.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filteredClients);
  };

  // message appears before pages load, need improvements
  if (expire) {
    return <div>Please <Link to="/login"><strong>login</strong></Link> again</div>;
  }

  return (
    isLoggedIn &&
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Clients</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredClients.map((client, index) => (
            <li key={index} className="bg-blue-500 text-white p-4 rounded shadow">
              {client}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientsPage;
