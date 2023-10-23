const BillPage = ({ client, invoiceItems }) => {
    console.log(invoiceItems)
  return (
    <div className="max-w-md mx-auto bg-white p-8 border shadow-lg">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Invoice</h1>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Client Information:</p>
        <p>{client}</p>
        <p>Address</p>
        <p>Email</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Invoice Items:</p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{item.product}</td>
                <td className="p-2 border">{item.price}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <p className="font-semibold">Total Amount:</p>
        <p>
          {invoiceItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </p>
      </div>
    </div>
  );
};

export default BillPage;