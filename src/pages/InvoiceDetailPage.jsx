import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import productMethods from "../services/product.service";
import Nav from "../components/Nav";

const InvoiceDetailPage = () => {
  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);
  const { invoiceId } = useParams();
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

  const renderInvoiceItems = () => {
    return invoiceDetail.products.map((productId, index) => {
      const product = {
        _id: productId,
        price: invoiceDetail.price[index],
        quantity: invoiceDetail.quantity[index],
        discount: invoiceDetail.discount[index] || 0,
        tva: invoiceDetail.tva[index] || 0,
      };

      return (
        <tr key={index}>
          <td>{product._id}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          <td>{product.discount}</td>
          <td>{`${product.tva}%`}</td>
        </tr>
      );
    });
  };

  return (
    isLoggedIn && (
      <div className="min-h-screen bg-slate-50">
        <Nav />
        <div className="text-center bg-slate-50">
          <h2 className="mb-8">Invoice Items:</h2>
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
            <tbody>{renderInvoiceItems()}</tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default InvoiceDetailPage;
