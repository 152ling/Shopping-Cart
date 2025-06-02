import React, { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">我的收藏</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">目前沒有收藏任何商品</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div>
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">NT${item.price}</p>
              </div>
              <button
                onClick={() => removeFavorite(item.id)}
                className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
              >
                移除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
