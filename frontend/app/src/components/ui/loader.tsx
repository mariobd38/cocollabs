import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className='w-full flex justify-center items-center h-screen'>

        <Loader2
          className={cn('my-28 h-20 w-20 text-primary/90 animate-spin', className)}
        />
    </div>
  );
};