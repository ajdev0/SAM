import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthId, useAuthToken } from "../../../utils/hooks/useLocalStorage";
import { useLocation } from "react-router-dom";

const UpdateSegment = ({ closeModal }) => {
  const location = useLocation();
  const state = location.state;

  const [formData, setFormData] = useState({
    id: state.id,
    name: state.name,
    description: state.description,
    retention_in_days: state.retention_in_days,
  });
  const [errors, setErrors] = useState({});
  const [token] = useAuthToken();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Validate form fields
  const validationErrors = {};
  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      validationErrors[key] = `${key.replace("_", " ")} is required`;
    }
  });

  const updateSegmet = async () => {
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.put(
        `/api/segment/update/${state.ad_account_id}`,
        formData,
        {
          headers: {
            "snap-access-token": token,
          },
        }
      );
      console.log(res);
      // toast(res.data.request_status);
      closeModal();
    } catch (error) {
      console.log(error);
      //console.log(error.response.data.message);
      // toast.error(error.response.data.message.request_status);
    }
  };
  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSegmet();
  };
  return (
    <div className="overflow-scroll ">
      <ToastContainer />

      <form onSubmit={handleSubmit} className=" flex flex-col gap-6">
        <input
          type="text"
          name="id"
          placeholder="ID"
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          value={formData.id}
          readOnly
          disabled
          onChange={handleChange}
        />
        {errors.id && (
          <span className="text-xs text-red-500 capitalize px-2">
            {errors.id}
          </span>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="text-xs text-red-500 capitalize px-2">
            {errors.name}
          </span>
        )}

        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <span className="text-xs text-red-500 capitalize px-2">
            {errors.description}
          </span>
        )}

        <input
          type="number"
          name="retention_in_days"
          placeholder="Retention in Days"
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          value={formData.retention_in_days}
          onChange={handleChange}
        />
        {errors.retention_in_days && (
          <span className="text-xs text-red-500 capitalize px-2">
            {errors.retention_in_days}
          </span>
        )}

        <button type="submit" className="bg-[#ece900] p-4 rounded-md shadow">
          Update Segment
        </button>
      </form>
    </div>
  );
};

export default UpdateSegment;
