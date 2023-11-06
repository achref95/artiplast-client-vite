import { useState, useEffect, useContext } from "react";
import { useParams, Link, useLocation  } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import productMethods from "../services/product.service";
import Nav from "../components/Nav";

const InvoiceDetailPage = () => {
  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);
  const { invoiceId } = useParams();
  const location = useLocation();
  const { client } = location.state;
  const [invoiceDetail, setInvoiceDetail] = useState(null);
  
  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const data = await productMethods.getInvoiceDetail(invoiceId);
        setInvoiceDetail(data.invoice);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      }
    };

    fetchInvoiceDetails();
  }, [invoiceId]);

  if (expire) {
    return <div>Please <Link to="/login"><strong>login</strong></Link> again</div>;
  }

  if (isLoading || !invoiceDetail) {
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
        <div className="text-center bg-slate-50">
          <h2 className="mb-8">{client.name}'s Invoice N° {invoiceDetail.invoiceNumber} Items:</h2>
          <table className="w-full mx-auto text-left ml-4">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>TVA</th>
              </tr>
            </thead>
            <tbody>
            {invoiceDetail.products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.product}</td>
                  <td>{invoiceDetail.price[index]}</td>
                  <td>{invoiceDetail.quantity[index]}</td>
                  <td>{invoiceDetail.discount[index] || 0}</td>
                  <td>{`${invoiceDetail.tva[index] || 0}%`}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default InvoiceDetailPage;
