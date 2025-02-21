import { useState, useEffect } from 'react';

import { getLastActiveSpaceInfo } from '@/api/spaces/getLastActiveSpace';

export const UseLastActiveSpace = () => {
  const [activeSpaceSlug, setActiveSpaceSlug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSpaces = async () => {
      try {
        setIsLoading(true);
        const data = await getLastActiveSpaceInfo();
        setActiveSpaceSlug(data?.slug || null);
      } catch (err) {
        setError(err);
      } finally {
        if (activeSpaceSlug !== null)
          setIsLoading(false);
      }
    };

    fetchUserSpaces();
  }, [activeSpaceSlug]);

  return { activeSpaceSlug, isLoading, error };
};