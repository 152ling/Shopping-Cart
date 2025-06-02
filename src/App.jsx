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
      name: "優質短袖白T",
      price: 399,
      quantity: 0,
      image:
        "https://images.unsplash.com/photo-1534961880437-ce5ae2033053?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    },
    {
      id: 2,
      name: "骷髏手短黑T",
      price: 799,
      quantity: 0,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    },
    {
      id: 3,
      name: "超時尚牛仔褲",
      price: 1299,
      quantity: 0,
      image:
        "https://images.unsplash.com/photo-1529391409740-59f2cea08bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1124&q=80",
    },
    {
      id: 4,
      name: "質感褐色系大衣服",
      price: 3499,
      quantity: 0,
      image:
        "https://images.unsplash.com/photo-1491998664548-0063bef7856c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
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
