import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthToken } from "../../../utils/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const CreateSegment = ({ closeModal }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    retention_in_days: "",
    ad_account_id: "",
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

  const createSegmet = async () => {
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("/api/segment/create", formData, {
        headers: {
          "snap-access-token": token,
        },
      });
      console.log(res);
      navigate(0);
      //  console.log(formData.ad_account_id);

      toast.success(res.data.request_status);
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message.request_status);
    }
  };
  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    createSegmet();
  };
  return (
    <div className="overflow-scroll ">
      <ToastContainer />

      <form onSubmit={handleSubmit} className=" flex flex-col gap-6">
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

        <input
          type="text"
          name="ad_account_id"
          placeholder="Ad Account ID"
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          value={formData.ad_account_id}
          onChange={handleChange}
        />
        {errors.ad_account_id && (
          <span className="text-xs text-red-500 capitalize px-2">
            {errors.ad_account_id}
          </span>
        )}

        <button type="submit" className="bg-[#ece900] p-4 rounded-md shadow">
          Create Segment
        </button>
      </form>
    </div>
  );
};

export default CreateSegment;
