// pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== checkpassword) {
      alert("兩次密碼不一致");
      return;
    }
    const success = register(username, password);
    if (success) {
      alert("註冊成功！");
      navigate("/"); // 可改跳 /login
    } else {
      alert("帳號已存在！");
    }
  };

  return (
    <div className="bg-[#f2f2f2] h-screen">
      <button
        onClick={() => navigate("/login")}
        className="absolute top-2 left-2 text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
      >
        ← 返回
      </button>
      <h2 class="text-center text-2xl pt-4">註冊</h2>
      <div class="w-full max-w-xs m-auto">
        <form
          onSubmit={handleRegister}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="帳號"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              確認密碼
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="check_password"
              type="check_password"
              placeholder="再次輸入密碼"
              value={checkpassword}
              onChange={(e) => {
                const value = e.target.value;
                setCheckPassword(value);
                if (value !== password) {
                  setError("兩次密碼輸入不一致");
                } else {
                  setError("");
                }
              }}
              required
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div class="flex flex-col items-center">
            <button
              class="w-60 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              註冊
            </button>
            <p>
              已有帳號?
              <span
                class="inline-block align-baseline font-bold text-sm text-teal-600 hover:text-teal-800"
                onClick={() => navigate("/login")}
              >
                前往登入
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
