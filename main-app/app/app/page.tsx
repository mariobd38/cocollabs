"use client"

import { permanentRedirect, redirect } from 'next/navigation'
import { useClerk, useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { User } from '@/types/user';


export default function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState<boolean>(false);
  
  const { user } = useUser();
  const [dbUser, setDbUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    console.log(user)
    if (user) {
      fetch(`/api/user/${user.id}`)
        .then(res => res.json())
        .then(data => setDbUser(data));
    }
  }, [user]);



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
            <Button className='bg-blue-600' onClick={() =>  window.location.href = `https://github.com/apps/cocollabs-code-reviewer`}>Add repository</Button>

          </div>
        </div>

      </div>
    </>
  );
}
