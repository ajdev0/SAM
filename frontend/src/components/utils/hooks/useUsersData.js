import { useEffect, useState } from "react";
import axios from "axios";

const useUsersData = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await axios.get("/api/users");

    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return users;
};

export default useUsersData;
