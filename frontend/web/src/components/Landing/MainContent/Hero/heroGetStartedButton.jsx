import React from 'react';

const HeroGetStartedButton = () => {
    return (
        <button className="parent relative inline-flex m-auto overflow-hidden p-[1px]  "
            style={{borderRadius: "12px", width: "fit-content"}}>
            <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#101216_0%,#393BB2_50%,#303256_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center  bg-slate-950  text-white backdrop-blur-3xl"
                style={{padding: "16px 30px", fontSize: "1.07rem", fontFamily: "Inter", borderRadius: "12px", fontWeight: "600", background: "#101218"}}>
                Get started for free
            </span>
        </button>
    );
};

export default HeroGetStartedButton;