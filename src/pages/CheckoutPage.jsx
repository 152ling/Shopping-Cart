import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(() =>
    JSON.parse(localStorage.getItem("selectedAddress"))
  );
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const totalPrice = getTotalPrice();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 模擬送出訂單
    alert("訂單已送出！");
    clearCart();
    navigate("/"); // 成功後導回首頁
  };

  return (
    <div className="w-screen mx-auto p-4 bg-gray-100 shadow-md rounded">
      <button
        onClick={() => navigate("/cart")}
        className="absolute top-2 left-2 text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
      >
        ←
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">結帳</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="font-semibold mb-2">收件地址</h3>
        {selectedAddress ? (
          <div
            className="p-2 rounded bg-white cursor-pointer"
            onClick={() => navigate("/addresspage")}
          >
            <p>{selectedAddress.address}</p>
            <div className="flex gap-4 text-xs">
              <p>{selectedAddress.name}</p>
              <p>{selectedAddress.phone}</p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="text-blue-600 underline text-sm"
            onClick={() => navigate("/addresspage")}
          >
            ➕ 新增地址
          </button>
        )}
        {/* 購物清單 */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">購物清單</h3>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>NT${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 總金額 */}
        <div className="text-right font-bold text-lg mt-4">
          總金額：NT${totalPrice}
        </div>
        {/* 付款詳情 */}
        <div className="flex flex-col">
          <h5 className="text-xl">付款詳情</h5>
          <div className="flex justify-between text-sm text-gray-600">
            <p>商品總金額</p> <p>NT${totalPrice}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <p>運費總金額</p> <p>NT$45</p>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-600">
            <p>總付款金額</p> <p>NT${totalPrice + 45}</p>
          </div>
        </div>

        <button
          type="submit"
          className="mb-15 w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
        >
          送出訂單
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
