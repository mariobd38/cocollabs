import React, { useEffect,useState } from 'react'

// import { Avatar } from '@mantine/core';
import { Avatar,AvatarImage,AvatarFallback } from '@/components/ui/avatar';

// import { getAvatars } from '@/utils/getProfileAvatarList';
// const avatarList = getAvatars();

const UserAvatar = (props) => {
    const { userFullName,userProfileDto, userProfilePicture, multiplier } = props;
    const size = `calc(${multiplier}rem * var(--mantine-scale))`;
    
    const [avatarList, setAvatarList] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState(userProfileDto.type === 'avatar' ? avatarList.find(avatar => avatar.name === userProfileDto.svg).svg : userProfileDto.preSignedUrl);

    useEffect(() => {
        if (userProfileDto.type === 'avatar') {
            const foundAvatar = avatarList.find(avatar => avatar.name === userProfileDto.svg);
            setAvatarUrl(foundAvatar ? foundAvatar.svg : null);
        } else {
            setAvatarUrl(userProfileDto.preSignedUrl);
        }
    }, [userProfileDto, avatarList]);


    useEffect(() => {
        async function fetchAvatars() {
            const { getAvatars } = await import('@/utils/getProfileAvatarList');
            setAvatarList(getAvatars());
        }

        fetchAvatars();
    }, []);

    return (
        // <Avatar 
        //     className='user-avatar cursor-pointer hover:scale-95'
        //     src={avatarUrl}
        //     bgsz='cover'
        //     w={size}
        //     miw={size}
        //     h={size}
        //     style={{backgroundImage: userProfilePicture !== null && userProfileDto == null ? `url(${userProfilePicture})` : 'none', overflow: "visible",
        // }} 
        //     bg={`${userProfileDto !== null && userProfileDto.avatarType === 'color' ? userProfileDto.color : ''}`}
        // >
        // </Avatar>
        
        <Avatar style={{ width: size, height: size, minWidth: size }}>
            <AvatarImage src={avatarUrl} alt="profile_img" loading='eager' />
            <AvatarFallback>{userFullName?.split(' ').map(name => name[0]).join('')}</AvatarFallback>
        </Avatar>

    );
};

export default UserAvatar;