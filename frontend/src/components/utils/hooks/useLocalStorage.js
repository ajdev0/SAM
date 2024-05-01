import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const useAuthToken = () => {
  const [token, setToken] = useLocalStorage("_TOKEN", null);
  return [token, setToken];
};

const useAuthCode = () => {
  const [code, setCode] = useLocalStorage("_CODE", null);
  return [code, setCode];
};

const useAuthId = () => {
  const [id, setId] = useLocalStorage("_ADID", null);
  return [id, setId];
};

export { useAuthToken, useAuthCode, useAuthId };
