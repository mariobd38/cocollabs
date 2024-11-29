import React from 'react'

import { Avatar } from '@mantine/core';

import { constructImageSrc } from '@/utils/constructImageSrc';

import './userAvatar.css'

const UserAvatar = (props) => {
    const { userProfileDto, userProfilePicture, initials, multiplier, fontSize } = props;
    const size = `calc(${multiplier}rem * var(--mantine-scale))`;
    return (
        // <Avatar 
        //     className='user-avatar'
        //     src={userProfileDto !== null &&
        //     userProfileDto.avatarType === 'image' ? constructImageSrc(userProfileDto.pfd.data, userProfileDto.avatarType) : 'none'}
        //     style={{backgroundImage: userProfilePicture !== null && userProfileDto == null ? `url(${userProfilePicture})` : 'none', overflow: "visible",
        //     cursor: "pointer",backgroundSize: 'cover',borderRadius: "20%", 
        //     width: size,minWidth: size,height: size, fontSize: `${fontSize}rem`
        // }} 
        //     bg={`${userProfileDto !== null && userProfileDto.avatarType === 'color' ? userProfileDto.color : ''}`}
        // >
        //     {userProfileDto !== null && userProfileDto.avatarType === 'color' ? initials : ''}
        // </Avatar>
        // <Avatar src={userProfilePicture} alt="it's me"> </Avatar>
        <Avatar 
            className='user-avatar cursor-pointer'
            src={userProfileDto !== null &&
            userProfileDto.avatarType === 'image' ? constructImageSrc(userProfileDto.pfd.data, userProfileDto.avatarType) : 
            userProfilePicture && userProfilePicture }
            style={{backgroundImage: userProfilePicture !== null && userProfileDto == null ? `url(${userProfilePicture})` : 'none', overflow: "visible",
            backgroundSize: 'cover',borderRadius: "20%", 
            width: size,minWidth: size,height: size, fontSize: `${fontSize}rem`
        }} 
            bg={`${userProfileDto !== null && userProfileDto.avatarType === 'color' ? userProfileDto.color : ''}`}
        >
            {userProfileDto !== null && userProfileDto.avatarType === 'color' ? initials : ''}
        </Avatar>

    );
};

export default UserAvatar;