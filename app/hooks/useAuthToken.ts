"use client";
import { useEffect, useState } from "react";

/**
 * Custom hook to access the auth token from localStorage
 * and update the token state when it changes
 */
const useAuthToken = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Update the token state when the "token" key in localStorage changes
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    // Listen for changes to the "token" key in localStorage
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return token;
};

export default useAuthToken;
