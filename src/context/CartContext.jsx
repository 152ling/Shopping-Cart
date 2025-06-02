//購物車狀態管理
import React, { createContext, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); //取得使用者登入狀態
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  }); //重整也保留購物車商品

  // 每次 cartItems 改變時，同步存回 localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  // 加入商品到購物車
  const addToCart = (product) => {
    if (!user) {
      toast.error("請先登入才能加入購物車！");
      return;
    }

    // 檢查商品是否已在購物車中
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      // 如果已存在，增加數量
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // 如果不存在，新增商品
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast.success("已加入購物車！");
  };
  const increaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    // 找出該商品目前數量
    const item = cartItems.find((item) => item.id === productId);
    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(productId); // 數量是1，呼叫刪除函式
    } else {
      // 數量大於1，正常減少
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    const confirmDelete = window.confirm("確定要刪除這個商品嗎？");
    if (!confirmDelete) return; // 使用者取消，直接回傳
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // 移除數量為 0 的商品

    setCartItems(updatedCart);
  };

  // 計算總價
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]); // 清空狀態
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotalPrice,
        getTotalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
