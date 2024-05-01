import React, { useState } from "react";
import { useAuthToken } from "../../../utils/hooks/useLocalStorage";
import axios from "axios";
import { toast } from "react-toastify";

const AddUsersFegment = ({ segmentId }) => {
  const [schema, setSchema] = useState("");
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [token] = useAuthToken();
  const handleUplaod = async () => {
    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const res = await axios.post("/api/users/upload", fileData);
      setFileContent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addUsersSegmet = async () => {
    if (schema === "") {
      setErrors("Upload Type is required");
    }

    try {
      const res = await axios.put(
        `/api/segment/add_users/${segmentId}`,
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
      console.log(res.request_status);
      toast(res.data.request_status);
      closeModal();
    } catch (error) {
      console.log(error);
      //toast.error(error.response.data.message.toUpperCase());
    }
  };
  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setErrors("No file selected.");
      return;
    }
    handleUplaod();
    if (fileContent !== null) {
      addUsersSegmet();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-6">
        <select
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          onChange={(e) => setSchema(e.target.value)}
        >
          <option value="" selected>
            Upload Type
          </option>
          <option value="EMAIL_SHA256">EMAIL_SHA256</option>
        </select>

        <input
          type="file"
          name="file"
          placeholder="Name"
          className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
          //  value={formData.file}

          onChange={(e) => setFile(e.target.files[0])}
        />
        {errors && (
          <span className="text-xs text-red-500 capitalize px-2">{errors}</span>
        )}

        <button type="submit" className="bg-[#ece900] p-4 rounded-md shadow">
          Add Users to Segment
        </button>
      </form>
    </div>
  );
};

export default AddUsersFegment;
