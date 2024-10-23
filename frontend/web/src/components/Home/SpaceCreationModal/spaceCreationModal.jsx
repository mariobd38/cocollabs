import React, { useState, useRef, useEffect } from 'react';
// import { Butt,ColorInput,Group,ColorSwatch } from '@mantine/core';

import {Icons} from '../../icons/icons';

import { Text,Button,Textarea,Box,Flex,Divider,TextInput,Grid,Radio, Group,Stack,Avatar } from '@mantine/core';

import { Modal } from "antd";
import SpaceCreationIconsPopover from './spaceCreationIconsPopover';
import { createSpaceInfo } from '../../../DataManagement/Spaces/createSpace';
// import { linkTasksToPersonalSpace } from '../../../DataManagement/Spaces/linkTasksToPersonalSpace';

import classes from './spaceCreationModal.module.css';
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
        <Radio.Card className={classes.root} radius="md" value={item.name} key={item.name} >
            <Group wrap="nowrap" align="flex-start">
                <Radio.Indicator />
                <div>
                    <Text className={classes.label} c={colorScheme === 'dark' ? '#ececec' : '#3a3a3a'}>{item.name}</Text>
                    <Text className={classes.description} c={colorScheme === 'dark' ? '#c3c3c3' : '#696969'}>{item.description}</Text>
                </div>
            </Group>
        </Radio.Card>
    ));

    const generateJsonSpaceIcon = () => {
        const spaceIconProps = spaceIcon.props;
        // console.log(spaceIcon);
        return {
            background: spaceIconProps.bg,
            color: spaceIconProps.color,
            radius: spaceIconProps.radius,
            // width: spaceIconProps.w,
            children: spaceIconProps.children.props || spaceIconProps.children
        }
    }

    const handleSpaceCreation = async () => {
        try {
            const spaceIconJson = generateJsonSpaceIcon();
            console.log(JSON.stringify(spaceIconJson,null, 2));
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
    
    return (
        <Modal styles={{ body: { backgroundColor: themeColors.bg[1]} }} open={openSpaceCreateModal} onCancel={() => {setOpenSpaceCreateModal(false) }} className='space-creation-modal' width={650} >
            
            <div style={{margin: "auto",width: "100%"}}>
                
                <Box p='30px 35px' w='100%'>
                    <Box mb={24}>
                        <Text fw={600} c={themeColors.text[2]} fz='20'>Create a space</Text>
                    </Box>
                    {/* <Button onClick={personalSpaceCreation}>click</Button> */}

                    <Flex gap={24} direction='column'>

                        <Grid grow>
                            <Grid.Col span={2}>
                                <label className='space-creation-input-field-label' style={{color: themeColors.text[3]}}>Icon</label>

                                <Flex align='flex-start' justify='center' h='50' direction='column' >
                                    <SpaceCreationIconsPopover 
                                        color={color}
                                        setColor={setColor}
                                        spaceIcon={spaceIcon}
                                        setSpaceIcon={setSpaceIcon}
                                        firstLetter={firstLetter}
                                    />
                                </Flex>
                            </Grid.Col>

                            <Grid.Col span={10} >
                                <Flex direction='column'>
                                    <label className='space-creation-input-field-label' style={{color: themeColors.text[3]}}>Name</label>
                                    
                                    <TextInput
                                        placeholder='e.g. Development, Design, Machine Learning'
                                        type="text"
                                        autoComplete='off'
                                        className={`space-creation-input-field ${colorScheme}`}
                                        bg='transparent'
                                        size="lg"
                                        radius="md"
                                        value={spaceName}
                                        onChange={(event) => {
                                            setSpaceName(event.currentTarget.value);
                                        }}
                                    />
                                </Flex> 

                            </Grid.Col>
                        </Grid>


                        <Textarea
                            label={
                                <span>
                                    Description <span style={{ fontWeight: "400", fontSize: "12.8px", color: `${colorScheme==='dark' ? '#c8c8c8' : '#686868'}` }}>(Optional)</span>
                                </span>
                            }
                            placeholder=''
                            autoComplete='off'
                            className={`space-creation-input-field ${colorScheme}`}
                            style={{color: themeColors.text[3]}}
                            type="text"
                            radius={0}
                            p={0}
                            variant="filled"
                            m={0}
                            w='100%'
                            minRows={1}
                            autosize
                            value={spaceDescription}
                            onChange={(event) => {
                                setSpaceDescription(event.currentTarget.value);
                            }}
                        />

                        <Flex direction='column'>
                            
                            <>
                                <Radio.Group
                                    value={spaceVisibility}
                                    onChange={setSpaceVisibility}
                                    label={ <label className='space-creation-input-field-label' style={{color: themeColors.text[3]}}>Visibility</label> }
                                    // description="Choose a package that you will need in your application"
                                >
                                    <Stack gap={0} className='space-creation-visibility-radio-stack'>
                                        {cards}
                                    </Stack>
                                </Radio.Group>
                            </>
                        </Flex> 
                    </Flex>
    
                </Box>
                <Divider size={1} color='#57585a'/>
                <div style={{margin: "auto",width: "100%"}}>
                    <Box p='13px 20px' w='100%'>
                        <Flex justify='end' align='center'>
                            <Button disabled={spaceNameDisabled} bd={`1px solid ${spaceNameDisabled ? '#434446 ' : '#048369'}`} onClick={handleSpaceCreation}
                            className={`${spaceName && 'task-card-create-task-button'}`} radius={8} p='0px 12px' c={spaceNameDisabled ? '#838486 ' : '#fafafa'} bg={spaceNameDisabled ? '#434446 ' : '#048369'} >
                                <div className='d-flex align-items-center'>
                                    <div style={{marginRight: "5px"}}>
                                        {Icons('IconPlus',14,14)}
                                    </div>
                                    <span>Create</span>
                                </div>
                            </Button>
                        </Flex>
                    </Box>
                </div>
            </div>
        </Modal>
    );
};

export default SpaceCreationModal;