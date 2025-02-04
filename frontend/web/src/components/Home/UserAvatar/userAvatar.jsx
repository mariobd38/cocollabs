import React from 'react'

import { Avatar } from '@mantine/core';

import { constructImageSrc } from '@/utils/constructImageSrc';

import './userAvatar.css'

import { getAvatars } from '@/utils/getProfileAvatarList';
const avatarList = getAvatars();

const UserAvatar = (props) => {
    const { userProfileDto, userProfilePicture, initials, multiplier, fontSize } = props;
    const size = `calc(${multiplier}rem * var(--mantine-scale))`;
    console.log(userProfileDto.type);
    const avatar = userProfileDto.type === 'avatar' ? avatarList.find(avatar => avatar.name === userProfileDto.svg).svg : userProfileDto.preSignedUrl;
    return (
        <Avatar 
            className='user-avatar cursor-pointer'
            // src={userProfileDto !== null &&
            // userProfileDto.avatarType === 'image' ? constructImageSrc(userProfileDto.pfd.data, userProfileDto.avatarType) : 
            // userProfilePicture && userProfilePicture }
            src={avatar}
            bgsz='cover'
            radius='20%'
            w={size}
            miw={size}
            h={size}
            fz={`${fontSize}rem`}
            style={{backgroundImage: userProfilePicture !== null && userProfileDto == null ? `url(${userProfilePicture})` : 'none', overflow: "visible",
            
        }} 
            bg={`${userProfileDto !== null && userProfileDto.avatarType === 'color' ? userProfileDto.color : ''}`}
        >
            {userProfileDto !== null && userProfileDto.avatarType === 'color' ? initials : ''}
        </Avatar>

    );
};

export default UserAvatar;