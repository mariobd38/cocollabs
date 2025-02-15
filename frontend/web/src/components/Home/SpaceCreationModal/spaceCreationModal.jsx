import React, { useState, useRef, useEffect } from 'react';

import { Avatar,Flex } from '@mantine/core';

import { Icons } from '@/components/icons/icons';
import { IconsFilled } from '@/components/icons/iconsFilled';

import SpaceCreationIconsPopover from '@/components/Home/SpaceCreationModal/spaceCreationIconsPopover';

import { Button } from "@/components/ui/button"
import { DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { createSpaceInfo } from '@/api/Spaces/createSpace';
import { generateSpaceIconJson } from '@/utils/generateSpaceIconJson';
// import { linkTasksToPersonalSpace } from '../../../DataManagement/Spaces/linkTasksToPersonalSpace';

import './spaceCreationModal.css';

const visibilityOptions = [
    { name: 'Private', icon: 'IconLock', description: 'Space is accessible to invited members only.' },
    { name: 'Public', icon: 'IconUsersGroup', description: 'Anyone can request or be invited to join this space.' },
    // { name: 'Global', description: 'Space is accessible to you and anyone.' },
];

const SpaceContent = ({tabChange, description, content, buttonInfo,spaceData}) => {

    const handleSpaceCreation = async () => {
        try {
            const newSpace = createSpaceInfo(spaceData);
            // setOpenSpaceCreateModal(false);
    
        } catch (error) {
            console.error("Error creating space:", error);
        }
    };

    return <div className={`${tabChange && 'animate-fade-left'}`}>
        <DialogHeader>
            <VisuallyHidden.Root><DialogTitle>Create space</DialogTitle></VisuallyHidden.Root>
            <DialogDescription className='text-center'>
                {description}
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 px-4 pt-4 pb-0">
            {content}
            <DialogFooter>
                <Button onClick={handleSpaceCreation} className="size-auto px-3 text-[#fafafa] bg-teal-600" disabled={buttonInfo.isDisabled} variant="default">{buttonInfo.text}</Button>
            </DialogFooter>
        </div>
    </div>;
}
const profileSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mantine-scale')) || 1;
const size = 3 * 0.5 * profileSize * 16;

const SpaceCreationModal = (props) => {
    const { openSpaceCreateModal,setOpenSpaceCreateModal,userFullName,colorScheme,setOpenIconPopover } = props;

    const [spaceName, setSpaceName] = useState('');
    const [createSpaceSlug, setCreateSpaceSlug] = useState('');
    const [joinSpaceSlug, setJoinSpaceSlug] = useState('');
    // const firstLetter = userFullName.substring(0, 1).toUpperCase();
    const [color, setColor] = useState('#848484');
    // TODO radius='calc(0.25rem * 1)'
    
    const [spaceIcon, setSpaceIcon] = useState(<Avatar bg={color} variant='light' radius='calc(0.25rem * 1)' >
        {IconsFilled('IconUserFilled', size, size, '#fafafa')}</Avatar>);
    // const [spaceDescription, setSpaceDescription] = useState('');
    const textareaRef = useRef(null);
    // const spaceNameDisabled = spaceName.trim() === '';
    const [spaceVisibility, setSpaceVisibility] = useState('Private');
    const [tabChange,setTabChange] = useState(false);

    useEffect(() => {
        if (openSpaceCreateModal && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.focus(); // Focus the textarea
            textarea.setSelectionRange(textarea.value.length, textarea.value.length); // Set cursor to the end
        }
    }, [openSpaceCreateModal]);

    const getSanitizedUrl = (url) => {
        return url.toLowerCase()
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    // const personalSpaceCreation = async () => {
    //     try {
    //         const spaceIconJson = {
    //             background: '#156abf1a',
    //             color: '#156abf',
    //             radius: 'calc(0.25rem * 1)',
    //             children: firstLetter
    //         };
    //         const newSpace = linkTasksToPersonalSpace(
    //             'Personal Space :)',
    //             'This is my personal workspace.. made by me',
    //             spaceIconJson,
    //             'PERSONAL'
    //         );
    //         setOpenSpaceCreateModal(false);
    
    //     } catch (error) {
    //         console.error("Error creating task:", error);
    //     }
    // };

    const createContent = <SpaceContent 
        tabChange={tabChange}
        description='Organize, collaborate, and share resources within your workspace.'
        content={
            <>
            <div className="flex flex-col gap-2.5">
                <Label htmlFor="icon">
                    Icon & Name
                </Label>
                <div className='flex items-center gap-3'>

                    <SpaceCreationIconsPopover 
                        color={color}
                        setColor={setColor}
                        spaceIcon={spaceIcon}
                        setSpaceIcon={setSpaceIcon}
                        colorMode={colorScheme}
                        setOpenIconPopover={setOpenIconPopover}
                    />
                    <Input
                        id="name"
                        defaultValue=""
                        autoComplete='off'
                        placeholder={`${userFullName.split(' ')[0]}'s ML space, RepoCentral, etc.. `} 
                        type='text'
                        value={spaceName}
                        onChange={(e) => {
                            const updatedName = e.target.value;
                            setSpaceName(updatedName);

                            setCreateSpaceSlug(getSanitizedUrl(updatedName));
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <Label htmlFor="url">
                    URL
                </Label>
                
                <div className='relative'>
                    <div className='absolute z-10 top-2.5 left-4 text-sm text-muted-foreground'>
                        cocollabs.dev/
                    </div>
                    <Input
                        id="url"
                        autoComplete='off'
                        className="!pl-[6.9rem] !pb-[0.52rem] text-sm"
                        type='text'
                        value={createSpaceSlug}
                        onChange={(e) => {
                            const updatedName = e.target.value;
                            setCreateSpaceSlug(getSanitizedUrl(updatedName));
                        }}
                    />

                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <Label htmlFor="visibility">
                    Visibility
                </Label>
                <RadioGroup 
                    id="visibility" 
                    className="col-span-3" 
                    value={spaceVisibility} 
                    onValueChange={(value) => setSpaceVisibility(value)}
                >
                    <div className='flex flex-col justify-between gap-5' >
                        {visibilityOptions.map((option, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col p-3 gap-2 rounded-md border hover:bg-zinc-800 cursor-pointer"
                                onClick={() => setSpaceVisibility(option.name)}
                            >
                                <div className='flex items-center'>
                                    <RadioGroupItem value={option.name} id={option.name} />
                                    <Label htmlFor={option.name} className="ml-2 font-bold flex items-center gap-1.5">
                                        {Icons(option.icon,15,15)}
                                        {option.name}
                                    </Label>
                                </div>
                                <div className="flex items-center pl-[26px]">
                                    
                                    <p className="text-xs text-muted-foreground">{option.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RadioGroup>
            </div>
            </>
        }
        buttonInfo={{text: 'Create space', isDisabled: !(createSpaceSlug && spaceName)}}
        spaceData={{name:spaceName, slug: createSpaceSlug, icon: generateSpaceIconJson(spaceIcon), visibility: spaceVisibility.toUpperCase()}}
    />

    const joinContent = <SpaceContent 
        tabChange={tabChange}
        description='Organize, collaborate, and share resources within your workspace.'
        content={
            <>
            <div className="flex flex-col gap-2.5">
                <Label htmlFor="url">
                    URL
                </Label>
                
                <div className='col-span-3 relative'>
                    <div className='absolute top-2.5 left-4 text-sm text-muted-foreground'>
                        cocollabs.dev/
                    </div>
                    <Input
                        id="url"
                        autoComplete='off'
                        className="!pl-[6.9rem] !pb-[0.52rem] text-sm"
                        type='text'
                        value={joinSpaceSlug}
                        onChange={(e) => {
                            const updatedName = e.target.value;
                            setJoinSpaceSlug(updatedName.replace(/\s+/g, '-'));
                        }}
                    />

                </div>
            </div>
            </>
        }
        buttonInfo={{text: 'Request to join', isDisabled: !joinSpaceSlug}}
        spaceData={{url: joinSpaceSlug}}
    />

    return (
        <Tabs defaultValue="create" onValueChange={() => setTabChange(true)} className="gap-2 font-['Inter']">
            <div className='flex justify-center'>
                <TabsList className="flex gap-2">
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="join">Join</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="create" className='pt-2'>
                {createContent}
            </TabsContent>

            <TabsContent value="join" className='pt-2'>
                {joinContent}
            </TabsContent>
        </Tabs>
    );
};

export default SpaceCreationModal;