import React from 'react';
import { useNavigate } from "react-router-dom";

import { Text, Button } from '@mantine/core';

import team_work from '../../../../assets/illustrations/landing/team_work.png';
// import archery_goals from '../../../../assets/illustrations/landing/archery_goals.png';
import shared_goals from '../../../../assets/illustrations/landing/shared_goals.png';

const Hero = () => {

    let navigate = useNavigate(); 

    const routeChange = (route) =>{ 
        navigate(route);
    }

    return (
        <div>
            <div>
                <div className="container py-5">
                    <div className='row'>
                        <div className='col-12 col-lg-6 m-auto'>
                            <div className='fafafa-color top-left-header-text d-flex flex-column justify-content-md-between'>
                                <Text style={{lineHeight: "4rem", paddingBottom: "10px"}} className='fafafa-color top-left-header-text d-flex'>
                                    Collab like never before.
                                </Text>

                                <Text style={{lineHeight: "4rem", paddingBottom: "40px"}} className='fafafa-color top-left-header-text d-flex'>
                                    Productivity for all.
                                </Text>
                            </div>

                            <div>
                                <div >
                                    <Text pb='10' fz={19} className='fafafa-color landing-header-description-text' style={{lineHeight: "1.8rem"}}>
                                        Transform your ideas into achievements with cross-end collaboration and the most innovative productivity tools. 
                                    </Text>
                                </div>
                                
                                <div className="pt-4 pb-4 text-center justify-content-md-between">
                                    <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3 landing-hero-buttons">
                                        <Button className="landing-get-started-button" onClick={() => routeChange('/signup')}>
                                            Get Started
                                        </Button>
                                        <Button className="landing-learn-more-button">
                                            Learn More
                                        </Button>
                                    </div>
                                    <Text fz={15} className="landing-header-description-text d-flex justify-content-center justify-content-lg-start pt-4" style={{ fontSize: '0.7em', color: '#fafafa' }}>
                                        No credit card needed · Start with a free plan
                                    </Text>
                
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-lg-6'>
                            <div className='d-md-flex justify-content-center justify-content-lg-center main-content-team-work-div'>
                                {/* <div className='text-center'>
                                    <img src={archery_goals} className="illustration-landing" alt="" />
                                </div> */}
                                <div className='py-4 text-center'>
                                    <img src={team_work} className="illustration-landing" alt="" />
                                </div>
                            </div>
                            <div className='d-flex justify-content-center justify-content-lg-center main-content-shared-goals-div'>
                                <div>
                                    <img src={shared_goals} className="illustration-landing" alt="" />
                                </div>
                            </div>
                        </div>
                        
                        {/* <Container className='d-flex justify-content-center' mt={55}>
                            <img src={home_screenshot} alt="home screenshot" className='landing-home-screenshot' />
                        </Container> */}
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default Hero;