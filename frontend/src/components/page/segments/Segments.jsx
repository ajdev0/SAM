import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CreateSegment from "./forms/CreateSegment";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuthCode,
  useAuthId,
  useAuthToken,
} from "../../utils/hooks/useLocalStorage";
import useSegments from "../../utils/hooks/useSegments";
import UpdateSegment from "./forms/UpdateSegment";
import AddUsersSegmentForm from "./forms/AddUsersSegment";

const Segments = () => {
  const segments = useSegments();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenU, setIsOpenU] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [accountAd, setAccountAd] = useState("");

  const [token, setToken] = useAuthToken();
  const [code, setCode] = useAuthCode();
  const [id, setId] = useAuthId();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const segmentId = urlParams.get("segment_id");
  const resCode = urlParams.get("code");

  //get and store access token locally
  const getAccessToken = async () => {
    if (resCode !== null) {
      setCode(resCode);
    }
    try {
      const res = await axios.post(`/api/auth/access/${resCode}`);
      console.log(res);
      setToken(res.data.access_token);
      navigate(0);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    if (resCode !== null) {
      getAccessToken();
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const UpdateSegmentView = () => {
    return (
      <Modal isOpen={isOpenU} onClose={() => setIsOpenU(false)}>
        <div className="my-3">Update Segment</div>
        <UpdateSegment closeModal={() => setIsOpenU(false)} />
      </Modal>
    );
  };
  const AddUsersSegment = () => {
    return (
      <Modal isOpen={isOpenUser} onClose={() => setIsOpenUser(false)}>
        <div className="my-3">Add Users To Segment</div>
        <AddUsersSegmentForm
          segmentId={segmentId}
          closeModal={() => setIsOpenUser(false)}
        />
      </Modal>
    );
  };
  return (
    <div className="container mx-auto">
      <UpdateSegmentView />
      <AddUsersSegment />
      <div className="flex justify-between py-6">
        <h1 className="text-2xl font-bold">Segments List</h1>

        <button
          onClick={openModal}
          className="bg-slate-300 shadow-lg rounded-full p-4"
        >
          Create Segment
        </button>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="my-3">Create Segment</div>

          <CreateSegment closeModal={closeModal} />
        </Modal>
      </div>
      {segments.length !== 0 ? (
        <div>
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="text-black">
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Retention Days</th>
                <th className="p-3 text-left">Approx Users</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left" width="200px">
                  Add Users
                </th>
                <th className="p-3 text-left" width="200px">
                  Update
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Retention Days</th>
                <th className="p-3 text-left">Approx Users</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left" width="200px">
                  Add Users
                </th>
                <th className="p-3 text-left" width="200px">
                  Update
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Retention Days</th>
                <th className="p-3 text-left">Approx Users</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left" width="200px">
                  Add Users
                </th>
                <th className="p-3 text-left" width="200px">
                  Update
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Retention Days</th>
                <th className="p-3 text-left">Approx Users</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left" width="200px">
                  Actions
                </th>
                <th className="p-3 text-left" width="200px">
                  Update
                </th>
              </tr>
            </thead>
            {segments.map((segment) => (
              <tbody
                className="flex-1 sm:flex-none text-black"
                key={segment.segment?.id}
              >
                <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {segment.segment?.id}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {segment?.segment?.name}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {segment?.segment?.retention_in_days}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {segment?.segment?.approximate_number_users}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {segment?.segment?.status}
                  </td>

                  <td className="border-grey-light border hover:bg-gray-100 p-3 text-black hover:text-yellow-500 hover:font-medium cursor-pointer">
                    <Link
                      state={segment.segment}
                      onClick={() => {
                        setIsOpenUser(true);
                      }}
                      className="bg-slate-300 shadow-lg rounded p-2"
                    >
                      Add Users
                    </Link>
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 text-black hover:text-yellow-500 hover:font-medium cursor-pointer">
                    <Link
                      state={segment.segment}
                      className="bg-slate-300 shadow-lg rounded p-2"
                      onClick={() => {
                        setIsOpenU(true);
                      }}
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      ) : id === null ? (
        <form className="flex gap-3 items-center justify-center">
          <input
            type="text"
            placeholder="Enter your account ad id"
            className="border border-slate-100 rounded-md p-3 outline-none shadow-sm"
            onChange={(e) => setAccountAd(e.target.value)}
          />
          <button
            onClick={() => {
              setId(accountAd);
              navigate(0);
            }}
            className="px-4 py-3 text-center shadow-md  bg-[#ece900] hover:bg-yellow-200 rounded w-fit"
          >
            Add
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="p-4 text-center shadow-md  bg-[#ece900] hover:bg-yellow-200 rounded w-fit"
          >
            Authenticate First
          </Link>
        </div>
      )}
    </div>
  );
};

export default Segments;
