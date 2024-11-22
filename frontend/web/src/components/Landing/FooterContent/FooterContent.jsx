import React from 'react';

import { Text, Container, ActionIcon, Group,Divider,Box,Flex } from '@mantine/core';

import { Icons } from '@/components/icons/icons';
import Logo2 from '@/components/Logo/logo2';

import classes from './FooterLinks.module.css';
import './FooterContent.css';

const data = [
        {
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
        },
    
    ];

export function FooterContent() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));
    
        return (
            <div className={`${classes.wrapper}`} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <Box className={classes.footer}>
            {/* <Divider pt={40} bd='1px solid #303030'/> */}
            <Flex justify='center'>

            <Divider mx='10' mb={80}  orientation="vertical" m='auto' w={{base: '100%', md: '90%'}}  size='xs'  style={{borderRadius: "10px"}}  bd='.5px solid #202038'/>
            </Flex>

            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Logo2 strokeColor='#d0d0d0' />
                    <Text size="xs" c="#696969" className={classes.description}>
                        Optimize your developer workflow
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>

            <Container className={classes.afterFooter}>
                <Text c="gray" size="sm">
                    © 2024 Cocollabs. All rights reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        {Icons('IconBrandTwitter',18,18,'#868e96')}
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                      {Icons('IconBrandYoutube',18,18,'#868e96')}
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                      {Icons('IconBrandInstagram',18,18,'#868e96')}
                    </ActionIcon>
                </Group>
            </Container>
        </Box>
    );
}

export default FooterContent;