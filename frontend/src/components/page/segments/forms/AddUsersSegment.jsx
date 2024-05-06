import React, { useState } from "react";
import { useAuthToken } from "../../../utils/hooks/useLocalStorage";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const AddUsersSegment = ({ closeModal }) => {
  const location = useLocation();
  const state = location.state;

  const [schema, setSchema] = useState("");
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(false);
  //  const [fileContent, setFileContent] = useState(null);

  const [token] = useAuthToken();

  const handleUpload = async () => {
    setLoad(true);
    try {
      const fileData = new FormData();
      fileData.append("file", file);

      const res = await axios.post("/api/users/upload", fileData);

      return res.data;
    } catch (error) {
      console.log(error);
      setLoad(false);
      // Handle error
    }
  };

  const addUsersSegment = async () => {
    setLoad(true);
    if (schema === "") {
      setErrors("Upload Type is required");
      setLoad(false);
      return;
    }
    const fileContent = await handleUpload();
    try {
      const res = await axios.post(
        `/api/segment/add_users/${state.id}`,
        {
          schema,
          data: fileContent,
        },
        {
          headers: {
            "snap-access-token": token,
          },
        }
      );
      //console.log(res.data);
      if (res.data.request_status === "SUCCESS") {
        closeModal();
        setLoad(false);
        // console.log(res.data.request_status);
      }
      toast.success(res.data.request_status);
    } catch (error) {
      console.log(error);
      //toast.error(error.response.data.message.toUpperCase());
    } finally {
      setLoad(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setErrors("No file selected.");
      return;
    }
    addUsersSegment();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <select
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          onChange={(e) => setSchema(e.target.value)}
        >
          <option value="">Upload Type</option>
          <option value="EMAIL_SHA256">EMAIL_SHA256</option>
        </select>

        <input
          type="file"
          name="file"
          placeholder="Name"
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {errors && (
          <span className="text-xs text-red-500 capitalize px-2">{errors}</span>
        )}

        <button
          type="submit"
          disabled={load} // Disable the button while processing
          className={`bg-[#ece900] hover:bg-yellow-300 p-4 rounded-md shadow ${
            load ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {load ? "Loading" : "Add Users to Segment"}
        </button>
      </form>
    </div>
  );
};

export default AddUsersSegment;
