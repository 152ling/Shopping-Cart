import React, { useState } from "react";
import { useContext } from "react";
import { CartProvider, CartContext } from "./context/CartContext";
import { useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";
import ProductList from "./pages/ProductList";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import { Toaster, toast } from "react-hot-toast"; // 這邊加了toast
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import AddressPage from "./pages/AddressPage";
import FavoritesPage from "./pages/FavoritesPage";
function App() {
  const location = useLocation();
  const { getTotalQuantity, cartItems } = useContext(CartContext);
  const totalQuantity = getTotalQuantity();
  const hideNavbarPaths = ["/checkoutPage", "/login", "/register"]; //要隱藏Nav的頁面
  const shouldHideNavbar =
    location.pathname.startsWith("/product/") ||
    hideNavbarPaths.includes(location.pathname);
  // 假資料：之後可以改成從 API 或 props 傳入
  const products = [
    {
      id: 1,
      name: "T-shirt",
      price: 399,
      quantity: 0,
      image: "https://placehold.co/30x30",
    },
    {
      id: 2,
      name: "Jeans",
      price: 799,
      quantity: 0,
      image: "https://placehold.co/50x50",
    },
    {
      id: 3,
      name: "Sneaker",
      price: 1299,
      quantity: 0,
      image: "https://placehold.co/50x50",
    },
    {
      id: 4,
      name: "鞋子",
      price: 3499,
      quantity: 0,
      image: "https://placehold.co/50x50",
    },
  ];

  return (
    <>
      <Toaster />

      {!shouldHideNavbar && <Navbar totalQuantity={totalQuantity} />}
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} />}
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route
          path="/checkoutPage"
          element={<CheckoutPage cartItems={cartItems} />}
        />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addresspage" element={<AddressPage />} />
      </Routes>
    </>
  );
}

export default App;
