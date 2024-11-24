import React from 'react';

const HeroGetStartedButton = ({routeChange}) => {
    return (
        <button className="get-started relative overflow-hidden p-[1px]" onClick={() => routeChange("/signup")}
            style={{borderRadius: "12px", width: "fit-content"}}>
            <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#101216_0%,#393BB2_50%,#303256_100%)]" />
            <span className="get-started-text inline-flex h-full w-full cursor-pointer items-center justify-center  bg-slate-950  text-white backdrop-blur-3xl"
                style={{ fontSize: "1.07rem", fontFamily: "Inter", borderRadius: "12px", fontWeight: "600", background: "#101218"}}>
                Get started for free
            </span>
        </button>
        
    );
};

export default HeroGetStartedButton;