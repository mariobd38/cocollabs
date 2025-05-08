"use client"

import PageLayout from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Repository } from '@/types/repository';
import { useUser } from '@clerk/nextjs';
import { Divide, Plus } from 'lucide-react';
import React from 'react';

export default function Repositories() {
  const [dbRepos, setDbRepos] = React.useState<Repository[] | null>(null);
  const { user } = useUser();
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
        <Button className='h-8' onClick={handleInstall}><Plus /> Add repo</Button>
      </div>
    }>
      <div className="flex flex-col gap-4">
        {(dbRepos ?? []).length > 0 && (
          <div className="bg-neutral-200 dark:bg-neutral-900/80 p-4  rounded-lg">
          {(dbRepos ?? []).length > 0 && 
            <div className='bg-neutral-200 dark:bg-neutral-900/80 p-4 rounded-lg'>
            {dbRepos?.map((repo, index: number) => (
              <div key={index}>
                <p>{repo.name}</p>
              </div>
            ))}
            </div>}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
