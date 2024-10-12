import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import { ProductsContextProvider } from "./global/ProductsContext";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notfound from "./components/Notfound";

function App() {
  return (
    <ProductsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/addproduct" Component={AddProduct} />
          <Route exact path="/cartproducts" Component={Cart} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/cart" Component={Cart} />
          <Route Component={Notfound} />
        </Routes>
      </BrowserRouter>
    </ProductsContextProvider>
  );
}

export default App;
