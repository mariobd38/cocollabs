import { useNavigate } from 'react-router-dom';

import { Title,Button } from '@mantine/core';


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='min-h-screen bg-background flex flex-col items-center justify-center gap-10' >
                <div className='py-80 flex flex-col items-center justify-center w-full'>

                <Title className='transition-all linear delay-100' c='#f0f0f0' maw='60%' fz={{base: 21.5}} fw={400} ff='Nunito Sans' textWrap='balance' ta='center' >Sorry, the page you were looking for was not found</Title>
                <Button my={20} p='10px 28px' ff='Inter' fz='1.05rem' fw={600} radius={12} bg='#393BB22a' 
                    className='visit-community-button' onClick={() => navigate('/')}>Back to home</Button>

                </div>
            </div>
        </>
    );
};

export default NotFound;