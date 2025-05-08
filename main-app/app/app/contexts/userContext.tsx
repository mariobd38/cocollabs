"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
import { User } from '@/types/user';


type UserContextType = {
  dbUser: User | null;
  setDbUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  error: Error | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only fetch if we have a user ID and haven't fetched yet
    if (user?.id && !dbUser && !isLoading) {
      setIsLoading(true);
      
      fetch(`/api/user/${user.id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }
          return res.json();
        })
        .then(data => {
          setDbUser(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, [user, dbUser, isLoading]);

  return (
    <UserContext.Provider value={{ dbUser, setDbUser, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useDbUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useDbUser must be used within a UserProvider');
  }
  return context;
};