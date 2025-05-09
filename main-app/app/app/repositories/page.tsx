"use client"

import PageLayout from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Repository } from '@/types/repository';
import { useUser } from '@clerk/nextjs';
import { Badge } from "@/components/ui/badge";
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

export default function Repositories() {
  const [dbRepos, setDbRepos] = React.useState<Repository[] | null>(null);
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  const [imageSrc, setImageSrc] = React.useState('/github_dark.svg');
  
  React.useEffect(() => {
    setImageSrc(resolvedTheme==='light' ? '/github_light.svg' : '/github_dark.svg');
  },[resolvedTheme])
  console.log(dbRepos)


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

  return (
    <PageLayout header='Repositories' options={
      <div>
        <Button className='h-8' onClick={handleInstall}>
        <Image src={imageSrc} alt="Github" width={18} height={18} />
           Manage</Button>
      </div>
    }>
      <div className="flex flex-col gap-4">
        {(dbRepos ?? []).length > 0 && 
          <div className='p-4 rounded-lg'>
            {dbRepos?.map((repo, index: number) => (
              <div key={index} className='flex flex-col border-b py-2'>
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-5'>
                    <h1>{repo.name}</h1>
                    <Badge variant="outline" className='bg-blue-200 dark:bg-blue-400/80'>
                      {repo.private ? 'Private' : 'Public'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {repo.languages.slice(0, 2).map((lang) => (
                      <Badge key={lang.name} variant="outline">
                        {lang.name}
                      </Badge>
                    ))}

                    {repo.languages.length > 2 && (
                      <Badge variant="outline">
                        +{repo.languages.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>}
      </div>
    </PageLayout>
  );
}
