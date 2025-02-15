import React, { useEffect,useState } from 'react'

import { Avatar } from '@mantine/core';

import './userAvatar.css'

// import { getAvatars } from '@/utils/getProfileAvatarList';
// const avatarList = getAvatars();

const UserAvatar = (props) => {
    const { userProfileDto, userProfilePicture, multiplier } = props;
    const size = `calc(${multiplier}rem * var(--mantine-scale))`;
    
    const [avatarList, setAvatarList] = useState([]);
    const avatar = userProfileDto.type === 'avatar' ? avatarList.find(avatar => avatar.name === userProfileDto.svg).svg : userProfileDto.preSignedUrl;

    useEffect(() => {
        async function fetchAvatars() {
            const { getAvatars } = await import('@/utils/getProfileAvatarList');
            setAvatarList(getAvatars());
        }

        fetchAvatars();
    }, []);

    return (
        <Avatar 
            className='user-avatar cursor-pointer'
            src={avatar}
            bgsz='cover'
            w={size}
            miw={size}
            h={size}
            style={{backgroundImage: userProfilePicture !== null && userProfileDto == null ? `url(${userProfilePicture})` : 'none', overflow: "visible",
        }} 
            bg={`${userProfileDto !== null && userProfileDto.avatarType === 'color' ? userProfileDto.color : ''}`}
        >
        </Avatar>

    );
};

export default UserAvatar;