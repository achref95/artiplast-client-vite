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

export const calculateTotalWithoutTVA = (invoiceItems) => {
    let totalWithoutTVA = 0;

    invoiceItems.forEach((item) => {
      const totalForItem = (item.price - item.discount) * item.quantity;
      totalWithoutTVA += totalForItem;
    });
    
    const totalnoTVA = totalWithoutTVA;
    return totalnoTVA;
}

export const tvaValue = (invoiceItems) => {
    let tvaAmount = 0;

    invoiceItems.forEach((item) => {
      const totalForItem = (item.price - item.discount) * item.quantity;
      tvaAmount += (totalForItem * item.tva) / 100;
    });

    const amountTVA = tvaAmount;
    return amountTVA;
}