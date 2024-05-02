import React, { useState } from "react";
import useUsersData from "../../utils/hooks/useUsersData";
import Modal from "../segments/Modal";
import UpdateUser from "./forms/UpdateUser";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useUsersData();
  const [isOpenU, setIsOpenU] = useState(false);

  const UpdateUserView = () => {
    return (
      <Modal isOpen={isOpenU} onClose={() => setIsOpenU(false)}>
        <div className="my-3">Update User</div>
        <UpdateUser closeModal={() => setIsOpenU(false)} />
      </Modal>
    );
  };
  return (
    <div className="container mx-auto">
      <UpdateUserView />
      {users.length !== 0 && (
        <div>
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="text-black">
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Data</th>

                <th className="p-3 text-left" width="200px">
                  Update
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Data</th>

                <th className="p-3 text-left" width="200px">
                  Update
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Data</th>

                <th className="p-3 text-left" width="200px">
                  Update
                </th>
              </tr>
              <tr className="bg-[#ece900]  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Data</th>

                <th className="p-3 text-left" width="200px">
                  Update
                </th>
              </tr>
            </thead>
            {users.map((user) => (
              <tbody className="flex-1 sm:flex-none" key={user?.id}>
                <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {user?.id}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {user?.unhashed_email}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {user?.user_data}
                  </td>

                  <td className="border-grey-light border hover:bg-gray-100 p-3 text-black hover:text-yellow-500 hover:font-medium cursor-pointer">
                    <Link
                      state={user}
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
      )}
    </div>
  );
};

export default Users;
