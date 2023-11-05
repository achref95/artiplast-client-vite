import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import productMethods from "../services/product.service";

const AddProductPage = () => {
    const { isLoggedIn, isLoading, expire } = useContext(AuthContext);
    const [product, setProduct] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleProductSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (!product) {
                setErrorMessage("Please enter a product name.");
                return;
            }
    
            const response = await productMethods.createProduct({ product });
            console.log(response) 
            console.log(response.message)
            setSuccessMessage(response.message)
    
        } catch (error) {
            console.error(error);
            setErrorMessage("Something went wrong. Please try again later.");
            setSuccessMessage("");
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
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Add a New Product</h1>
                    <form onSubmit={handleProductSubmit} className="flex flex-col max-w-xs mx-auto space-y-4">
                        <div>
                            <label htmlFor="product" className="text-sm font-semibold text-gray-600 mb-1">Product Name:</label>
                            <input
                                type="text"
                                id="product"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <button type="submit" className="btn btn-wide btn-neutral">
                            Add Product
                        </button>
                    </form>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </div>
            </div>

        )
    );
};

export default AddProductPage;

