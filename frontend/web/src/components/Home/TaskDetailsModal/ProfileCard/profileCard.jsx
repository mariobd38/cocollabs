import { useState } from "react";

import { HoverCard,Button,Flex } from '@mantine/core';

import UserAvatar from "@/components/Home/UserAvatar/userAvatar";
import {Icons} from "@/components/icons/icons";

// import { constructImageSrc } from "../../../../utils/constructImageSrc";

import "./profileCard.css";

export const ProfileCard = (props) => {
    const { userFullName, initials, userEmail,userProfileDto, userProfilePicture, target,themeColors } = props;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: timeZone, hour: 'numeric', minute: '2-digit' });

    const [emailCopied, setEmailCopied] = useState(false);

    const handleEmailCopyClick = () => {
        navigator.clipboard.writeText(userEmail);
        setEmailCopied(true);
        // const originalCurrentTaskIdNumber = event.target.innerText
        // event.target.innerText = "Copied!";
        setTimeout(() => {
            setEmailCopied(false);
            // if (event.target.innerText === "Copied!") {
            //     event.target.innerText = originalCurrentTaskIdNumber;
            // }
        }, 1500); 
    }

    return (       
        <>
            <HoverCard width={320} radius={8} shadow="md" openDelay={650} closeDelay={500} zIndex={10000} offset={12}>
                <HoverCard.Target>
                    {target}
                </HoverCard.Target>
                <HoverCard.Dropdown bg={themeColors.bg[2]} c={themeColors.text[1]}>

                    <Flex justify='space-between'>
                        <div className="me-2">
                            <UserAvatar 
                                userProfileDto={userProfileDto}
                                userProfilePicture={userProfilePicture}
                                initials={initials}
                                multiplier={4.8}
                                fontSize={2.3}
                            />
                        </div>
                        <div>
                            <Button className="profile-card-user-status-btn ">Online</Button>
                        </div> 
                    </Flex>

                    <div>
                            <div className="mt-3 nunito-sans-font" style={{fontSize: "1.15rem"}}>
                                <span className="nunito-sans-font-600">{userFullName}</span> (you)
                            </div>
                            
                            <div className="mt-2 d-flex align-items-center">
                                <span>{Icons('IconMail',20,20)}</span>
                                <span className="ps-3 nunito-sans-font" style={{maxWidth: "210px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                                    {userEmail}
                                </span>
                                <span className="ps-2">
                                    { emailCopied ?
                                    Icons('IconClipboardCheck',20,20,"rgb(4, 156, 4)")
                                    :
                                    <span className='cursor-pointer' onClick={handleEmailCopyClick}>
                                        {Icons('IconClipboard',20,20)}
                                    </span>
                                    }
                                </span>
                            </div>

                            <div className="mt-2 ">
                                <span>{Icons('IconClock',20,20)}</span>
                                <span className="ps-3 nunito-sans-font">{currentTime} local time</span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <Button className="profile-card-view-profile-btn">View Profile</Button>
                        </div>
                </HoverCard.Dropdown>
            </HoverCard>
        </>
    );
};