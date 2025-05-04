"use client"
import { useClerk, useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { PrismaClient } from '@prisma/client';
import { User } from '@/types/user';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const { signOut } = useClerk()
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
      <div className='px-5'>
        <h1 className='text-lg'>Integrations</h1>
        <Button onClick={()  => signOut({ redirectUrl: '/login' })}>Sign out</Button>
      </div>

    </div>
    </>
  );
}
