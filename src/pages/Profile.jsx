import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/login");
  };

  // if (!user) {
  //   return (
  //     <div className="text-center mt-10">
  //       <p className="text-xl">請先登入才能查看個人資料。</p>
  //       <button
  //         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //         onClick={() => navigate("/login")}
  //       >
  //         前往登入
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="mx-auto shadow-md bg-[#f2f2f2]">
      <div className="mb-2 p-4 flex items-center gap-2 bg-teal-600">
        <span
          className="material-icons material-icons-outlined fixed right-1 top-2 text-gray-800"
          style={{ fontSize: "18px" }}
        >
          settings
        </span>
        <img
          src="https://placehold.co/10x10"
          alt=""
          className="w-12 h-12 object-cover rounded-[50%]"
        />
        <p className="text-white">{user?.username || "請先登入"}</p>
      </div>
      <div className="ShopingList_nav text-neutral-700 bg-white mx-2 p-1 rounded shadow-md">
        <div className="mb-2 mx-2 flex items-center justify-between">
          <p className="text-sm">購買清單</p>
          <p className="text-sm flex items-center">
            查看全部 <span className="material-icons">chevron_right</span>
          </p>
        </div>
        <div className="mb-4 mx-2 flex items-center justify-around ">
          <p className="flex flex-col items-center text-xs">
            <span className="material-icons">wallet</span>待付款
          </p>
          <p className="flex flex-col items-center text-xs">
            <span className="material-icons material-symbols-outlined">
              trolley
            </span>
            待出貨
          </p>
          <p className="flex flex-col items-center text-xs">
            <span className="material-icons">local_shipping</span>待收貨
          </p>
          <p className="flex flex-col items-center text-xs">
            <span className="material-icons">wallet</span>評價
          </p>
        </div>
      </div>
      <div className="Wallet_nav text-neutral-700  bg-white my-3 mx-2 p-1 rounded shadow-md">
        <div className="mx-2 flex items-center justify-between">
          <p className="text-sm">活動專區</p>
          <p className="text-sm flex items-center">
            查看全部{" "}
            <span className="material-icons text-xl">chevron_right</span>
          </p>
        </div>
        <div className="mb-4 mx-2 flex items-center justify-around ">
          <p className="flex flex-col items-center text-xs">
            <span class="material-icons">calendar_month</span>活動總覽
          </p>
          <p className="flex flex-col items-center text-xs">
            <span class="material-icons material-symbols-outlined">redeem</span>
            優惠卷
          </p>
          <p className="flex flex-col items-center text-xs">
            <span class="material-icons">sell</span>免運卷
          </p>
          <p className="flex flex-col items-center text-xs">
            <span class="material-icons">workspace_premium</span>會員
          </p>
        </div>
      </div>
      {user ? (
        <button
          className="mt-6 w-full bg-teal-800 hover:bg-teal-900 text-white py-2 px-4 rounded"
          onClick={handleLogout}
        >
          登出
        </button>
      ) : (
        <button
          className="mt-6 w-full bg-teal-800 hover:bg-teal-900 text-white py-2 px-4 rounded"
          onClick={() => navigate("/login")}
        >
          登入
        </button>
      )}
    </div>
  );
}
