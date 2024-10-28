import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Icons } from '../icons/icons';

import {
    Text,
    Button,
    Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Steps, theme } from 'antd';

import AuthHeader from '../../../src/components/Auth/authHeader';
import { getUserInfo } from '../../DataManagement/Users/getUserInfo';
import { selectProfile } from '../../DataManagement/Users/selectProfile';
import OnboardingProfileModal from './OnboardingProfileModal/onboardingProfileModal';

import './onboarding.css';

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

const Onboarding = () => {
    const [userInfo, setUserInfo] = useState({ email: '', fullName: '', picture: null, profile: null});
    const navigate = useNavigate();
    
    const [customizedProfileColor, setCustomizedProfileColor] = useState("#414141");
    const [colorSwatchList, setColorSwatchList] = useState(initialColorSwatchList);
    const [opened, { open, close }] = useDisclosure(false);

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const location = useLocation();
    const [picture, setPicture] = useState(location.state && location.state.data.picture ? location.state.data.picture : null);
    const [initials, setInitials] = useState('');
    const [fullName, setFullName] = useState('');
    const [missingProfileErrorText, setMissingProfileErrorText] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setUserInfo(await getUserInfo());
        };
        fetchUserData();
    },[]);

    useEffect(() => {
        if (userInfo.fullName) {
            setFullName(userInfo.fullName);
            const nameParts = userInfo.fullName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
            setInitials(firstName[0] + (lastName[0] || ''));
        }
    }, [userInfo.fullName]);


    useEffect(() => {
        if (location.state && location.state.picture) {
            setPicture(location.state.picture);
        }
    }, [location.state]);

    const listUpdate = (color, list) => {
        setCustomizedProfileColor(color);
        const updatedColorSwatchList = list.map((swatch) =>
            swatch.color === color ? { ...swatch, active: true } : { ...swatch, active: false }
        );

        setColorSwatchList(updatedColorSwatchList);
    }

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const defaultProfileOption = {
        option: (
            <Avatar className='onboarding-new-profile-parent'
                    style={{ backgroundImage: picture ? `url(${picture})` : 'none', backgroundSize: 'cover', overflow: "visible" }}>
                
                <div className="onboarding-profile-selected">
                    <CheckRoundedIcon className="onboarding-profile-selected-icon" />
                </div>
            </Avatar>
        ),
        text: <Text pt={10} fw={500} fz={17}>Default</Text>,
        color: null, avatarType: 'default', thumbUrl: null, file: null
    };

    const onOpen = () => {
        open();
        setMissingProfileErrorText('');
        if (activeFile != null) {
            const activeSwatch = colorSwatchList.find(swatch => swatch.active);
            if (!activeSwatch) {
                const newColor = colorSwatchList.length > 0 && colorSwatchList[0].color;
                listUpdate(newColor, colorSwatchList);
            }
        }
    };

    const [profileOptions, setProfileOptions] = useState(picture ? [defaultProfileOption] : []);
    const [selectedProfile, setSelectedProfile] = useState(picture ? profileOptions[0] : []);
    
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
                            <CheckRoundedIcon className="onboarding-profile-selected-icon" />
                        </div>
                    )}
                </Avatar>
            )
        }));
        setSelectedProfile(profileOptions[index]);
        setProfileOptions(updatedProfileOptions);
    };

    //upload
    const [activeFile, setActiveFile] = useState(null);

    const handleContinueWithProfileAvatar = () => {
        if (selectedProfile.length === 0) {
            setMissingProfileErrorText('Please select a profile before continuing.');
        } else {
            setMissingProfileErrorText('');
            selectProfile(selectedProfile,setUserInfo);
            navigate('/home', { state: { userInfo }});
        }
    }
    //steps
    const steps = [
        {
          title: 'First',
          content: 
          <div className='py-3'>
            <Text fw={700} fz={20} c='#4a4b4d' ta='center' pt={20} tt='uppercase' ff='Nunito Sans'>Select a profile avatar</Text>

            <div className={`d-flex w-100 flex-wrap pt-5 justify-content-center ${profileOptions.length !== 0 && 'gap-5'}`}>
                <div className='d-flex flex-column align-items-center'>
                    <span className='d-flex gap-5 flex-wrap justify-content-center'>
                        
                        {profileOptions.map((item, index) => (
                            // <div  className='onboarding-profile-options-parent-parent'
                            //     >
                                
                                <div key={index} className='onboarding-profile-options-parent d-flex align-items-center flex-column m-auto'
                                    style={{transform: hoveredIndex === index ? "translateY(-12.5px)" : "translateY(0px)", transition: "transform 0.5s ease"}} 
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
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
                                        {/* {item.text} */}
                                        <Text c='#343639' ta='center' ff='Lato' fw='600' fz='19' pt='10' className='text-name'>{fullName}</Text>
                                    </div>
                                </div>
                            // </div>
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
                            opened={opened}
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
            {
                missingProfileErrorText.length > 0 && 
                <Text ta='center' pt={15} c='#dc3838' ff='Lato'>{missingProfileErrorText}</Text>
            }
          </div>,
        },
        // {
        //   title: 'Second',
        //   content: 'Second-content',
        // },
        // {
        //   title: 'Last',
        //   content: 'Last-content',
        // },
    ];

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    // const next = () => {
    //     setCurrent(current + 1);
    // };
    // const prev = () => {
    //     setCurrent(current - 1);
    // };
    // const items = steps.map((item) => ({
    //     key: item.title,
    //     title: item.title,
    // }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div className='w-100' style={{height: "100dvh", background: "#fafafa"}}>
            <AuthHeader />

            <div>
                <div className="py-4 px-5">
                    {/* <Steps current={current} items={items} /> */}
                    <div className='onboarding-steps-inner-content' style={contentStyle}>{steps[current].content}</div>
                    <div className='d-flex gap-3 flex-column justify-content-center align-items-center w-100 pt-5'>
                        <Button className='onboarding-bottom-button' ff='Lato' fz={16} w={300} py={3} radius='md' bg='teal' bd='1.5px solid teal' onClick={handleContinueWithProfileAvatar}>Continue</Button>
                        <Button className='onboarding-bottom-button' ff='Lato' fz={16} w={300} py={3} radius='md' c='#0ca678' bg='#fafafa' bd='1.5px solid teal'>Skip for now</Button>
                    </div>
                    {/* <div
                        style={{
                        marginTop: 24,
                        }}
                    >
                        {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                        )}
                        {current === steps.length - 1 && (
                        <Button type="primary" >
                            Done
                        </Button>
                        )}
                        {current > 0 && (
                        <Button
                            style={{
                            margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;