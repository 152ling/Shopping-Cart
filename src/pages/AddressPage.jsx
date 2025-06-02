import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([]);

  // 初始載入 localStorage 中的地址
  useEffect(() => {
    const stored = localStorage.getItem("userAddresses");
    if (stored) {
      setAddressList(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    if (!name || !phone || !address) {
      alert("請填寫完整資料");
      return;
    }

    const newAddress = { name, phone, address };
    const updatedList = [...addressList, newAddress];
    localStorage.setItem("userAddresses", JSON.stringify(updatedList));
    setAddressList(updatedList);
    setName("");
    setPhone("");
    setAddress("");
  };
  const handleSelect = (item) => {
    localStorage.setItem("selectedAddress", JSON.stringify(item));
    navigate("/checkoutpage");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/checkoutpage")}
          className=" text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
        >
          ←
        </button>
        <h3 className="font-semibold ">收貨地址</h3>
      </div>
      <ul className="mt-2 mb-4 space-y-2">
        {addressList.map((item, index) => (
          <li
            key={index}
            className="border p-2 rounded"
            onClick={() => handleSelect(item)}
          >
            <p>{item.address}</p>
            <div className="flex gap-4 text-xs">
              <p>{item.name}</p>
              <p>{item.phone}</p>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="font-bold ">新增收貨地址</h2>
      <div className="mb-2">
        <label className="block text-sm">姓名</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm">電話</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm">地址</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-teal-600 text-white mb-15 py-2 px-4 rounded hover:bg-teal-700 mt-2 w-full"
      >
        儲存地址
      </button>
    </div>
  );
};

export default AddressPage;
