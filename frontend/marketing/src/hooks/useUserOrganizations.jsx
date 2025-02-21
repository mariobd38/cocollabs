import { useState, useEffect } from 'react';

import { getAllUserOrganizationsInfo } from '@/api/organizations/getAllUserOrganizations';

export const useUserOrganizations = () => {
  const [userOrganizations, setUserOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrganizations = async () => {
      try {
        setIsLoading(true);
        const data = await getAllUserOrganizationsInfo();
        setUserOrganizations(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOrganizations();
  }, []);

  return { userOrganizations, isLoading, error };
};