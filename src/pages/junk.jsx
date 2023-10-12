import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import productMethods from "../services/product.service";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const {
    isLoggedIn,
    isLoading,
    expire
  } = useContext(AuthContext);

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
    )
  }

  if (expire) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-center">Token expired</h1>
      </div>
    );
  }
  return (
    isLoggedIn && (
      <div>
        {invoices.map((invoice) => (
          <div key={invoice?._id} className="flex flex-col">
            {invoice?.product && (
              <div>
                <strong>Product:</strong> {invoice.product}
              </div>
            )}
            {invoice?.price && (
              <div>
                <strong>Price:</strong> {invoice.price}
              </div>
            )}
            {invoice?.quantity && (
              <div>
                <strong>Quantity:</strong> {invoice.quantity}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
};

export default InvoicesPa