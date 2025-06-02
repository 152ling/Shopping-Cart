// 購物車中的單一商品元件
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
function CartItem({ product }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  return (
    <li className="flex items-center p-4 border-b max-w-[90%] m-auto">
      <div className="product-info flex justify-between items-center w-full m-auto">
        <Link
          to={`/product/${product.id}`}
          className="flex items-center align-middle justify-start"
        >
          <img
            src={product.image}
            alt="測試圖片"
            className="w-[50px] object-cover mr-1 rounded"
          />
          {/* //</Link> */}
          {/* //<Link to={`/product/${product.id}`} className="text-right ml-2"> */}
          <div className="flex flex-col">
            <p>{product.name}</p>
            <p>NT${product.price}</p>
          </div>
        </Link>

        <div className="flex justify-end">
          <button
            className="text-xl w-6 h-6 bg-gray-200 rounded"
            onClick={() => decreaseQuantity(product.id)}
          >
            <span class="material-icons">remove</span>
          </button>
          <span className="mx-2">{product.quantity}</span>
          <button
            className="text-xl w-6 h-6 bg-teal-800 rounded"
            onClick={() => increaseQuantity(product.id)}
          >
            <span class="material-icons text-white">add</span>
          </button>
        </div>
      </div>
    </li>
  );
}
export default CartItem;
