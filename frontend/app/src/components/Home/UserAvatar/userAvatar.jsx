import React, { useEffect,useState } from 'react'

import { Avatar,AvatarImage,AvatarFallback } from '@/components/ui/avatar';

// import { getAvatars } from '@/utils/getProfileAvatarList';
// const avatarList = getAvatars();

const UserAvatar = (props) => {
    const { userProfileDto, initials, multiplier=1.6 } = props;
    const size = `${multiplier}rem`;
    
    const [avatarList, setAvatarList] = useState([]);
    const [activeProfile, setActiveProfile] = useState(null);

    useEffect(() => {
        if (userProfileDto.type === 'avatar') {
            const foundAvatar = avatarList.find(avatar => avatar.name === userProfileDto.svg);
            setActiveProfile(foundAvatar?.svg);
        } else if (userProfileDto.type === 's3_image') {
            setActiveProfile(userProfileDto.preSignedUrl);
        } else {
            setActiveProfile(userProfileDto.svg);
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
            <AvatarImage src={activeProfile} alt="profile_img"  />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

    );
};

export default UserAvatar;