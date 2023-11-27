// Custom Fetch hook with axios

import React, { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  // after the first render, fetch our data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Append endpoint to the URL if provided
        const apiUrl = options.endpoint ? `${url}/${options.endpoint}` : url;
        const axiosResponse = await axios.get(apiUrl);
        setResponse(axiosResponse.data); // Set only response.data
      } catch (error) {
        setError(error);
      }
      setIsloading(false);
    };
    fetchData();
  }, [url]);

  return { error, response, isLoading };
};
