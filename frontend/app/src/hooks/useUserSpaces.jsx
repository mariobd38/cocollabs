import { useState, useEffect } from 'react';

import { getAllUserSpacesInfo } from '@/api/spaces/getAllUserSpaces';

export const useUserSpaces = () => {
  const [userSpaces, setUserSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSpaces = async () => {
      try {
        setIsLoading(true);
        const data = await getAllUserSpacesInfo();
        setUserSpaces(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSpaces();
  }, []);

  return { userSpaces, isLoading, error };
};