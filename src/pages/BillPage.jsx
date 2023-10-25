import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/artiplast-logo.jpeg'
const BillPage = ({ client, invoiceItems, invoiceNumber, tax, totalAmount }) => {
  useEffect(() => {
    const generateInvoice = () => {
      const doc = new jsPDF();
      let y = 15; // Initial vertical position on the page
      const itemHeight = 10; // Height of each item row
      const lineY = doc.internal.pageSize.height - 70; // 7 cm from the bottom
      const maxItemsOnFirstPage = Math.floor((lineY - y) / itemHeight); // Maximum items that can fit on the first page

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
      doc.text(`Facture N° ${invoiceNumber}`, 50, y);

      ////////////////////////////////////
      // Client details
      doc.setFontSize(9);
      const maxClientNameWidth = 50; // Set a maximum width for the client name
      const splitText = doc.splitTextToSize(client, maxClientNameWidth);
      const wrappedClient = splitText.join("\n");
      const roundedRectX = 120; 
      const roundedRectY = y - 12; 
      const roundedRectWidth = 50;
      const roundedRectHeight = 25; 
      const cornerRadius = 3; 
      doc.setDrawColor(0);
      doc.roundedRect(roundedRectX, roundedRectY, roundedRectWidth, roundedRectHeight, cornerRadius, cornerRadius, 'S');

      // Add text inside the rounded rectangle with text wrapping
      doc.setFont("times", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(wrappedClient, 125, roundedRectY + 5);
      doc.text(`${tax}`, 135, roundedRectY + 11);
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
      let itemsRendered = 0;
      while (itemsRendered < invoiceItems.length) {
        const itemsToRender = invoiceItems.slice(itemsRendered, itemsRendered + maxItemsOnFirstPage);
        doc.autoTable({
          startY: y,
          head: [['Product', 'Price', 'Quantity', 'Total']],
          body: itemsToRender.map((item) => [
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
        itemsRendered += itemsToRender.length;
        y = doc.autoTable.previous.finalY + 10;

        if (itemsRendered < invoiceItems.length) {
          doc.addPage(); // Add a new page if there are more items to render
          y = 15; // Reset vertical position for the new page
        }
      }

      // Draw the line at the bottom of the last page with specified blue color
      const lineStartX = 15; // 1 cm from the left
      const lineEndX = doc.internal.pageSize.width - 15; // 1 cm from the right
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); // Set line color to blue
      doc.line(lineStartX, lineY, lineEndX, lineY);

      // Save the PDF or display it, for example:
      doc.save('invoice.pdf');
    };

    generateInvoice();
  }, []);

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
