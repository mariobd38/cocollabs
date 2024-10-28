import React, { useState } from 'react';


import {Avatar,Text,Button,Modal,Group,ColorSwatch,Divider} from '@mantine/core';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import {Icons} from '../../icons/icons';

import './onboardingProfileModal.css';

const OnboardingProfileModal = (props) => {
    const { opened,close, initials, setProfileOptions, activeFile, setActiveFile, customizedProfileColor, setCustomizedProfileColor,
        colorSwatchList, setColorSwatchList, setSelectedProfile, picture
     } = props;

    //upload
    const [fileList, setFileList] = useState([]);

    const handleSavedProfile = () => {
        return prevOptions => {
            const newProfileOption = {
                option: (
                    <Avatar className='onboarding-new-profile-parent'
                            style={{ backgroundColor: customizedProfileColor && customizedProfileColor, overflow: "visible" }}>
                        <span className='onboarding-new-profile'>
                            {customizedProfileColor ? initials : <img src={activeFile.thumbUrl} alt="file" style={{ width: "6rem", height: "6rem", borderRadius: "50%" }} />} 
                        </span>
                        <div className="onboarding-profile-selected">
                            <div className="onboarding-profile-selected-icon">
                                {Icons('IconCheck',24,24,'#fafafa')}
                            </div>
                        </div>
                    </Avatar>
                ),
                text: null, 
                color: customizedProfileColor, 
                avatarType: customizedProfileColor ? 'color' : 'image',
                thumbUrl: activeFile ? activeFile.thumbUrl : null, file: activeFile
            };
            setSelectedProfile(newProfileOption);

            const removeSelectedState = profileOption => ({
                ...profileOption,
                option: (
                    <Avatar className='onboarding-new-profile-parent'
                            style={{ backgroundColor: profileOption.color, overflow: "visible" }}>
                        <span className='onboarding-new-profile'>
                            {profileOption.avatarType === 'color' ? initials : <img src={picture} alt="file" style={{ width: "7rem", height: "7rem", borderRadius: "50%" }} />} 
                        </span>
                    </Avatar>
                )
            });
    
            if (!Array.isArray(prevOptions)) {
                if (prevOptions.avatarType === 'default') {
                    return [prevOptions, newProfileOption];
                } else {
                    return [newProfileOption];
                }
            }
    
            const isDefaultProfile = prevOptions.length === 0 || prevOptions[prevOptions.length - 1].avatarType === 'default';
    
            if (isDefaultProfile) {
                return [...prevOptions.map(removeSelectedState), newProfileOption];
            } else {
                return [
                    ...prevOptions.slice(0, prevOptions.length - 1).map(removeSelectedState),
                    newProfileOption
                ];
            }
        };
        setSelectedProfile()
    }

    const handleSaveProfile = () => {
        const saved = handleSavedProfile();
        setProfileOptions(saved);

        if (!customizedProfileColor) {
            const updatedFileList = fileList.filter(file => file.uid !== activeFile.uid);
            setFileList(updatedFileList);
        }

        setSelectedProfile(saved);
        close();
    }

    const onChange = ({ fileList: newFileList }) => {
        const updatedFileList = newFileList.map(file => {
            if (!file.thumbUrl && file.originFileObj) {
              file.thumbUrl = URL.createObjectURL(file.originFileObj);
            }
            return file;
        });
        setFileList(updatedFileList);
    };

    const onPreview = (index) => {
        const allItems = document.querySelectorAll('.ant-upload-list-item');
        allItems.forEach(item => item.classList.remove('selected'));

        colorSwatchList.forEach((item, i) => { item.active = false; });
        setCustomizedProfileColor(null);
        if (fileList[index]) {
            setActiveFile(fileList[index]);
        }
        
        allItems[index].classList.add('selected');
    };

    const onRemove = (index) => {
        if (activeFile && (activeFile.uid === fileList[index].uid)) {
            setActiveFile(null);
            const newColor = colorSwatchList.length > 0 && colorSwatchList[0].color;
            listUpdate(newColor, colorSwatchList);
        }
    }

    const handleColorClick = (color) => {
        listUpdate(color, colorSwatchList);
    };

    const listUpdate = (color, list) => {
        setCustomizedProfileColor(color);
        const updatedColorSwatchList = list.map((swatch) =>
            swatch.color === color ? { ...swatch, active: true } : { ...swatch, active: false }
        );

        setColorSwatchList(updatedColorSwatchList);
    }

    return (
        <Modal  styles={{body: {backgroundColor: "#fafafa" }, header: {backgroundColor: "#fafafa"}}}
        removeScrollProps={{ allowPinchZoom: true }} size='lg' opened={opened} onClose={close} className='onboarding-modal' title="Profile Picker" centered radius={12}>
            <div className='d-flex flex-column'>
                <div className='d-flex justify-content-center pt-2 pb-4'>
                    <span className='onboarding-customize-profile' style={{background: customizedProfileColor ? customizedProfileColor : '' }}>
                        {customizedProfileColor ? initials : <img src={activeFile.thumbUrl} alt="main-profile" style={{width: "7rem", height:"7rem", borderRadius: "50%"}}/>} 
                    </span>
                </div>

                <div className='d-flex justify-content-between'>
                    <div>
                        <Text fw={500} fz={17} c='#303030' pb={10}>Select an avatar color</Text>

                        <div className="d-flex justify-content-start pt-2">
                            <Group gap={15}>
                                {colorSwatchList.map((item) => (
                                    <div key={item.color} onClick={() => handleColorClick(item.color)}
                                        className={`onboarding-color-swatch-highlight ${!item.active && 'notActive'} `} 
                                        style={{borderColor: item.active ? item.color : 'white', cursor: item.active ? 'default' : 'pointer'}}>

                                        <ColorSwatch
                                            className='onboarding-color-swatch'
                                            color={item.color}
                                        >
                                            {item.active && Icons('IconCheck', 20, 20, '#fafafa') }
                                        </ColorSwatch>
                                    </div>
                                ))}
                            </Group>
                        </div>

                        <Divider my={20} label='OR'/>
                            
                        <div>
                                    
                            <Text fw={500} fz={17} c='#303030' pb={10} display='flex' justify='start'>Upload an image</Text>

                            <ImgCrop rotationSlider>
                            <Upload
                                    action="/api/upload"
                                    withCredentials={true}
                                    onChange={onChange}
                                    onPreview={(file) => {
                                        const index = fileList.findIndex(f => f.uid === file.uid);
                                        onPreview(index);
                                    }}
                                    listType='picture-card'
                                    defaultFileList={[...fileList]}
                                    showUploadList={{
                                        showPreviewIcon: true,
                                        previewIcon: <div className='fafafa-color'>{Icons('IconCheck', 24, 24)}</div>,
                                        
                                    }}
                                    onRemove={(file) => {
                                        const index = fileList.findIndex(f => f.uid === file.uid);
                                        onRemove(index);
                                    }}
                                    style={{width: "calc(1.95rem * var(--mantine-scale))", height: "calc(1.95rem * var(--mantine-scale))"}}
                                    >

                                    {fileList.length < 4 &&
                                    <div className='onboarding-upload-image-button'>
                                        <div className='upload-icon'>
                                            {Icons('IconCloudUpload', 35,35)}
                                        </div>
                                    </div>
                                    }

                                </Upload>
                            </ImgCrop>
                                    
                        </div>
                    </div>
                </div>

                        
                <div className='d-flex justify-content-end pt-3'>
                    <Button onClick={handleSaveProfile}>Save</Button>
                </div>
                        
            </div>
        </Modal>
    );
};

export default OnboardingProfileModal;