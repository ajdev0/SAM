import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import ModalU from "./Modal";
import CreateFegment from "./forms/CreateFegment";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuthCode,
  useAuthId,
  useAuthToken,
} from "../../utils/hooks/useLocalStorage";
import useSegments from "../../utils/hooks/useSegments";
import UpdateFegment from "./forms/UpdateFegment";

const Segments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenU, setIsOpenU] = useState(false);
  const segments = useSegments();
  const [token, setToken] = useAuthToken();
  const [code, setCode] = useAuthCode();
  const [id] = useAuthId();

  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const resCode = urlParams.get("code");
  const segmentId = urlParams.get("segment_id");

  //get and store access token locally
  const getAccessToken = async () => {
    //store code
    if (resCode !== null) {
      setCode(resCode);
    }
    try {
      const res = await axios.post(`/api/auth/access/${code}`);
      setToken(res.access_token);
    } catch (error) {
      if (token === null) {
        navigate("/");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    if (code !== null) {
      getAccessToken();
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const update = (id) => {
    // Getting the current URL
    let currentUrl = window.location.href;

    // Appending the id as a parameter
    currentUrl += `?segment_id=${id}`;

    // Updating the URL
    window.history.pushState({ path: currentUrl }, "", currentUrl);
    setIsOpenU(true);
  };

  const UpdateSegmentV = () => {
    return (
      <ModalU isOpen={isOpenU} onClose={() => setIsOpenU(false)}>
        <UpdateFegment segmentId={segmentId} />
      </ModalU>
    );
  };
  return (
    <div className="container mx-auto">
      <UpdateSegmentV />
      <div className="flex justify-between py-6">
        <h1 className="text-2xl font-bold">Segments List</h1>
        <button
          onClick={openModal}
          className="bg-slate-300 shadow-lg rounded-full p-4"
        >
          Create Segment
        </button>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <CreateFegment closeModal={closeModal} />
        </Modal>
      </div>
      {segments.length !== 0 && (
        <div>
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="text-black">
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Retention Days</th>
                <th className="p-3 text-left">Approx Users</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left" width="110px">
                  Actions
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Retention Days</th>
                <th className="p-3 text-left">Approx Users</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left" width="110px">
                  Actions
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Retention Days</th>
                <th className="p-3 text-left">Approx Users</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left" width="110px">
                  Actions
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Retention Days</th>
                <th className="p-3 text-left">Approx Users</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left" width="110px">
                  Actions
                </th>
              </tr>
            </thead>
            {segments.map((segment) => (
              <tbody className="flex-1 sm:flex-none">
                <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {segment?.id}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {segment?.name}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {segment?.retention_in_days}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {segment?.approximate_number_users}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {segment?.status}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                    <button onClick={() => update(segment?.id)}>Update</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Segments;
