export const calculateTotalWithTVA = (invoiceItems) => {
    let totalWithoutTVA = 0;
    let tvaAmount = 0;
  
    invoiceItems.forEach((item) => {
      const totalForItem = (item.price - item.discount) * item.quantity;
      totalWithoutTVA += totalForItem;
  
      tvaAmount += (totalForItem * item.tva) / 100;
    });
  
    const totalWithTVA = totalWithoutTVA + tvaAmount;
    return totalWithTVA;
  };