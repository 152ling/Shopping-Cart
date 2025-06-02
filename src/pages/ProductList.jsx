// 商品列表元件
import React, { useState, useEffect } from "react";
//import "./ProductList.css";
import ProductItem from "../components/ProductItem";

function ProductList({ products, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const handleSearch = () => {
    const keyword = searchTerm.trim().toLowerCase();
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );
    setFilteredProducts(result);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const [favorites, setFavorites] = useState([]);

  // 載入 localStorage 中的收藏
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (product) => {
    let updated;
    if (favorites.find((item) => item.id === product.id)) {
      updated = favorites.filter((item) => item.id !== product.id);
    } else {
      updated = [...favorites, product];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen py-2 mx-auto bg-[#f2f2f2]">
      {/* <h2 className="font-bold text-center text-2xl">商品列表</h2> */}
      <div className="flex justify-center mb-4 gap-2 mx-auto">
        <input
          type="text"
          placeholder="輸入商品名稱搜尋"
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 rounded px-3 py-1 w-[70vw]"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-teal-800 hover:bg-teal-900 text-white rounded w-[15vw] "
        >
          搜尋
        </button>
      </div>
      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-[90%] mx-auto  pb-[100px]">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.some((item) => item.id === product.id)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">找不到相關商品</p>
      )}
    </div>
  );
}

export default ProductList;
