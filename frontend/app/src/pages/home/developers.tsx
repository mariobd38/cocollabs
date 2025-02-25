import { useEffect, useState } from 'react';

import { getAllProfilesInfo } from '@/api/profiles/getAllProfiles';

import UserAvatar from '@/components/Home/UserAvatar/userAvatar';

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import linkedin from '@/assets/logos/linkedin.png';

interface Profile {
    firstName: string;
    lastName: string;
    fullName: string;
    type: string;
    svg: string;
    preSignedUrl: string;
}

const Developers: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const data = await getAllProfilesInfo();
                setProfiles(data); // ✅ Directly setting the array of profiles
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        fetchProfiles();

        const timer = setTimeout(() => {
            setVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`transition-opacity duration-300 ease-linear ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col gap-4 py-7">
                <h2 className="text-lg font-bold">Developers</h2>

                <Table>
                <TableBody>
                    {profiles.map((profile, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium flex items-center gap-5">
                            <UserAvatar userProfileDto={profile} multiplier={3.5} initials={profile.fullName?.split(' ').map(name => name[0]).join('')} />
                            <div className='flex flex-col gap-1'>
                                <p>{profile.fullName}</p>
                                {/* <div>
                                    <img src={linkedin} alt='linkedin' className='w-[18px] h-4' />
                                </div> */}
                            </div>
                            {/* <TableCell>{profile.fullName}</TableCell> */}
                        </TableCell>
                        {/* <TableCell>{invoice.paymentMethod}</TableCell> */}
                        {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                
                {/* Render profiles */}
                {/* {profiles.length > 0 ? (
                    <ul>
                        {profiles.map((profile, index) => (
                            <li key={index} className="flex items-center gap-4 p-2 border-b">
                                <UserAvatar userProfileDto={profile} multiplier={4.5} />
                                <div>
                                    <p className="text-sm font-medium">{profile.fullName}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No profiles available...</p>
                )} */}
            </div>
        </div>
    );
};

export default Developers;
