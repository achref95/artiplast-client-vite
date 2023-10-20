import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GenerateInvoicePage from "./pages/GenerateInvoicePage";
import InvoicesPage from "./pages/InvoicesPage";
import NotFoundPage from "./pages/NotFoundPage"
import ClientPage from "./pages/ClientPage";
import BillPage from "./pages/BillPage";
import AddProductPage from "./pages/AddProductPage";
import AddClientPage from "./pages/AddClientPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/generate" element={<GenerateInvoicePage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/bill" element={<BillPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/add-client" element={<AddClientPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
