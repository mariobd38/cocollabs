"use client"

import { permanentRedirect, redirect } from 'next/navigation'
import { useClerk, useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { User } from '@/types/user';
import { Repository } from '@/types/repository';


export default function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState<boolean>(false);
  
  const { user } = useUser();
  const [dbUser, setDbUser] = React.useState<User | null>(null);
  const [dbRepos, setDbRepos] = React.useState<Repository[]>([]);

  React.useEffect(() => {
    console.log(user)
    if (user) {
      fetch(`/api/user/${user.id}`)
        .then(res => res.json())
        .then(data => setDbUser(data));
    }
  }, [user]);

  React.useEffect(() => {
    if (user) {
      fetch(`/api/repositories/${user.id}`)
        .then(res => res.json())
        .then(data => setDbRepos(data.repositories));
    }
  }, [user]);

  const handleInstall = async () => {
    if (!user) return;
    
    // Include the user ID in the state parameter
    // const url = `https://github.com/apps/cocollabs-code-reviewer/installations/new?state=${user.id}`;
    const state = encodeURIComponent(JSON.stringify({ userId: user.id }));
    const url = `https://github.com/apps/${process.env.NEXT_PUBLIC_GITHUB_APP_NAME}/installations/new?state=${state}`;
    window.location.href = url;
  };



  return (
    <>
      <div className='flex'>
        <div>
          <AppSidebar 
            toggle={openSidebarToggle}
            setToggle={setOpenSidebarToggle}
            dbUser={dbUser}
          />
        </div>
        <div className='p-5 w-full'>
          <div className='flex justify-between'>
            <h1 className='text-lg font-medium'>Repositories</h1>
            <Button className='bg-blue-600' onClick={handleInstall}>Add repository</Button>

          </div>
          {dbRepos && 
            <div className='bg-neutral-200 p-4 mt-4 rounded-lg'>
              {dbRepos?.map((repo, index: number) => (
                <div key={index}>
                  <p>{repo.name}</p>
                </div>
              ))}
            </div>}
        </div>

      </div>
    </>
  );
}
