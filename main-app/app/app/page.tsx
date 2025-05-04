"use client"
import { useClerk } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';

export default function Home() {
  const { signOut } = useClerk()
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState<boolean>(false);



  return (
    <>
    <div className='flex'>
      <div>

        <AppSidebar 
          toggle={openSidebarToggle}
          setToggle={setOpenSidebarToggle}
        />
      </div>
      <p>hello world</p>
      <Button onClick={() => signOut({ redirectUrl: '/login' })}>Sign out</Button>

    </div>
    </>
  );
}
