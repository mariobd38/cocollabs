'use client';

import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { UserProvider } from '@/app/contexts/userContext';

interface PageLayoutProps {
  children: React.ReactNode;
  header: string;
  options: React.ReactNode;
}

export default function PageLayout({ children, header, options }: PageLayoutProps) {
  const [toggle, setToggle] = React.useState(false);
  

  return (
    <div className="flex">
      <div>
          <AppSidebar 
            toggle={toggle}
            setToggle={setToggle}
          />
      </div>
      <div className="w-full bg-muted/20 overflow-y-scroll max-h-screen">
        <div className="flex py-3 px-5 border-b flex justify-between items-center">
          <h1 className="font-semibold">{header}</h1>
          {options}
        </div>
        <div className="p-5">
        {children}
        </div>
      </div>
    </div>
  );
}
