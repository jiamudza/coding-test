import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Products from "./pages/products";
import PrivateRoutes from "./routes/privateRoutes";
import ProductById from "./pages/products/productById";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<PrivateRoutes><Products /></PrivateRoutes>} />
        <Route path="/products/:id" element={<PrivateRoutes><ProductById /></PrivateRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App