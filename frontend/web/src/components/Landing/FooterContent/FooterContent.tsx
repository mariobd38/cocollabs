import { Icons } from '@/components/icons/icons';
import { Separator } from '@/components/ui/separator';
import Logo2 from '@/components/Logo/logo2';

const data = [{
        title: 'About',
        links: [
            { label: 'Features', link: '#' },
            { label: 'Pricing', link: '#' },
            { label: 'Support', link: '#' },
            { label: 'Forums', link: '#' },
        ],
    },
    {
        title: 'Project',
        links: [
            { label: 'Contribute', link: '#' },
            { label: 'Media assets', link: '#' },
            { label: 'Changelog', link: '#' },
            { label: 'Releases', link: '#' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'Join Discord', link: '#' },
            { label: 'Follow on Twitter', link: '#' },
            { label: 'Email newsletter', link: '#' },
            { label: 'GitHub discussions', link: '#' },
        ],
}];

export function FooterContent() {
    const groups = data.map((group) => {
        const links = group.links.map((item, index) => (
            <a key={index} href={item.link} className="block text-zinc-400 text-sm py-[3px] hover:underline" onClick={(event) => event.preventDefault()}>{item.label}</a>
        ));
    
        return (
            <div className='max-w-40 mb-10 mx-10' key={group.title}>
                <p className='font-semibold mb-1 text-white/90'>{group.title}</p>
                {links}
            </div>
        );
    });

    return (
        <div className='bg-background pb-5 font-["Geist"]' >
            <div className='flex justify-center'>
                <Separator className=' mb-20 lg:w-[90%] bg-zinc-800' />
            </div>

            <div className='px-10 container mx-auto'>
                <div className='flex flex-col md:flex-row justify-between items-center md:items-start'>
                    <div className='max-w-52'>
                        <Logo2 strokeColor='#d0d0d0' />
                        <p className='text-zinc-400 text-xs mt-3 md:mt-2'>Optimize your developer workflow</p>
                    </div>
                    <div className='flex-wrap hidden md:flex'>{groups}</div>
                </div>

                <div className='flex flex-col lg:flex-row items-center justify-between mt-8 py-8'>
                    <p className='text-zinc-300 text-sm'>
                        © {new Date().getFullYear()} Cocollabs. All rights reserved.
                    </p>

                    <div className='group gap-2 mt-2 lg:mt-0 flex items-center'>
                        <div className='hover:bg-zinc-800/100 h-9 w-9 flex items-center justify-center rounded cursor-pointer'>{Icons('IconBrandX',20,20,'#868e96')}</div>
                        <div className='hover:bg-zinc-800/100 h-9 w-9 flex items-center justify-center rounded cursor-pointer'>{Icons('IconBrandYoutube',20,20,'#868e96')}</div>
                        <div className='hover:bg-zinc-800/100 h-9 w-9 flex items-center justify-center rounded cursor-pointer'>{Icons('IconBrandInstagram',20,20,'#868e96')}</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FooterContent;