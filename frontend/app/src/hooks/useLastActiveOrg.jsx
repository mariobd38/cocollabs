import { useState, useEffect } from 'react';

import { getLastActiveOrganizationInfo } from '@/api/organizations/getLastActive';

export const UseLastActiveOrganization = () => {
  const [activeOrgSlug, setActiveOrgSlug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrgs = async () => {
      try {
        setIsLoading(true);
        const data = await getLastActiveOrganizationInfo();
        setActiveOrgSlug(data?.slug || null);
      } catch (err) {
        setError(err);
      } finally {
        if (activeOrgSlug !== null)
          setIsLoading(false);
      }
    };

    fetchUserOrgs();
  }, [activeOrgSlug]);

  return { activeOrgSlug, isLoading, error };
};