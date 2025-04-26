import Logo from '@/assets/logo';

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

export function LandingFooter() {
    const groups = data.map((group) => {
        const links = group.links.map((item, index) => (
            <a key={index} href={item.link} className="block text-gray-400 text-sm py-[3px] hover:underline" onClick={(event) => event.preventDefault()}>{item.label}</a>
        ));
    
        return (
            <div className='max-w-40 mb-10 mx-10' key={group.title}>
                <p className='font-semibold mb-1 text-white/90'>{group.title}</p>
                {links}
            </div>
        );
    });

    return (
        <footer className="w-full border-t bg-white py-6 font-['Geist']">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
            <div className="flex items-center gap-2">
                <div className="w-32">
                    <Logo />
                </div>
            </div>
            <p className="text-center text-sm text-gray-500 md:text-left">
                © {new Date().getFullYear()} Cocollabs Platform. All rights reserved.
            </p>
            <div className="flex gap-4">
                <a href="/#" className="text-sm text-gray-500 hover:text-gray-900">
                Terms
                </a>
                <a href="/#" className="text-sm text-gray-500 hover:text-gray-900">
                Privacy
                </a>
                <a href="/#" className="text-sm text-gray-500 hover:text-gray-900">
                Contact
                </a>
            </div>
            </div>
        </footer>
    );
}

export default LandingFooter;