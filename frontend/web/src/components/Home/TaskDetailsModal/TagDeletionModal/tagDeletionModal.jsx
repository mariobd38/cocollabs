import React from 'react';

import { Modal } from 'antd';
import { Text, Flex, Box,Button,Divider } from '@mantine/core';
import {Icons} from '../../../icons/icons';

import './tagDeletionModal.css';

const TagDeletionModal = (props) => {
    const { show,handleClose,handleConfirmDeleteTagButtonClick,tagName } = props;

    return (
        <Modal centered open={show} onHide={handleClose} onCancel={handleClose} className='tag-deletion-modal'>
            <div style={{padding: '12px 24px'}}>
                <Flex align='center' justify='space-between'>
                <Text ff='Inter' ta='center' fz='19'>Delete tag?</Text>
                    <Box onClick={handleClose} bg='transparent' p='2px 4px' className='delete-tag-button' style={{borderRadius: "4px", cursor: "pointer"}}>
                        {Icons('IconX',22,22)}
                    </Box>
                </Flex>
            </div>

            <Divider bd='.1px solid #57585a'/>

            <div style={{padding: '20px 24px'}}>
                <Flex>
                    <Text ff='Inter' fz='15' pt='10' pb='20' m='auto'>&quot;{tagName}&quot; will be deleted everywhere in this space</Text>
                </Flex>

                <Flex justify='end' pt='20' gap={25}>
                    <Button w={80} ff='Inter' bg='#353738' c='#fafafa' bd='.1px solid #959799' onClick={handleClose}>Cancel</Button>
                    <Button w={80} ff='Inter' bg='#d63434' c='#fafafa' bd='.1px solid #ef4444' onClick={() => {handleConfirmDeleteTagButtonClick(); handleClose();}} >Delete</Button>
                </Flex>
            </div>
        </Modal>
    );
};

export default TagDeletionModal;