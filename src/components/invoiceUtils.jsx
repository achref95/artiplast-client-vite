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
  const totalWithTVA = totalWithoutTVA + tvaAmount + timbre;
  const roundedTotal = parseFloat(totalWithTVA.toFixed(3)); // Round to 2 decimal places
  console.log(totalWithoutTVA, tvaAmount, timbre, roundedTotal);
  return roundedTotal;
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