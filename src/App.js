import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Products from "./pages/products";
import PrivateRoutes from "./routes/privateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<PrivateRoutes><Products /></PrivateRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App