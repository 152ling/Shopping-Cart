import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
function ProductDetail({ products }) {
  const navigate = useNavigate();
  const { id } = useParams(); // 取得網址上的商品id
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <div>找不到該商品</div>;
  const { addToCart } = useContext(CartContext); // 使用 context 的方法
  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 left-2 text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
      >
        ← 返回
      </button>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[50vh] object-cover"
      />
      <p className="text-xl text-red-700 font-bold px-1">N${product.price}</p>
      <h2 className="text-m px-1">{product.name}</h2>
      <div className="flex absolute bottom-2 right-2">
        <button
          onClick={() => addToCart(product)}
          className="bg-teal-800 hover:bg-teal-900 text-white px-2 py-1 rounded"
        >
          加入購物車
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
