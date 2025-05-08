"use client"

import { useClerk, useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { User } from '@/types/user';
import { Repository } from '@/types/repository';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useTheme } from 'next-themes';


export default function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState<boolean>(false);
  
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  const [dbUser, setDbUser] = React.useState<User | null>(null);
  const [dbRepos, setDbRepos] = React.useState<Repository[] | null>(null);

  React.useEffect(() => {
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
    const state = encodeURIComponent(JSON.stringify({ userId: user.id }));
    window.location.href = `https://github.com/apps/${process.env.NEXT_PUBLIC_GITHUB_APP_NAME}/installations/new?state=${state}`;
  };

  const [imageSrc, setImageSrc] = React.useState('/github_light.svg');
  React.useEffect(() => {

    setImageSrc(resolvedTheme==='light' ? '/github_dark.svg' : '/github_light.svg');
  },[resolvedTheme])


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
        <div className=' w-full bg-muted/20 overflow-y-scroll max-h-screen'>
          <div className='flex py-3 px-5 border-b '>
              <h1 className='font-semibold'>Dashboard</h1>
          </div>
          <div className='p-5'>

            <div className='flex justify-between'>
              <h1 className='text-lg font-medium'>Repositories</h1>
              <Button className='bg-blue-600' onClick={handleInstall}>
                {dbRepos && dbRepos.length > 0 ? 'Manage repositories' : 'Add respositories'}
              </Button>

            </div>
            {(dbRepos ?? []).length > 0 && 
              <div className='bg-neutral-200 dark:bg-neutral-900/80 p-4 mt-4 rounded-lg'>
                {dbRepos?.map((repo, index: number) => (
                  <div key={index}>
                    <p>{repo.name}</p>
                  </div>
                ))}
              </div>}

              <div className='flex flex-col gap-4'>
                <h1 className='text-lg font-medium'>Integrations</h1>
                <Card className='w-56 h-44 flex justify-center py-10 gap-4'>
                  <CardHeader className='flex justify-center'>
                    {/* <Image src={resolvedTheme==='light' ? "/github_dark.svg" : "/github_light.svg"} alt="Github" width={48} height={48} /> */}
                    <Image src={imageSrc} alt="Github" width={48} height={48} />
                  </CardHeader>
                  <CardContent className='flex justify-center'>
                    <p className='font-[]'>GitHub</p>
                  </CardContent>
                  <CardFooter className='flex justify-center'>
                    <Button>Connect</Button>
                  </CardFooter>
                </Card>

              </div>
          </div>
        </div>
      </div>
    </>
  );
}
