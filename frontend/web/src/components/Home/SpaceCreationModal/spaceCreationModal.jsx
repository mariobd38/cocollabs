import React, { useState, useRef, useEffect } from 'react';

// import { Text,Textarea,Box,Flex,Divider,TextInput,Grid,Radio, Group,Stack,Avatar } from '@mantine/core';
import { Text,Radio,Group,Avatar,Flex,Box } from '@mantine/core';
// import { Modal } from "antd";

// import { Icons } from '@/components/icons/icons';
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
    { name: 'Private', description: 'Space is accessible to invited members only.' },
    { name: 'Public', description: 'Anyone can request to join or be invited to join this space.' },
    // { name: 'Global', description: 'Space is accessible to you and anyone.' },
];

const SpaceContent = ({tabChange, description, content, buttonText}) => {
    return (<Box ff='Inter' className={`${tabChange && 'animate-fade-left'}`}>
        <DialogHeader>
            <VisuallyHidden.Root><DialogTitle>Create space</DialogTitle></VisuallyHidden.Root>
            <DialogDescription>
                {description}
            </DialogDescription>
        </DialogHeader>
        <Flex className="grid gap-4 px-4 pt-4 pb-0">
            {content}
            <DialogFooter>
                {/* <Button type="submit">{type} space</Button> */}
                <Button className="size-auto px-3"  variant="default">{buttonText}</Button>
            </DialogFooter>
        </Flex>
    </Box>);
}

const SpaceCreationModal = (props) => {
    const { openSpaceCreateModal,setOpenSpaceCreateModal,userFullName,colorScheme,setOpenIconPopover } = props;

    const [spaceName, setSpaceName] = useState('');
    const [spaceUrl, setSpaceUrl] = useState('');
    const firstLetter = userFullName.substring(0, 1).toUpperCase();
    const [color, setColor] = useState('#ffffff');
    // TODO
    const [spaceIcon, setSpaceIcon] = useState(<Avatar color={color} radius='calc(0.25rem * 1)' className='placeholder:italic'>
        {firstLetter}</Avatar>);
    const [spaceDescription, setSpaceDescription] = useState('');
    const textareaRef = useRef(null);
    const spaceNameDisabled = spaceName.trim() === '';
    const [spaceVisibility, setSpaceVisibility] = useState('Private');
    const [tabChange,setTabChange] = useState(false);

    useEffect(() => {
        if (openSpaceCreateModal && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.focus(); // Focus the textarea
            textarea.setSelectionRange(textarea.value.length, textarea.value.length); // Set cursor to the end
        }
    }, [openSpaceCreateModal]);


    const cards = visibilityOptions.map((item) => (
        <Radio.Card bg='transparent' bd='none' pos='relative' p='10px 0' radius="md" value={item.name} key={item.name} >
            <Group wrap="nowrap" align="flex-start">
                <Radio.Indicator />
                <div>
                    <Text fw='bold' ff='Inter' fz={14} lh={1.2} c={colorScheme === 'dark' ? '#e5e5e5' : '#3a3a3a'}>{item.name}</Text>
                    <Text mt={8} fz={12} c={colorScheme === 'dark' ? '#c3c3c3' : '#696969'}>{item.description}</Text>
                </div>
            </Group>
        </Radio.Card>
    ));

    const handleSpaceCreation = async () => {
        try {
            const spaceIconJson = generateSpaceIconJson(spaceIcon);
            const newSpace = createSpaceInfo(
                spaceName,
                spaceDescription,
                spaceIconJson,
                spaceVisibility
            );
            setOpenSpaceCreateModal(false);
    
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

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
            <Flex direction='column' className="gap-2.5">
                <Label htmlFor="icon">
                    Icon & Name
                </Label>
                <Flex items='center' className='gap-3 '>

                    <SpaceCreationIconsPopover 
                        color={color}
                        setColor={setColor}
                        spaceIcon={spaceIcon}
                        setSpaceIcon={setSpaceIcon}
                        firstLetter={firstLetter}
                        colorMode={colorScheme}
                        setOpenIconPopover={setOpenIconPopover}
                    />
                    <Input
                        id="name"
                        defaultValue=""
                        autoComplete='off'
                        placeholder="DevNation, RepoCentral, etc.." 
                        type='text'
                        value={spaceName}
                        onChange={(e) => {
                            const updatedName = e.target.value;
                            setSpaceName(e.currentTarget.value);
                            const sanitizedUrl = updatedName
                                .toLowerCase()
                                .replace(/[^a-zA-Z0-9\s-]/g, '')
                                .replace(/\s+/g, '-')
                                .replace(/-+/g, '-');

                            setSpaceUrl(sanitizedUrl);
                        }}
                    />
                </Flex>
            </Flex>
            <Flex direction='column' className="gap-2.5">
                <Label htmlFor="url">
                    URL
                </Label>
                
                <div className='col-span-3 relative'>
                    <div className='absolute top-2.5 left-4 text-sm text-muted-foreground'>
                        cocollabs.dev/
                    </div>
                    <Input
                        id="url"
                        defaultValue="Pedro Duarte"
                        autoComplete='off'
                        className="!pl-[6.9rem] !pb-[0.52rem] text-sm"
                        type='text'
                        value={spaceUrl}
                        onChange={(e) => {
                            const updatedName = e.target.value;
                            setSpaceUrl(updatedName.replace(/\s+/g, '-'));
                        }}
                    />

                </div>
            </Flex>
            {/* <Flex direction='column' className="gap-2.5">
                <Label htmlFor="description">
                    Description <span className='text-muted-foreground'>(optional)</span>
                </Label>
                <Textarea placeholder="Briefly describe the purpose of this space.." 
                autoComplete='off'
                type='text'
                value={spaceDescription}
                onChange={(e) => setSpaceDescription(e.currentTarget.value) } />
            </Flex> */}
            <Flex direction='column' className="gap-2.5">
                <Label htmlFor="visibility">
                    Visibility
                </Label>
                <RadioGroup 
                    id="visibility" 
                    className="col-span-3" 
                    value={spaceVisibility} 
                    onValueChange={(value) => setSpaceVisibility(value)}
                >
                    <Flex gap={20} justify="space-between" direction='column'>
                        {visibilityOptions.map((option, index) => (
                            <Flex 
                                direction="column" 
                                key={index} 
                                p={12} 
                                className="gap-2 rounded-md border hover:bg-zinc-800 cursor-pointer"
                                onClick={() => setSpaceVisibility(option.name)}
                            >
                                <Flex align="center">
                                    <RadioGroupItem value={option.name} id={option.name} />
                                    <Label htmlFor={option.name} className="ml-2 font-bold">
                                        {option.name}
                                    </Label>
                                </Flex>
                                <Flex align="center" className="pl-[26px]">
                                    <Text className="text-[12px] text-muted-foreground">
                                        {option.description}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </RadioGroup>
            </Flex>
            </>
        }
        buttonText='Create space'
    />

    const joinContent = <SpaceContent 
        tabChange={tabChange}
        description='Organize, collaborate, and share resources within your workspace.'
        content={
            <>
            <Flex direction='column' className="gap-2.5">
                <Label htmlFor="name">
                    Name
                </Label>
                <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </Flex>
            <Flex direction='column' className="gap-2.5">
                <Label htmlFor="url">
                    URL
                </Label>
                <Input
                    id="url"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </Flex>
            </>
        }
        buttonText='Request to join'
    />

    return (
        // <Modal styles={{ body: { backgroundColor: themeColors.bg[12]} }} open={openSpaceCreateModal} onCancel={() => {setOpenSpaceCreateModal(false) }} className='space-creation-modal' width={650} >
            
        //     <Box m='auto' w='100%' >
                
        //         <Box p='30px 35px' w='100%'>
        //             <Box mb={24}>
        //                 <Text fw={600} c={themeColors.text[2]} fz='20'>Create a space</Text>
        //             </Box>

        //             <Flex gap={24} direction='column'>

        //                 <Grid grow>
        //                     <Grid.Col span={2}>
        //                         <label className='space-creation-input-field-label' style={{color: themeColors.text[3]}}>Icon</label>

        //                         <Flex align='flex-start' justify='center' h='50' direction='column' >
        //                             <SpaceCreationIconsPopover 
        //                                 color={color}
        //                                 setColor={setColor}
        //                                 spaceIcon={spaceIcon}
        //                                 setSpaceIcon={setSpaceIcon}
        //                                 firstLetter={firstLetter}
        //                                 colorMode={colorScheme}
        //                             />
        //                         </Flex>
        //                     </Grid.Col>

        //                     <Grid.Col span={10} >
        //                         <Flex direction='column'>
        //                             <label className='space-creation-input-field-label' style={{color: themeColors.text[3]}}>Name</label>
                                    
        //                             <TextInput
        //                                 placeholder='e.g. Development, Design, Machine Learning'
        //                                 type="text"
        //                                 autoComplete='off'
        //                                 className={`space-creation-input-field ${colorScheme}`}
        //                                 bg='transparent'
        //                                 size="lg"
        //                                 radius="md"
        //                                 value={spaceName}
        //                                 onChange={(event) => {
        //                                     setSpaceName(event.currentTarget.value);
        //                                 }}
        //                             />
        //                         </Flex> 

        //                     </Grid.Col>
        //                 </Grid>


        //                 <Textarea
        //                     label={
        //                         <span>
        //                             Description <span style={{ fontWeight: "400", fontSize: "12.8px", color: `${colorScheme==='dark' ? '#c8c8c8' : '#686868'}` }}>(Optional)</span>
        //                         </span>
        //                     }
        //                     placeholder=''
        //                     autoComplete='off'
        //                     className={`space-creation-input-field ${colorScheme}`}
        //                     c={themeColors.text[3]}
        //                     type="text"
        //                     radius={0}
        //                     p={0}
        //                     variant="filled"
        //                     m={0}
        //                     w='100%'
        //                     minRows={1}
        //                     autosize
        //                     value={spaceDescription}
        //                     onChange={(event) => {
        //                         setSpaceDescription(event.currentTarget.value);
        //                     }}
        //                 />

        //                 <Flex direction='column'>
                            
        //                     <>
        //                         <Radio.Group
        //                             value={spaceVisibility}
        //                             onChange={setSpaceVisibility}
        //                             label={ <label className='space-creation-input-field-label' style={{color: themeColors.text[3]}}>Visibility</label> }
        //                         >
        //                             <Stack gap={0} className='space-creation-visibility-radio-stack'>
        //                                 {cards}
        //                             </Stack>
        //                         </Radio.Group>
        //                     </>
        //                 </Flex> 
        //             </Flex>
    
        //         </Box>
        //         <Divider size={1} color='#57585a'/>
        //         <Box m='auto' w='100%' >
        //             <Box p='13px 20px' w='100%'>
        //                 <Flex justify='end' align='center'>
        //                     <Button disabled={spaceNameDisabled} bd={`1px solid ${spaceNameDisabled ? '#434446 ' : '#048369'}`} onClick={handleSpaceCreation}
        //                     className={`${spaceName && 'task-card-create-task-button'}`} radius={8} p='0px 12px' c={spaceNameDisabled ? '#838486 ' : '#fafafa'} bg={spaceNameDisabled ? '#434446 ' : '#048369'} >
        //                         <Flex align='center'>
        //                             <Box me={5} >
        //                                 {Icons('IconPlus',14,14)}
        //                             </Box>
        //                             <span>Create</span>
        //                         </Flex>
        //                     </Button>
        //                 </Flex>
        //             </Box>
        //         </Box>
        //     </Box>
        // </Modal>

        <Tabs
        defaultValue="create" onValueChange={() => setTabChange(true)}
        className="gap-2"
        >
            <Flex justify='center'>

                <TabsList className="flex gap-2">
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="join">Join</TabsTrigger>
                </TabsList>
            </Flex>
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