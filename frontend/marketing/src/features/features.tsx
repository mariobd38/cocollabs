
// import { CardHoverEffectComp } from '@/components/ui/CardHoverEffect/cardHoverEffectComp';
import { HoverEffect } from '@/components/aceternity/card-hover-effect';
import { UsersRound, Brain, Blocks, Code } from 'lucide-react';


const projects = [
    {
        title: "Meet endless developer communities",
        icon: UsersRound,
        iconBg: 'teal',
        description:
            "Join a diverse range of developer communities where you can collaborate, share knowledge, and network with like-minded professionals.",
        link: "https://stripe.com",
    },
    {
        title: "Build your dream project idea with AI",
        icon: Brain,
        iconBg: 'purple',
        description:
            "Leverage powerful AI tools to bring your project ideas to life, enhancing productivity and creativity with cutting-edge technology.",
        link: "https://netflix.com",
    },
    {
        title: "Connect with your favorite integrations",
        icon: Blocks,
        iconBg: 'pink',
        description:
            "Seamlessly integrate with popular tools like GitHub, Jira, and Slack to streamline your workflow and supercharge your project management.",
        link: "https://google.com",
    },
    {
        title: "Discover trending APIs and more..",
        icon: Code,
        iconBg: 'amber',
        description:
            "Explore the latest and most popular APIs, libraries, and tools that can help you build faster, smarter, and more efficiently.",
        link: "https://meta.com",
    },
];

export function Features() {
    return (
        <div className='sm:px-5 lg:px-0 pb-10 md:pt-24 font-["Geist"]'>
            <div className='flex flex-col px-2.5 gap-6 text-center transition-all duration-500 ease'>
                <h1 className='text-3xl font-semibold md:text-4xl'>Your developer journey starts here</h1>
                <h2 className='text-gray-500 text-base md:text-lg'>Explore new opportunities, collaborate with experts, and create impactful projects together</h2>
            </div>
            <div className='px-8 mx-auto'>
                {/* <CardHoverEffectComp /> */}
                <HoverEffect items={projects} />
            </div>
        </div>
    );
}

export default Features;