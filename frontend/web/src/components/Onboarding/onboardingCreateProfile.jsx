import React, {useState} from 'react';

import { Text,Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Icons } from '@/components/icons/icons';
import OnboardingProfileModal from '@/components/Onboarding/OnboardingProfileModal/onboardingProfileModal';

const initialColorSwatchList = [
    { color: "#414141", active: true },
    { color: "#767e86", active: false },
    { color: "#fa5252", active: false },
    { color: "#d63970", active: false },
    { color: "#be4bdb", active: false },
    { color: "#8960f2", active: false },
    { color: "#4c6ef5", active: false },
    { color: "#228be6", active: false },
    { color: "#15aabf", active: false },
    { color: "#12b886", active: false },
    { color: "#40c057", active: false },
    { color: "#82c91e", active: false },
    { color: "#fab005", active: false },
    { color: "#fd7e14", active: false },
]

const OnboardingCreateProfile = (props) => {
    const {picture,initials,fullName,setSelectedProfile,profileOptions,setProfileOptions,missingProfileError,setMissingProfileError} = props;

    const [modalOpened, { open, close }] = useDisclosure(false);
    const [colorSwatchList, setColorSwatchList] = useState(initialColorSwatchList);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeFile, setActiveFile] = useState(null);
    const [customizedProfileColor, setCustomizedProfileColor] = useState("#414141");

    const onOpen = () => {
        open();
        setMissingProfileError(false);
        if (activeFile != null) {
            const activeSwatch = colorSwatchList.find(swatch => swatch.active);
            if (!activeSwatch) {
                const newColor = colorSwatchList.length > 0 && colorSwatchList[0].color;
                listUpdate(newColor, colorSwatchList);
            }
        }
    };

    const handleAvatarClick = (index) => {

        const updatedProfileOptions = profileOptions.map((item, i) => ({
            ...item,
            option: (
                <Avatar className='onboarding-new-profile-parent'
                        style={{ backgroundColor: item.color && item.color, 
                            backgroundImage: item.avatarType === 'default' ? `url(${picture})` : (item.avatarType === 'image' ? `url(${item.thumbUrl})` : 'none'),
                            backgroundSize: 'cover', overflow: "visible" }}>
                    
                    {/* <span className='onboarding-new-profile'>{(i !== 0 && item.avatarType === 'color') && initials}</span> */}
                    <span className='onboarding-new-profile'>{(item.avatarType === 'color') && initials}</span>
                    {i === index && (
                        <div className="onboarding-profile-selected">
                            <div className='onboarding-profile-selected-icon'>

                                {Icons('IconCheck', 20,20, '#fafafa')}
                            </div>
                        </div>
                    )}
                </Avatar>
            )
        }));
        setSelectedProfile(profileOptions[index]);
        setProfileOptions(updatedProfileOptions);
    };

    const listUpdate = (color, list) => {
        setCustomizedProfileColor(color);
        const updatedColorSwatchList = list.map((swatch) =>
            swatch.color === color ? { ...swatch, active: true } : { ...swatch, active: false }
        );

        setColorSwatchList(updatedColorSwatchList);
    }

    return (
        <div className='py-0 flex flex-col justify-center m-auto' style={{width: "80%"}}>
            {/* <Text fw={700} fz={20} c='#4a4b4d' ta='center' pt={20} tt='uppercase' ff='Nunito Sans'>Select a profile avatar</Text> */}

            <div className={`flex w-full flex-wrap justify-center ${profileOptions.length !== 0 && 'gap-5'}`}>
                <div className='d-flex flex-col align-items-center'>
                    <span className='flex gap-5 flex-wrap justify-center'>
                        
                        {profileOptions.map((item, index) => (
                                
                                <div key={index} className='onboarding-profile-options-parent d-flex align-items-center flex-column m-auto'
                                    style={{transform: hoveredIndex === index ? "translateY(-12.5px)" : "translateY(0px)", transition: "transform 0.5s ease"}} 
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => handleAvatarClick(index)}
                                >
                                    
                                    <div
                                        className='d-flex flex-column align-items-center'
                                        style={{
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                        }}
                                    >
                                        
                                        <span>{item.option}</span>
                                        <Text c='#343639' ta='center' ff='Lato' fw={600} fz='19' pt='10' className='text-name'>{fullName}</Text>
                                    </div>
                                </div>
                        ))}
                    </span>
                </div>
                <div className='d-flex align-items-center py-5'>

                    <div className='d-flex flex-column align-items-center'>
                        {colorSwatchList.length > 0 && 
                        <span className='d-flex align-items-center'>
                            <div className='d-flex flex-column align-items-center'>
                                <span className='onboarding-add-new-profile-button' onClick={onOpen}>
                                    {Icons('IconPlus', 40, 40)}
                                </span>
                            </div>
                        </span>
                        }

                        <OnboardingProfileModal 
                            opened={modalOpened}
                            close={close}
                            initials={initials}
                            setProfileOptions={setProfileOptions}
                            activeFile={activeFile}
                            setActiveFile={setActiveFile}
                            customizedProfileColor={customizedProfileColor}
                            setCustomizedProfileColor={setCustomizedProfileColor}
                            colorSwatchList={colorSwatchList}
                            setColorSwatchList={setColorSwatchList}
                            setSelectedProfile={setSelectedProfile}
                            picture={picture}
                        />

                    </div>
                </div>
            </div>
            { missingProfileError && <Text ta='center' pt={15} c='#dc3838' ff='Lato'>Please select a profile before continuing.</Text> }
        </div>
    );
};

export default OnboardingCreateProfile;