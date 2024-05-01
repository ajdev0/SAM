import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CreateFegment from "./forms/CreateFegment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Segments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  //store code
  localStorage.setItem("_CODE", JSON.stringify(code));

  //get and store access token locally
  const getAccessToken = async () => {
    const code = JSON.parse(localStorage.getItem("_CODE"));

    try {
      const res = await axios.post(`/api/auth/access/${code}`);
      localStorage.setItem("_TOKEN", JSON.stringify(res.access_token));
    } catch (error) {
      const token = JSON.parse(localStorage.getItem("_TOKEN"));

      if (!token) {
        navigate("/");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    if (code) {
      getAccessToken();
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between p-6">
        <h1>Segments List</h1>
        <button
          onClick={openModal}
          className="bg-slate-300 shadow-sm rounded-full p-4"
        >
          Create Segment
        </button>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <CreateFegment />
        </Modal>
      </div>
    </div>
  );
};

export default Segments;
