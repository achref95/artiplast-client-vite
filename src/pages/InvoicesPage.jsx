import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import productMethods from "../services/product.service";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);

  const handleDelete = async (_id) => {
    try {
      const response = await productMethods.deleteInvoices(_id);
      setInvoices((prev) => prev.filter((invoice) => invoice._id !== _id))
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchInvoices = async () => {
        try {
          const response = await productMethods.getInvoices();
          console.log(response);
          setInvoices(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchInvoices();
    }
  }, [isLoggedIn]);

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
        {invoices.map((invoice) => (
          <div key={invoice?._id} className="border p-4 mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-xl font-semibold">Products</h3>
                <ul>
                  {invoice?.product.map((product) => (
                    <li key={product}>{product}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Prices</h3>
                <ul>
                  {invoice?.price.map((price) => (
                    <li key={price}>{price}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Quantities</h3>
                <ul>
                  {invoice?.quantity.map((quantity) => (
                    <li key={quantity}>{quantity}</li>
                  ))}
                </ul>
              </div>
              <div>
              <div>{invoice.client}</div>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleDelete(invoice._id)}
                >
                  del
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default InvoicesPage;

