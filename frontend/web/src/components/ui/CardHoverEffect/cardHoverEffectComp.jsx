import React from 'react';

import integration from '@/assets/illustrations/landing/integration.svg';
import apis from '@/assets/illustrations/landing/apis.svg';
import thoughts from '@/assets/illustrations/landing/thoughts.svg';
import community from '@/assets/illustrations/landing/community.svg';

import { HoverEffect } from "@/components/ui/CardHoverEffect/card-hover-effect";
 
export function CardHoverEffectComp() {
    const projects = [
        {
            title: "Meet endless developer communities",
            illustration: community,
            description:
                "Join a diverse range of developer communities where you can collaborate, share knowledge, and network with like-minded professionals.",
            link: "https://stripe.com",
        },
        {
            title: "Build your dream project idea with AI",
            illustration: thoughts,
            description:
                "Leverage powerful AI tools to bring your project ideas to life, enhancing productivity and creativity with cutting-edge technology.",
            link: "https://netflix.com",
        },
        {
            title: "Connect with your favorite integrations",
            illustration: integration,
            description:
                "Seamlessly integrate with popular tools like GitHub, Jira, and Slack to streamline your workflow and supercharge your project management.",
            link: "https://google.com",
        },
        {
            title: "Discover trending APIs and more..",
            illustration: apis,
            description:
                "Explore the latest and most popular APIs, libraries, and tools that can help you build faster, smarter, and more efficiently.",
            link: "https://meta.com",
        },
        // {
        //     title: "Amazon",
        //     description:
        //         "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        //     link: "https://amazon.com",
        // },
        // {
        //     title: "Microsoft",
        //     description:
        //         "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
        //     link: "https://microsoft.com",
        // },
    ];

    return (
        <div className="max-w-5xl mx-auto ">
            <HoverEffect items={projects} />
        </div>
    );
}
