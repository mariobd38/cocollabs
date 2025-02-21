import React from 'react';

import './statBlocks.css';

const StatBlocks = (props) => {
    const {upcomingTasks} = props;

    return (
        <>
            <div className='row pt-4 d-flex px-0 justify-content-between m-auto' style={{width: "100%"}}> 
                <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-start pb-xxl-0">
                    <div className='home-header-stat-block'>
                        <div className='d-flex justify-content-between home-header-stat-block-top'>
                            <div className='ms-3 home-header-stat-block-num pt-1'><span>0</span></div>
                            <div className='me-3 home-header-stat-block-text pt-3'>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 9C4 7.11438 4 6.17157 4.58579 5.58579C5.17157 5 6.11438 5 8 5H8.34315C9.16065 5 9.5694 5 9.93694 5.15224C10.3045 5.30448 10.5935 5.59351 11.1716 6.17157L11.8284 6.82843C12.4065 7.40649 12.6955 7.69552 13.0631 7.84776C13.4306 8 13.8394 8 14.6569 8H16C17.8856 8 18.8284 8 19.4142 8.58579C20 9.17157 20 10.1144 20 12V15C20 16.8856 20 17.8284 19.4142 18.4142C18.8284 19 17.8856 19 16 19H8C6.11438 19 5.17157 19 4.58579 18.4142C4 17.8284 4 16.8856 4 15V9Z" stroke="#6FE3C2" strokeWidth="2"/>
                                </svg>
                            </div>
                        </div>
                        <div className='d-flex align-items-start pt-1 bg-secondary home-header-stat-block-bottom'>
                            <div className='ms-3'><span className='home-header-stat-block-text'>Active projects</span></div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center pt-4 pt-md-0 pb-4 ">
                    <div className='home-header-stat-block'>
                        <div className='d-flex justify-content-between home-header-stat-block-top'>
                            <div className='ms-3 home-header-stat-block-num pt-1'><span>{upcomingTasks.length}</span></div>
                            <div className='me-3 home-header-stat-block-text pt-3'>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6L12 3" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 21L12 19" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19 12L21 12" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 12L6 12" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.6569 6.34314L18.364 5.63603" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.63602 18.364L7.05023 16.9497" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.9497 16.9498L18.364 18.364" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.63605 5.63605L7.75737 7.75737" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className='d-flex align-items-start pt-1 bg-secondary home-header-stat-block-bottom'>
                            <div className='ms-3'><span className='home-header-stat-block-text'>Ongoing tasks</span></div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-start justify-content-lg-center">
                    <div className='home-header-stat-block'>
                        <div className='d-flex justify-content-between home-header-stat-block-top'>
                            <div className='ms-3 home-header-stat-block-num pt-1'><span>0</span></div>
                            <div className='me-3 home-header-stat-block-text pt-3'>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21C14.0822 21 16.1 20.278 17.7095 18.9571C19.3191 17.6362 20.4209 15.798 20.8271 13.7558C21.2333 11.7136 20.9188 9.59376 19.9373 7.75743C18.9558 5.9211 17.3679 4.48191 15.4442 3.68508C13.5205 2.88826 11.38 2.78311 9.38744 3.38754C7.3949 3.99197 5.67358 5.26858 4.51677 6.99987C3.35997 8.73115 2.83925 10.81 3.04334 12.8822C3.24743 14.9543 4.1637 16.8916 5.63604 18.364" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M16 10L12.402 14.3175C11.7465 15.1042 11.4187 15.4976 10.9781 15.5176C10.5375 15.5375 10.1755 15.1755 9.45139 14.4514L8 13" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className='d-flex align-items-start pt-1 bg-secondary home-header-stat-block-bottom'>
                            <div className='ms-3'><span className='home-header-stat-block-text'>Tasks completed</span></div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end pb-4 pt-4 pt-md-0 pb-xxl-0">
                    <div className='home-header-stat-block'>
                        <div className='d-flex justify-content-between home-header-stat-block-top'>
                            <div className='ms-3 home-header-stat-block-num pt-1'><span>0:00</span></div>
                            <div className='me-3 home-header-stat-block-text pt-3'>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="7" stroke="#6FE3C2" strokeWidth="2"/>
                                    <path d="M5.96472 3.1363C5.2865 3.31803 4.66807 3.67508 4.17157 4.17157C3.67508 4.66807 3.31803 5.2865 3.1363 5.96472" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M18.0353 3.1363C18.7135 3.31803 19.3319 3.67508 19.8284 4.17157C20.3249 4.66807 20.682 5.2865 20.8637 5.96472" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M12 8V11.75C12 11.8881 12.1119 12 12.25 12H15" stroke="#6FE3C2" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className='d-flex align-items-start pt-1 bg-secondary home-header-stat-block-bottom'>
                            <div className='ms-3'><span className='home-header-stat-block-text'>Working time</span></div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
};

export default StatBlocks;