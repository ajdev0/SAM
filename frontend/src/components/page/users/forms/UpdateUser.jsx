import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateUser = ({ closeModal, userId }) => {
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  const updateUser = async () => {
    if (userData === "") {
      setError("This field is required");
      return;
    }

    try {
      const res = await axios.put(`/api/users/${userId}`, {
        user_data: userData,
      });
      toast.success(res.data.message);
      closeModal();
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message.toUpperCase());
    }
  };
  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-6">
        <textarea
          name="user_data"
          id=""
          cols="30"
          rows="10"
          onChange={(e) => setUserData(e.target.value)}
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          placeholder="User Data"
        ></textarea>
        {error && (
          <span className="text-xs text-red-500 capitalize px-2">{error}</span>
        )}
        <button type="submit" className="bg-[#ece900] p-4 rounded-md shadow">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
