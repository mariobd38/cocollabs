"use client"

import { useUser } from '@clerk/nextjs'
import React from 'react';
import PageLayout from '@/components/page-layout';


export default function Home() {
  const { user } = useUser();

  // const [dbUser, setDbUser] = React.useState<User | null>(null);


  return (
    <>
      <PageLayout header='Dashboard'>
          <div className="flex justify-between">
            
          </div>
      </PageLayout>
    </>
  );
}
