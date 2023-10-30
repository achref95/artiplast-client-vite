import { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/artiplast-logo.jpeg'
const BillPage = ({ client,
                    invoiceItems, 
                    invoiceNumber,
                    timbre,
                    tva /*Taux%*/, 
                    tax /*Matricule fiscal*/, 
                    totalAmount/*Total TTC*/, 
                    withoutTVA /*Base/Total HT*/, 
                    invoiceTVA /*Montant/TVA*/}) => {
  useEffect(() => {
    const generateInvoice = () => {
      const doc = new jsPDF();
      let y = 15; // Initial vertical position on the page
      const itemHeight = 10; // Height of each item row
      const lineY = doc.internal.pageSize.height - 70; // 7 cm from the bottom
      const lineY2 = doc.internal.pageSize.height - 60;
      const lineY3 = doc.internal.pageSize.height - 52;
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
      // doc.setFont("normal"); 
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      y += 20; // Move down after adding logo and company details

      // Render invoice items as a table
      let itemsRendered = 0;
      while (itemsRendered < invoiceItems.length) {
        const itemsToRender = invoiceItems.slice(itemsRendered, itemsRendered + maxItemsOnFirstPage);
        doc.autoTable({
          startY: y,
          head: [['Product', 'Price', 'Quantity', 'Total']],
          body: itemsToRender.map((item) => [
            item.product,
            `${item.price} TND`,
            item.quantity,
            `${item.price * item.quantity} TND`,
          ]),
          theme: 'striped',
          //adjust
          styles: { textColor: [0, 0, 0], fontSize: 10, cellPadding: 2, minCellHeight: 1 },
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
      /////////////////////////////////////////////////////////////////////////////////

      // Draw the line at the bottom of the last page with specified blue color
      const lineStartX = 10; // 1 cm from the left
      const lineEndX = doc.internal.pageSize.width - 10; // 1 cm from the right
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); // Set line color to blue
      doc.line(lineStartX, lineY, lineEndX, lineY);

        // 1st line words
      const words1 = ['Code', 'Base', 'Taux', 'Montant'];
      const word1X = 20; // 1.5 cm from the left
      const words1Spacing = 18; // 1 cm between each word
      doc.setTextColor(51, 159, 255); // Set text color to blue
      doc.setFontSize(10);
      words1.forEach((word, index) => {
        const x = word1X + index * words1Spacing;
        doc.text(word, x, lineY + 7);
      });

      const words2 = ['Total HT', 'TVA', 'Timbre', 'Total TTC'];
      const word2X = 110;
      const words2Spacing = 20;
      doc.setTextColor(0); // Set text color to blue
      doc.setFontSize(10);
      words2.forEach((word, index) => {
        const x = word2X + index * words2Spacing;
        doc.text(word, x, lineY + 7);
      });

      // Second line part 1
      const line2Part1StartX = 15; // 1 cm from the left
      const line2Part1EndX = 88;//doc.internal.pageSize.width - 15; // 1 cm from the right
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); // Set line color to blue
      doc.line(line2Part1StartX, lineY2, line2Part1EndX, lineY2);
      // Second line part 2
      const line2Part2StartX = 108; // 1 cm from the left
      const line2Part2EndX = doc.internal.pageSize.width - 18;
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); // Set line color to blue
      doc.line(line2Part2StartX, lineY2, line2Part2EndX, lineY2);

      // Total TTC
      const totalAmountText = `${totalAmount} TND`;
      // const totalAmountWidth = doc.getStringUnitWidth(totalAmountText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      // const totalAmountX = doc.internal.pageSize.width - 20 - totalAmountWidth;
      // doc.text(totalAmountText, totalAmountX, lineY + 15);

      // line 2
      const line2Part1 = ['TVA Col', withoutTVA.toString(), `${tva} %`, invoiceTVA.toString()];
      const detail1X = 20; // 1.5 cm from the left
      const detail1Spacing = 18; // 1 cm between each word
      doc.setTextColor(0); // Set text color to blue
      doc.setFontSize(10);
      line2Part1.forEach((detail, index) => {
        const x = detail1X + index * detail1Spacing;
        doc.text(detail, x, lineY + 15);
      });

      const line2Part2 = [withoutTVA.toString(), invoiceTVA.toString(), timbre.toString(), totalAmountText];
      const detail2X = 110; // 1.5 cm from the left
      const detail2Spacing = 20; // 1 cm between each word
      doc.setTextColor(0); // Set text color to blue
      doc.setFontSize(10);
      line2Part2.forEach((detail, index) => {
        const x = detail2X + index * detail2Spacing;
        doc.text(detail, x, lineY + 15);
      });

      
      // Third line part 1
      const line3Part1StartX = 15; // 1 cm from the left
      const line3Part1EndX = 88; //doc.internal.pageSize.width - 15; // 1 cm from the right
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); // Set line color to blue
      doc.line(line3Part1StartX, lineY3, line3Part1EndX, lineY3);

      // Words in the third line part 1 with specific positions in centimeters
      const words3Part1Positions = [
        { text: 'Timbre', x: 20 },  // 1.5 cm from the left (1 cm + 0.5 cm)
        { text: 'XXXX', x: 45 },    // 2 cm from the left (1 cm + 1 cm)
        { text: timbre.toString(), x: 70 }      // 3 cm from the left (1 cm + 2 cm)
      ];

      doc.setTextColor(0); // Set text color to black
      doc.setFontSize(10);

      words3Part1Positions.forEach(wordInfo => {
        doc.text(wordInfo.text, wordInfo.x, lineY3 + 6);
      });

      // Fourth line 
      const line4StartX = 15; // 1 cm from the left
      const line4EndX = 88; // 1 cm from the right
      const line4Y = doc.internal.pageSize.height - 44; // 4 cm from the bottom

      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); // Set line color to blue
      doc.line(line4StartX, line4Y, line4EndX, line4Y);

      // TOTAL
const totalTextX = 20; // 1.5 cm from the left
const totalTextY = line4Y + 6; // 0.7 cm from the top of the box
doc.setTextColor(255, 0, 0); // Set text color to red
doc.setFontSize(10);
doc.text('TOTAL', totalTextX, totalTextY);


// Spacing between "TOTAL" and totalAmount
const totalAmountX = totalTextX + 35;
doc.setTextColor(0); // Set text color to black
doc.text(`${totalAmount} TND`, totalAmountX, totalTextY);


      // Text inside the box
      // const observationText = 'Observation:';
      // const observationTextX = 20; // 1.5 cm from the left
      // const observationTextY = line4Y + 7; // 0.7 cm from the top of the box
      // doc.setFont("times", "normal");
      // doc.setTextColor(0, 0, 0);
      // doc.setFontSize(10);
      // doc.text(observationText, observationTextX, observationTextY);


       


      /////////////////////////////////////////////////////////////////////////////////

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
