// pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      alert("登入成功！");
      navigate("/");
    } else {
      alert("帳號或密碼錯誤！");
    }
  };

  return (
    <div className="bg-[#f2f2f2] h-screen">
      <h2 class="text-center text-2xl pt-4">登入</h2>
      <div class="w-full max-w-xs m-auto">
        <form
          onSubmit={handleLogin}
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
          <div class="flex flex-col items-center">
            <button
              class="w-60 bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              登入
            </button>
            <button
              class="w-60 mt-2 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => navigate("/register")}
            >
              註冊
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-teal-600 hover:text-teal-700"
              href="#"
            >
              Forgot Password?
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              開發用 前往首頁
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
