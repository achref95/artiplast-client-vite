import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ToWords } from "to-words";
import Nav from "../components/Nav";
import { calculateTotalWithTVA,
         calculateTotalWithoutTVA, 
         tvaValue } from "../components/invoiceUtils";
import productMethods from "../services/product.service";
import ClientSearchBar from "../components/ClientSearchBar";
import ProductSearchBar from "../components/ProductSearchBar";
import BillPage from "./BillPage";

const GenerateInvoicePage = () => {
  const { isLoggedIn, isLoading, expire } = useContext(AuthContext);

  const [client, setClient] = useState("");
  const [tax, setTax] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  // Timbre is Stamp tax, you can edit it depending on your needs
  const [timbre, setTimbre] = useState(0);
  const [tva, setTVA] = useState(19);
  const [observation, setObservation] = useState("");
  const [withoutTVA, setWithoutTVA] = useState(0);
  const [invoiceTVA, setInvoiceTVA] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountInLetters, setTotalAmountInLetters] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [bill, setBill] = useState(false);

  const handlePrice = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleDiscount = (e) => {
    const discountInputValue = parseInt(e.target.value);
    const discountValue = isNaN(discountInputValue) ? 0 : discountInputValue;
    setDiscount(discountValue);
  };

  // If the stamp tax amount is variable, you can create an new input to handle that
  const handleTimbre = (e) => {
    setTimbre(e.target.value);
  }

  const handleObservation = (e) => {
    setObservation(e.target.value);
  }

  const handleTVA = (e) => {
    const tvaInputValue = parseInt(e.target.value);
    const tvaValue = isNaN(tvaInputValue) ? 0 : tvaInputValue;
    setTVA(tvaValue);
  };
  

  const handleAddToInvoice = () => {
    const newItem = { client, product, price, quantity, discount, tva };
    
    setInvoiceItems([...invoiceItems, newItem]);
    setProduct("");
    setPrice("");
    setQuantity("");
    setDiscount("");
    setBill(false);
  };

  const handleDelete = (index) => {
    const updatedInvoiceItems = [...invoiceItems];
    updatedInvoiceItems.splice(index, 1);
    setInvoiceItems(updatedInvoiceItems);
  };

  const handleSubmit = async () => {
    try {
      const productsArray = invoiceItems.map((item) => item.product);
      const pricesArray = invoiceItems.map((item) => item.price);
      const quantitiesArray = invoiceItems.map((item) => item.quantity);
      const discountsArray = invoiceItems.map((item) => item.discount);
      const tvasArray = invoiceItems.map((item) => item.tva);
      const timbreAmount = timbre
      const clientName = client;
      const ObservationValue = observation

      const totalAmountWithTVA = calculateTotalWithTVA(invoiceItems, timbre);
      // console.log("total with TVA:", totalAmountWithTVA);
      const a = calculateTotalWithoutTVA(invoiceItems);
      // console.log("total without TVA:", a);
      const b = tvaValue(invoiceItems);
      // console.log("tva value:", b);
      const toWords = new ToWords({
        localeCode: 'en-US',
        converterOptions: {
          currency: true,
          ignoreDecimal: false,
          ignoreZeroCurrency: false,
          doNotAddOnly: true,
          currencyOptions: {
            name: 'Dollar',
            plural: 'Dollars',
            symbol: '',
            fractionalUnit: {
              name: 'cent',
              plural: 'cents',
              symbol: '',
            },
          },
        },
      });

      const totalAmountWords = toWords.convert(totalAmountWithTVA, { currency: true });
      setTotalAmountInLetters(totalAmountWords);


      const response = await productMethods.generate({
        name: clientName,
        products: productsArray,
        price: pricesArray,
        quantity: quantitiesArray,
        discount: discountsArray,
        timbre: timbreAmount,
        tva: tvasArray,
        observation: ObservationValue,
      });

      setWithoutTVA(a);
      setInvoiceTVA(b);
      setTotalAmount(totalAmountWithTVA);
      setInvoiceNumber(response.invoiceNumber);
      setBill(true);

    } catch (error) {
      console.error(error);
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (expire) {
    return <div>Please <Link to="/login"><strong>login</strong></Link> again</div>;
  }

  return (
    isLoggedIn && (
      <div className="h-screen bg-slate-50">
        <Nav />
        <form className="space-y-2 ml-4 mb-4">
          {/* First Line */}
          <div className="flex items-center space-x-2">
            <h1>Add Client</h1>
            <ClientSearchBar setClient={setClient} setTax={setTax} />
          </div>

          {/* Add Product Line */}
          <div className="flex items-center space-x-2">
            <h1>Add Product</h1>
            <ProductSearchBar setProduct={setProduct} />
          </div>

          {/* Inputs Line */}
          <div className="flex items-center space-x-2">
            <h1>Add Details</h1>
            <input
              type="number"
              placeholder="Quantity"
              className="input input-bordered w-full max-w-xs"
              value={quantity}
              onChange={handleQuantity}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full max-w-xs"
              value={price}
              onChange={handlePrice}
              required
            />
            <input
              type="number"
              placeholder="Discount"
              className="input input-bordered w-full max-w-xs"
              value={discount}
              onChange={handleDiscount}
              required
            />
          </div>


          {/* Third Line */}
          <div className="flex items-center space-x-2">
            <h1>Add TVA %</h1>
            <input
              type="number"
              placeholder="TVA %"
              className="input input-bordered w-full max-w-xs"
              value={tva}
              onChange={handleTVA}
              required
            />
            {/* Add Observation Input */}
            <input
              type="text"
              placeholder="Observation"
              className="input input-bordered w-full max-w-xs"
              value={observation}
              onChange={handleObservation}
            />
          </div>


          <button
            type="button"
            onClick={handleAddToInvoice}
            className="btn btn-neutral"
            disabled={!client || !product || !price || !quantity || !tva}
          >
            Add to Invoice
          </button>
        </form>

        {invoiceItems.length > 0 && (
          <div className="text-center bg-slate-50">
            <h2>Invoice Items:</h2>
            <table className="w-full mx-auto">
              <thead>
                <tr>
                  {/* <th>Client</th> */}
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>TVA</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.discount || 0}</td>
                    <td>{`${item.tva}%` || 0}</td>
                    <td>
                      <button 
                        className="btn btn-error"
                        onClick={() => handleDelete(index)}
                      >
                            del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-accent mt-4 mb-4"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit Invoice
            </button>
          </div>
        )}
        {bill && <BillPage 
                    client={client} 
                    invoiceItems={invoiceItems} 
                    invoiceNumber={invoiceNumber}
                    timbre={timbre}
                    tva={tva} 
                    tax={tax}
                    observation={observation} 
                    totalAmount={totalAmount}
                    totalAmountInLetters={totalAmountInLetters} 
                    withoutTVA={withoutTVA} 
                    invoiceTVA={invoiceTVA} 
                    />}
      </div>
    )
  );
};

export default GenerateInvoicePage;
