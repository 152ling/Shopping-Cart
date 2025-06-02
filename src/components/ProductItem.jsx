// 單一商品元件
// src/components/ProductItem.js
import React from "react";
import { Link } from "react-router-dom";
function ProductItem({ product, onToggleFavorite, isFavorite }) {
  return (
    <li className="justify-right flex flex-col">
      <div className="product-info items-center bg-white rounded">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt="測試圖片"
            className="w-full h-32 object-cover"
          />
        </Link>
        <Link to={`/product/${product.id}`} className="text-left ">
          <h3 className="mt-2 pl-1 text-base font-semibold">{product.name}</h3>
          <p className="text-red-600 pl-1 font-bold">NT${product.price}</p>
        </Link>
        <button
          className={`text-xl px-2 py-1 rounded material-icons ${
            isFavorite ? "text-red-600" : "text-gray-400 hover:text-pink-400"
          }`}
          onClick={() => onToggleFavorite(product)}
        >
          {isFavorite ? "favorite" : "favorite_border"}
        </button>
      </div>
    </li>
  );
}

export default ProductItem;
