import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/artiplast-logo.jpeg'
const BillPage = ({ client, invoiceItems, invoiceNumber, tax }) => {
  useEffect(() => {
    const generateInvoice = () => {
      const doc = new jsPDF();
      let y = 15; // Initial vertical position on the page
      const itemHeight = 10; // Height of each item row
      const pageHeight = 297; // A4 page height in points (1/72 inch)

      // Company logo
      doc.addImage(logo, 'JPEG', 15, y, 30, 30); // (image, format, x, y, width, height)

      // Company name
      doc.setTextColor(51, 159, 255);
      y += 10;
      doc.setFontSize(14);
      doc.text('Sté IDEAL ARTIPLAST', 55, y);

      // Company details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      y += 4;
      doc.text('vente en Gros des Articles el Plastique', 55, y);
      y += 4;
      doc.text("Av. de l'Environnement - Medjez El Bab", 55, y);
      y += 4;
      doc.text("Tél: 78 560 234 - GSM 98 779 826", 55, y);
      y += 4;
      doc.text("Fax: 78 560 687", 55, y);
      y += 4;
      doc.text("R.C: B-051432009 - TVA: 000/MA/1079207/Z", 55, y);

      // Invoice number
      doc.setTextColor(51, 159, 255);
      y += 16;
      doc.setFontSize(14);
      doc.setFont('times', 'bold');
      doc.text(`${invoiceNumber}`, 50, y);

      ////////////////////////////////////
      // Client details
      doc.setFontSize(9);
      const roundedRectX = 120; 
      const roundedRectY = y - 12; 
      const roundedRectWidth = 50;
      const roundedRectHeight = 25; 
      const cornerRadius = 3; 
      doc.setDrawColor(0);
      doc.roundedRect(roundedRectX, roundedRectY, roundedRectWidth, roundedRectHeight, cornerRadius, cornerRadius, 'S');

      // Add text inside the rounded rectangle
      doc.setFont("times", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(`${client}`, 125, roundedRectY + 5);
      doc.text(`${tax}`, 135, roundedRectY + 11)
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
      
      doc.text(`Medjez le ${formattedDate}`, 133, roundedRectY + 20);
      //////////////////////////////////////

      // Set font style back to normal
      doc.setFont("normal"); 
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      y += 20; // Move down after adding logo and company details


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

  return (
    <div className="flex justify-center mt-2">
      <button
        onClick={() => window.location.reload()}
        className="btn"
      >
        Generate New Invoice
      </button>
    </div>
  );
};

export default BillPage;
