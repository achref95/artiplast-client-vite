export const calculateTotalWithTVA = (invoiceItems, timbre) => {
  // still investigation
  let totalWithoutTVA = 0;
  let tvaAmount = 0;

  invoiceItems.forEach((item) => {
    const totalForItem = (item.price - item.discount) * item.quantity;
    totalWithoutTVA += totalForItem;
    tvaAmount += (totalForItem * item.tva) / 100;
  });

  // added timbre here
  const totalWithTVA = totalWithoutTVA + parseFloat(tvaAmount.toFixed(2)) + timbre;
  const roundedTotal = parseFloat(totalWithTVA.toFixed(2)); // Round to 2 decimal places
  return roundedTotal;
};


export const calculateTotalWithoutTVA = (invoiceItems) => {
    let totalWithoutTVA = 0;

    invoiceItems.forEach((item) => {
      const totalForItem = (item.price - item.discount) * item.quantity;
      totalWithoutTVA += totalForItem;
    });
    
    const totalnoTVA = parseFloat(totalWithoutTVA.toFixed(2));
    return totalnoTVA;
}

export const tvaValue = (invoiceItems) => {
    let tvaAmount = 0;

    invoiceItems.forEach((item) => {
      const totalForItem = (item.price - item.discount) * item.quantity;
      tvaAmount += (totalForItem * item.tva) / 100;
    });

    const amountTVA = parseFloat(tvaAmount.toFixed(2));
    return amountTVA;
}