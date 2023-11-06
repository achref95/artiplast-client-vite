import { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/artiplast-logo.jpeg'
const BillPage = ({ client,
                    invoiceItems, 
                    invoiceNumber,
                    timbre,
                    observation,
                    tva /*Taux%*/, 
                    tax /*Matricule fiscal*/, 
                    totalAmount/*Total TTC*/,
                    totalAmountInLetters, 
                    withoutTVA /*Base/Total HT*/, 
                    invoiceTVA /*Montant/TVA*/}) => {
  useEffect(() => {
    const generateInvoice = () => {
      const doc = new jsPDF();
      let y = 15; 
      const itemHeight = 10; 
      const lineY = doc.internal.pageSize.height - 70; 
      const lineY2 = doc.internal.pageSize.height - 60;
      const lineY3 = doc.internal.pageSize.height - 52;
      const line5Y = doc.internal.pageSize.height - 36;

      const maxItemsOnFirstPage = Math.floor((lineY - y) / itemHeight); // Maximum items that can fit on the first page

      // Company logo
      doc.addImage(logo, 'JPEG', 15, y, 30, 30); // (image, format, x, y, width, height)

      // Company name
      doc.setTextColor(51, 159, 255);
      y += 10;
      doc.setFontSize(14);
      doc.text('Company Name', 55, y);

      // Company details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      y += 4;
      doc.text('Whatever this company sells', 55, y);
      y += 4;
      doc.text("Company Adress - Wukanda", 55, y);
      y += 4;
      doc.text("Phones: 12 345 678 - GSM 12 345 678", 55, y);
      y += 4;
      doc.text("Fax: 12 345 678", 55, y);
      y += 4;
      doc.text("R.C: B-123456789 - TVA: 123/MA/456789/BB", 55, y);

      // Invoice number
      doc.setTextColor(51, 159, 255);
      y += 16;
      doc.setFontSize(14);
      doc.setFont('times', 'bold');
      doc.text(`Invoice N° ${invoiceNumber}`, 50, y);

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
      doc.setDrawColor(51, 159, 255);
      doc.roundedRect(roundedRectX, roundedRectY, roundedRectWidth, roundedRectHeight, cornerRadius, cornerRadius, 'S');

      // Add text inside the rounded rectangle with text wrapping
      doc.setFont("times", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(wrappedClient, 125, roundedRectY + 5);
      doc.text(`${tax}`, 135, roundedRectY + 11);
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;

      doc.text(`Wukanda ${formattedDate}`, 133, roundedRectY + 20);

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
            `${item.price} USD`,
            item.quantity,
            `${item.price * item.quantity} USD`,
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
      const lineEndX = doc.internal.pageSize.width - 10; 
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(lineStartX, lineY, lineEndX, lineY);

        // Second line words
      const words1 = ['Code', 'Base', 'Rate', 'Amount'];
      const word1X = 20; 
      const words1Spacing = 18; 
      doc.setTextColor(51, 159, 255);
      doc.setFontSize(10);
      words1.forEach((word, index) => {
        const x = word1X + index * words1Spacing;
        doc.text(word, x, lineY + 7);
      });

      const words2 = ['Total w/ tax', 'TVA', 'Stamp Tax', 'Total w tax'];
      const word2X = 110;
      const words2Spacing = 20;
      doc.setTextColor(0); 
      doc.setFontSize(10);
      words2.forEach((word, index) => {
        const x = word2X + index * words2Spacing;
        doc.text(word, x, lineY + 7);
      });

      // Second line part 1
      const line2Part1StartX = 15; 
      const line2Part1EndX = 88;
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(line2Part1StartX, lineY2, line2Part1EndX, lineY2);
      // Second line part 2
      const line2Part2StartX = 108; 
      const line2Part2EndX = doc.internal.pageSize.width - 18;
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(line2Part2StartX, lineY2, line2Part2EndX, lineY2);

      // Total TTC
      const totalAmountText = `${totalAmount} USD`;


      // line 2
      const line2Part1 = ['TVA Col', withoutTVA.toString(), `${tva} %`, invoiceTVA.toString()];
      const detail1X = 20; 
      const detail1Spacing = 18; 
      doc.setTextColor(0); 
      doc.setFontSize(8);
      line2Part1.forEach((detail, index) => {
        const x = detail1X + index * detail1Spacing;
        doc.text(detail, x, lineY + 15);
      });

      const line2Part2 = [withoutTVA.toString(), invoiceTVA.toString(), timbre.toString(), totalAmountText];
      const detail2X = 110; 
      const detail2Spacing = 20; 
      doc.setTextColor(0); 
      doc.setFontSize(8);
      line2Part2.forEach((detail, index) => {
        const x = detail2X + index * detail2Spacing;
        doc.text(detail, x, lineY + 15);
      });

      //reset fontsize
      doc.setFontSize(10);

      
      // Third line part 1
      const line3Part1StartX = 15; 
      const line3Part1EndX = 88; 
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(line3Part1StartX, lineY3, line3Part1EndX, lineY3);

      // Words in the third line part 1 with specific positions in centimeters
      const words3Part1Positions = [
        { text: 'Timbre', x: 20 },  
        { text: 'XXX', x: 45 },    
        { text: timbre.toString(), x: 70 }    
      ];

      doc.setTextColor(0); 
      doc.setFontSize(10);

      words3Part1Positions.forEach(wordInfo => {
        doc.text(wordInfo.text, wordInfo.x, lineY3 + 5);
      });

      // Third line part 2
      const line3Part2StartX = 90;
      const line3Part2EndX = 158;
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(line3Part2StartX, lineY3 + 7, line3Part2EndX, lineY3 + 7);

      // Third line part 3
      const line3Part3StartX = 164;
      const line3Part3EndX = 192;
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(line3Part3StartX, lineY3 + 5, line3Part3EndX, lineY3 + 5);



      // Fourth line part 1
      const line4StartX = 15; 
      const line4EndX = 78; 
      const line4Y = doc.internal.pageSize.height - 44; 

      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(line4StartX, line4Y, line4EndX, line4Y);

      // Fourth line part 2
      const line4Part2StartX = 90;
      const line4Part2EndX = 158;
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(line4Part2StartX, lineY3 + 18, line4Part2EndX, lineY3 + 18);

      // TEXT
      const textStartX = 90
      doc.setTextColor(192,192,192)
      doc.text('invoice at the sum of :', textStartX, lineY3 + 13)

      // Numbers to letters
      // Maximum width for the text
      doc.setTextColor(105,105,105)

      const maxWidth = 158 - textStartX;
      const textWidth = doc.getTextWidth(totalAmountInLetters);
      
      if (textWidth <= maxWidth) {
        // If the text fits within the width, draw it on a single line
        doc.text(totalAmountInLetters, textStartX, lineY + 42);
      } else {
        // If the text exceeds the width, split it into multiple lines and adjust y-coordinate
        const lines = doc.splitTextToSize(totalAmountInLetters, maxWidth);
        lines.forEach((line, index) => {
          doc.text(line, textStartX, lineY + 42 + index * 5); // Adjust the y-coordinate based on your font size and line height
        });
      }


      // Signature
      const signStartX = 165;
      doc.setTextColor(51, 159, 255);
      doc.setFont("times", "bold");
      doc.setFontSize(9);
      doc.text('signature and stamp', signStartX, lineY3 + 13);



      // TOTAL
      const totalTextX = 20; 
      const totalTextY = line4Y + 5; 
      doc.setTextColor(	220, 20, 60); 
      doc.setFont("times", "bold");
      doc.setFontSize(10);
      doc.text('TOTAL', totalTextX, totalTextY);


      // Spacing between "TOTAL" and totalAmount
      const totalAmountX = totalTextX + 35;
      doc.setTextColor(0); 
      doc.text(`${totalAmount} USD`, totalAmountX, totalTextY);

      // Fifth line
      const line5StartX = 15; 
      const line5EndX = 78; 

      doc.setFont("times", "normal");
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(line5StartX, line5Y, line5EndX, line5Y);

      // Observation rectangle
      const observationRectX = 15;
      const observationRectY = doc.internal.pageSize.height - 34; 
      const observationRectWidth = 62;
      const observationRectHeight = 16;
      const observationCornerRadius = 3;
      doc.setDrawColor(51, 159, 255); // Set border color to red for observation rectangle
      doc.roundedRect(observationRectX, observationRectY, observationRectWidth, observationRectHeight, observationCornerRadius, observationCornerRadius, 'S');

      // Text "Observation"
      const observationTextX = observationRectX + observationRectWidth / 2;
      const observationTextY = observationRectY + 5; // Adjust the Y position to center the text at the top of the rectangle
      doc.setTextColor(51, 159, 255); 
      doc.text("Observation", observationTextX, observationTextY, { align: 'center' });

      // Observation note
      const observationX = observationRectX + 4;
      const observationY = observationRectY + 8; 
      doc.setTextColor(0, 0, 0); 
      doc.setFont('times', 'normal');

      const maxObservationWidth = observationRectWidth - 8; // Set the maximum width for the observation text
      const splitObservation = doc.splitTextToSize(observation, maxObservationWidth);
      const truncatedObservation = splitObservation.join('\n'); // Split observation into lines

      doc.text(truncatedObservation, observationX, observationY);

      // Last line
      const lastStartX = 90;
      const lastEndX = 158;
      doc.setLineWidth(0.5);
      doc.setDrawColor(51, 159, 255); 
      doc.line(lastStartX, lineY3 + 34, lastEndX, lineY3 + 34);

      // Footer
        // Add the footer text
        const footerText = [
          'Company Name',
          'Company Adress - Wukanda',
          'Medjez El Bab - Tel 12 456 798 - GSM 12 345 678',
          'FAX: 78 560 687',
          'R.C: B-123456789 - TVA: 123/ma/456789/BB'
        ];
        const footerFontSize = 5;
        const footerLineHeight = 0.7; // 0.7mm spacing between lines
        const lineHeightInPoints = (footerLineHeight / 25.4) * 72; 
        const footerY = lineY3 + 38; 
      
        doc.setTextColor(192,192,192)
        doc.setFontSize(footerFontSize);
      
        // Add each line of the footer text
        footerText.forEach((line, index) => {
          const textWidth = doc.getStringUnitWidth(line) * footerFontSize / doc.internal.scaleFactor;
          const textX = (doc.internal.pageSize.width - textWidth) / 2;
          const textY = footerY + index * lineHeightInPoints;
          doc.text(line, textX, textY);
        });

      /////////////////////////////////////////////////////////////////////////////////

      // Save the PDF
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
