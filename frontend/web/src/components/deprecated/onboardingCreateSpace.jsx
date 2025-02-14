import React from 'react';

import {Text,Flex,TextInput,Textarea} from '@mantine/core';

import SpaceCreationIconsPopover from '@/components/Home/SpaceCreationModal/spaceCreationIconsPopover';

const OnboardingCreateSpace = (props) => {
    const {color, setColor,spaceIcon,setSpaceIcon,firstLetter,spaceName,setSpaceName,spaceDescription, setSpaceDescription,
        missingSpaceNameError,setMissingSpaceNameError} = props;

    return (
        <>
            <Flex justify='center' direction='column' gap={35} m='auto'>
                {/* <Grid> */}
                {/* <Grid.Col span={12} > */}
                <Flex  w='100%' m='auto' justify='center'>
                    <Flex w={{ base: '100%', sm: '60%' }} direction='column' align='flex-start'>
                        <Text className='space-creation-input-field-label' fz={15} pb={4} c='#252525'>Icon</Text>
                        <SpaceCreationIconsPopover 
                        color={color}
                        setColor={setColor}
                        spaceIcon={spaceIcon}
                        setSpaceIcon={setSpaceIcon}
                        firstLetter={firstLetter}
                        colorMode='light'
                    />
                    </Flex>

                </Flex>
                <Flex  w='100%' m='auto' justify='center'>
                    <Flex w={{ base: '100%', sm: '60%' }} direction='column' align='flex-start'>
                        <Text className='space-creation-input-field-label' fz={15} pb={4} c='#252525'>Name</Text>
                        <TextInput
                            placeholder='Select a name for your workspace'
                            defaultValue='Personal workspace'
                            type="text"
                            autoComplete='off'
                            className='space-creation-input-field onboarding-input'
                            bg='transparent'
                            size="lg"
                            radius="md"
                            w='100%'
                            value={spaceName}
                            onChange={(event) => {
                                const val = event.currentTarget.value;
                                if (val.trim() !== '' && missingSpaceNameError)
                                    setMissingSpaceNameError(false);
                                setSpaceName(val);
                            }}
                        />
                    </Flex>
                </Flex>
                <Flex  w='100%' m='auto' justify='center'>
                    <Flex w={{ base: '100%', sm: '60%' }} direction='column' align='flex-start'>
                        <Text className='space-creation-input-field-label' fz={15} pb={4} c='#252525'>
                            Description
                            <span style={{ paddingLeft: "4px", fontWeight: "400", fontSize: "12.8px", color: '#686868' }}>(Optional)</span>
                        </Text>
                        <Textarea
                            placeholder=''
                            autoComplete='off'
                            className='space-creation-input-field'
                            // style={{color: themeColors.text[3]}}
                            type="text"
                            radius={0}
                            p={0}
                            variant="filled"
                            m={0}
                            w='100%'
                            minRows={2}
                            autosize
                            value={spaceDescription}
                            onChange={(event) => {
                                setSpaceDescription(event.currentTarget.value);
                            }}
                        />
                    </Flex>
                </Flex>
            </Flex>
            { missingSpaceNameError && <Text ta='center' pt={15} c='#dc3838' ff='Lato'>Please specify a space name before continuing.</Text> }
        </>
    );
};

export default OnboardingCreateSpace;