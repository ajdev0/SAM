import React, { useEffect, useState } from "react";
import { useAuthId, useAuthToken } from "./useLocalStorage";
import axios from "axios";

const useSegments = () => {
  const [segments, setSegments] = useState([]);
  const [id] = useAuthId();
  const [token] = useAuthToken();

  const getAllSegments = async () => {
    try {
      const res = await axios.get(`/api/segment/${id}`, {
        headers: {
          "snap-access-token": token,
        },
      });
      //      console.log(res);
      setSegments(res.data?.segments);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (id !== null && token !== null) {
      getAllSegments();
    }
  }, []);
  return segments;
};

export default useSegments;
