import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Nav from "../components/Nav";
import productMethods from "../services/product.service";

const AddClientPage = () => {
    const { isLoggedIn, isLoading, expire } = useContext(AuthContext);
    const [client, setClient] = useState({ name: "", taxNumber: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleClientSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!client.name || !client.taxNumber) {
                setErrorMessage("Please enter client name and tax number.");
                return;
            }

            const response = await productMethods.createClient(client);
            console.log(response);
            setSuccessMessage(response.message);
            setClient({ name: "", taxNumber: "" });

        } catch (error) {
            console.error(error);
            setErrorMessage("Something went wrong. Please try again later.");
            setSuccessMessage("");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 5000); // Clear messages after 5 seconds

        return () => {
            clearTimeout(timer); // Clear the timer if the component unmounts
        };
    }, [successMessage, errorMessage]);

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

    if (expire || !isLoggedIn) {
        return <div>Please <Link to="/login"><strong>login</strong></Link> again</div>;
    }

    return (
        isLoggedIn && (
            <div className="h-screen bg-slate-50">
                <Nav />
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Add a New Client</h1>
                    <form onSubmit={handleClientSubmit} className="flex flex-col max-w-xs mx-auto space-y-4">
                        <div>
                            <label htmlFor="name" className="text-sm font-semibold text-gray-600 mb-1">Client Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={client.name}
                                onChange={(e) => setClient({ ...client, name: e.target.value })}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div>
                            <label htmlFor="taxNumber" className="text-sm font-semibold text-gray-600 mb-1">Tax Number:</label>
                            <input
                                type="text"
                                id="taxNumber"
                                value={client.taxNumber}
                                onChange={(e) => setClient({ ...client, taxNumber: e.target.value })}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <button type="submit" className="btn btn-wide btn-neutral">
                            Add Client
                        </button>
                    </form>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </div>
            </div>

        )
    );
};

export default AddClientPage;
