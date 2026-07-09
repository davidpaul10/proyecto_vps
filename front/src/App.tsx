import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Products from "./pages/Products";
import "./styles.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/products" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={token ? <Products /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;