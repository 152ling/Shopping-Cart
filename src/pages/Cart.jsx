// 購物車頁面元件
// src/components/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useParams, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalQuantity } =
    useContext(CartContext);
  const totalPrice = getTotalPrice();
  const totalQuantity = getTotalQuantity();
  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 left-2 text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
      >
        ←
      </button>
      <div className="mt-5">
        <h2 className="font-bold text-center">
          購物車
          <span className="text-xs">({totalQuantity})</span>
        </h2>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600">購物車沒有商品喔！</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-teal-800 hover:bg-teal-900 text-white px-3 py-2 rounded"
          >
            去購物
          </button>
        </div>
      ) : (
        <>
          <ul className="mt-3">
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>

          <div className="fixed bottom-0 w-full bg-white py-3 shadow-md flex items-center justify-around">
            <h3 className="text-xl text-center">總金額：NT${totalPrice}</h3>
            <button
              className="bg-teal-800 hover:bg-teal-900 text-white px-2 py-1 rounded"
              onClick={() => navigate("/checkoutPage")}
            >
              去買單
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
