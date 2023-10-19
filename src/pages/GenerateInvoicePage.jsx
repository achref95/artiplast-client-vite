import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import productMethods from "../services/product.service";
import ClientSearchBar from "../components/ClientSearchBar";
import ProductSearchBar from "../components/ProductSearchBar";
import BillPage from "./BillPage";

const GenerateInvoicePage = () => {
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [bill, setBill] = useState(false);

  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);

  // const handleClient = (e) => {
  //   setClient(e.target.value);
  // }

  // const handleProduct = (e) => {
  //   setProduct(e.target.value);
  // };

  const handlePrice = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToInvoice = () => {
    // Add the newly entered product to the invoice items list
    const newItem = { client, product, price, quantity };
    console.log(newItem)
    setInvoiceItems([...invoiceItems, newItem]);

    setProduct("");
    setPrice(0);
    setQuantity(0);
    setBill(false);
  };

  const handleDelete = (index) => {
    const updatedInvoiceItems = [...invoiceItems];
    updatedInvoiceItems.splice(index, 1);
    setInvoiceItems(updatedInvoiceItems);
  };

  const handleSubmit = async () => {
    try {
      const productsArray = invoiceItems.map((item) => item.product);
      const pricesArray = invoiceItems.map((item) => item.price);
      const quantitiesArray = invoiceItems.map((item) => item.quantity);
      const clientName = client

      const response = await productMethods.generate({
        name: clientName,
        products: productsArray,
        price: pricesArray,
        quantity: quantitiesArray,
      });
  
      console.log(response);
  
      // setInvoiceItems([]);
      setBill(true)
    } catch (error) {
      console.error(error);
    }
  };

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

  if (expire) {
    return <div>Please <Link to="/login"><strong>login</strong></Link> again</div>;
  }

  return (
    isLoggedIn && (
      <div>
        
        <form className="flex space-y-2 justify-around">
          <h1>Add</h1>
          <ClientSearchBar setClient={setClient}/>
          <h1>Add</h1>
          <ProductSearchBar setProduct={setProduct} />
          <h1>Add</h1>
          <input
            type="number" 
            placeholder="Price"
            className="input input-bordered input-primary w-full max-w-xs"
            value={price}
            onChange={handlePrice}
            required
          />
          <h1>Add</h1>
          <input
            type="number" 
            placeholder="Quantity"
            className="input input-bordered input-primary w-full max-w-xs"
            value={quantity}
            onChange={handleQuantity}
            required
          />
          <button
            type="button" // Use type="button" to prevent form submission
            onClick={handleAddToInvoice}
            className="btn btn-neutral"
          >
            Add to Invoice
          </button>
        </form>
        
        {invoiceItems.length > 0 && (
          <div className="text-center">
            <h2>Invoice Items:</h2>
            <table className="w-full mx-auto">
              <thead>
                <tr>
                  {/* <th>Client</th> */}
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleDelete(index)}
                      >
                            del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary mt-4"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit Invoice
            </button>
          </div>
        )}
        {bill && <BillPage client={client} invoiceItems={invoiceItems} />}
      </div>
    )
  );
};

export default GenerateInvoicePage;
