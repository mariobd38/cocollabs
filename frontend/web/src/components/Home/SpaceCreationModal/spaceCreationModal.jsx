import React, { useState, useRef, useEffect } from 'react';

// import { Text,Textarea,Box,Flex,Divider,TextInput,Grid,Radio, Group,Stack,Avatar } from '@mantine/core';
import { Text,Radio, Group,Avatar } from '@mantine/core';
// import { Modal } from "antd";

// import { Icons } from '@/components/icons/icons';
// import SpaceCreationIconsPopover from '@/components/Home/SpaceCreationModal/spaceCreationIconsPopover';

import { Button } from "@/components/ui/button"
import { DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { createSpaceInfo } from '@/api/Spaces/createSpace';
import { generateSpaceIconJson } from '@/utils/generateSpaceIconJson';
// import { linkTasksToPersonalSpace } from '../../../DataManagement/Spaces/linkTasksToPersonalSpace';

import './spaceCreationModal.css';

const visibilityOptions = [
    { name: 'Private', icon: '', description: 'Space is accessible to invited members only.' },
    { name: 'Public', description: 'Anyone can request to join or be invited to join this space.' },
    // { name: 'Global', description: 'Space is accessible to you and anyone.' },
];

const SpaceCreationModal = (props) => {
    const {openSpaceCreateModal,setOpenSpaceCreateModal,userFullName,themeColors,colorScheme} = props;

    const [spaceName, setSpaceName] = useState('');
    const firstLetter = userFullName.substring(0, 1).toUpperCase(); 
    const [color, setColor] = useState('#ffffff');
    const [spaceIcon, setSpaceIcon] = useState(<Avatar color={color} bg='#343537' radius="md" h='inherit'>{firstLetter}</Avatar>);
    const [spaceDescription, setSpaceDescription] = useState('');
    const textareaRef = useRef(null);
    const spaceNameDisabled = spaceName.trim() === '';

    useEffect(() => {
        if (openSpaceCreateModal && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.focus(); // Focus the textarea
            textarea.setSelectionRange(textarea.value.length, textarea.value.length); // Set cursor to the end
        }
    }, [openSpaceCreateModal]);

    const [spaceVisibility, setSpaceVisibility] = useState('Private');

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

    const createContent = <>
        <DialogHeader>
            <DialogTitle>Create space</DialogTitle>
            <DialogDescription>
                Organize, collaborate, and share resources within your workspace. 
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input
                    id="name"
                    defaultValue=""
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                    URL
                </Label>
                <Input
                    id="url"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                    Icon
                </Label>
                <Input
                    id="icon"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                    Description
                </Label>
                <Textarea className='w-full col-span-3 ' placeholder="Type your message here." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                Username
                </Label>
                <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
                />
            </div>
        </div>
        <DialogFooter>
            <Button type="submit">Create space</Button>
        </DialogFooter>
    </>;


    const joinContent = <>
        <DialogHeader>
            <DialogTitle>Join space</DialogTitle>
            <DialogDescription>
                Organize, collaborate, and share resources within your workspace. 
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                    URL
                </Label>
                <Input
                    id="url"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                Username
                </Label>
                <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
                />
            </div>
        </div>
        <DialogFooter>
            <Button type="submit">Create space</Button>
        </DialogFooter>
    </>;
    
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
        <Tabs defaultValue="create">
            <TabsList>
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="join">Join</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
                {createContent}
            </TabsContent>

            <TabsContent value="join">
                {joinContent}
            </TabsContent>
        </Tabs>
    );
};

export default SpaceCreationModal;