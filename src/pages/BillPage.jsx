import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const BillPage = ({ client, invoiceItems }) => {
  useEffect(() => {
    const generateInvoice = () => {
      const doc = new jsPDF();
      let y = 15; // Initial vertical position on the page
      const itemHeight = 10; // Height of each item row
      const pageHeight = 297; // A4 page height in points (1/72 inch)

      doc.setFontSize(18);
      doc.text('Invoice', 105, y);
      y += 15;

      doc.setFontSize(12);
      doc.text(`Client: ${client}`, 15, y);
      y += 10;

      // Render invoice items as a table
      doc.autoTable({
        startY: y,
        head: [['Product', 'Price', 'Quantity', 'Total']],
        body: invoiceItems.map((item) => [
          item.product,
          `${item.price} USD`,
          item.quantity,
          `${item.price * item.quantity} USD`,
        ]),
        theme: 'striped',
        styles: { textColor: [0, 0, 0], fontSize: 10, cellPadding: 2 },
        columnStyles: { 0: { cellWidth: 80 } }, // Adjust column width if necessary
        margin: { top: 15 },
      });

      // Calculate total amount
      const totalAmount = invoiceItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Render total amount
      y = doc.autoTable.previous.finalY + 10;
      doc.text(`Total Amount: ${totalAmount} USD`, 15, y);

      // Save the PDF or display it, for example:
      doc.save('invoice.pdf');
    };

    generateInvoice();
  }, [client, invoiceItems]);

  return <div>
    <button
      onClick={() => window.location.reload()}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
    >
      Generate New Invoice
    </button>
    </div>; 
};

export default BillPage;

