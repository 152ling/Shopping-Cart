// components/Navbar.js
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Navbar({ totalQuantity }) {
  const { user, logout } = useAuth();
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 清空 user
    clearCart(); // 清空購物車
    navigate("/login");
  };
  return (
    <nav
      className="bg-white p-2 flex justify-around fixed bottom-0 w-full"
      style={{
        boxShadow: "0 -4px 5px rgba(0, 0, 0, 0.1)", // 往上偏移
      }}
    >
      <Link to="/" className="flex flex-col text-xs items-center">
        <span class="material-icons material-symbols-outlined">home</span>
        首頁
      </Link>
      <div class="flex">
        <Link
          to="/cart"
          className="relative flex flex-col text-xs items-center"
        >
          <span class="material-icons material-symbols-outlined">
            shopping_cart
          </span>
          購物車
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
      <Link to="/favorites" className="flex flex-col text-xs items-center">
        <span class="material-icons material-symbols-outlined">favorite</span>
        收藏
      </Link>
      <Link to="/profile" className="flex flex-col text-xs items-center">
        <span className="material-icons">account_circle</span>
        個人
      </Link>
    </nav>
  );
}

export default Navbar;
