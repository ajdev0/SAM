import React, { useEffect, useState } from "react";
import { useAuthId, useAuthToken } from "./useLocalStorage";

const useSegments = () => {
  const [segments, setSegments] = useState([]);
  const [id] = useAuthId();
  const [token] = useAuthToken();

  //get all segments
  const getAllSegments = () => {
    try {
      const res = axios.get(`/api/segment/${id}`, {
        headers: {
          "snap-access-token": token,
        },
      });
      setSegments(res.data?.segments);
    } catch (error) {
      console.log(error);
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
