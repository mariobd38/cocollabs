"use client"

import PageLayout from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

export default function Integrations() {
  const { resolvedTheme } = useTheme();
  const [imageSrc, setImageSrc] = React.useState('/github_light.svg');
  
  React.useEffect(() => {
    setImageSrc(resolvedTheme==='light' ? '/github_dark.svg' : '/github_light.svg');
  },[resolvedTheme])

  return (
    <PageLayout header='Integrations' options={
        <>
        <Button className='h-8'>hey</Button>
        </>
    }>
      <div className="flex flex-col gap-3">
        <h1 className="text-base font-medium">Code providers</h1>
        <Card className="w-60 h-44 flex justify-center py-10 gap-4">
        <CardHeader className="flex justify-center">
          <Image src={imageSrc} alt="Github" width={48} height={48} />
        </CardHeader>
        <CardContent className="flex justify-center">
          <p className="font-[]">GitHub</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className='w-3/5'>Connect</Button>
        </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
}
