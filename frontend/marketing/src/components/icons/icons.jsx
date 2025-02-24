import React from 'react';

const iconList = [
    {
        key: 'IconChevronRight',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>        
        ),
    },
    {
        key: 'IconChevronDown',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>        
        ),
    },
    {
        key: 'IconWorld',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
        ),
    },
    {
        key: 'IconBulb',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>        
        ),
    },
    {
        key: 'IconChevronLeft',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>        
        ),
    },
    {
        key: 'IconBrandTwitter',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
        ),
    },
    {
        key: 'IconBrandYoutube',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" /><path d="M10 9l5 3l-5 3z" /></svg>        
        ),
    },
    {
        key: 'IconBrandInstagram',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>        
        ),
    },
    {
        key: 'IconSquareArrowLeft',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-square-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-4 4l4 4" /><path d="M16 12h-8" /><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /></svg>        
        ),
    },
    {
        key: 'IconMail',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>        
        ),
    },
    {
        key: 'IconLock',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>        
        ),
    },
    {
        key: 'IconMenu2',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>        
        ),
    },
    {
        key: 'IconCommand',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-command"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10" /></svg>        
        ),
    },
    {
        key: 'IconSearch',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
        ),
    },
    {
        key: 'IconDotsCircleHorizontal',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-dots-circle-horizontal"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M8 12l0 .01" /><path d="M12 12l0 .01" /><path d="M16 12l0 .01" /></svg>        
        ),
    },
    {
        key: 'IconCheckbox',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
        ),
    },
    {
        key: 'IconCalendar',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-calendar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg>
        ),
    },
    {
        key: 'IconFlag3Filled',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill={color} className="icon icon-tabler icons-tabler-filled icon-tabler-flag-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 4c.852 0 1.297 .986 .783 1.623l-.076 .084l-3.792 3.793l3.792 3.793c.603 .602 .22 1.614 -.593 1.701l-.114 .006h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z" /></svg>
        ),
    },
    {
        key: 'IconUserPlus',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
        ),
    },
    {
        key: 'IconSparkles',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>
        ),
    },
    {
        key: 'IconCirclePlus',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
        ),
    },
    {
        key: 'IconFidgetSpinner',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-fidget-spinner"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 16v.01" /><path d="M6 16v.01" /><path d="M12 5v.01" /><path d="M12 12v.01" /><path d="M12 1a4 4 0 0 1 2.001 7.464l.001 .072a3.998 3.998 0 0 1 1.987 3.758l.22 .128a3.978 3.978 0 0 1 1.591 -.417l.2 -.005a4 4 0 1 1 -3.994 3.77l-.28 -.16c-.522 .25 -1.108 .39 -1.726 .39c-.619 0 -1.205 -.14 -1.728 -.391l-.279 .16l.007 .231a4 4 0 1 1 -2.212 -3.579l.222 -.129a3.998 3.998 0 0 1 1.988 -3.756l.002 -.071a4 4 0 0 1 -1.995 -3.265l-.005 -.2a4 4 0 0 1 4 -4z" /></svg>
        ),
    },
    {
        key: 'IconArchive',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-archive"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" /><path d="M10 12l4 0" /></svg>
        ),
    },
    {
        key: 'IconTrash',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        ),
    },
    {
        key: 'IconHelp',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-help"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 17l0 .01" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" /></svg>
        ),
    },
    {
        key: 'IconLogout',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
        ),
    },
    {
        key: 'IconCancel',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cancel"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M18.364 5.636l-12.728 12.728" /></svg>
        ),
    },
    {
        key: 'IconCircle',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
        ),
    },
    {
        key: 'IconProgress',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-progress"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" /><path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" /><path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" /><path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" /><path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" /></svg>
        ),
    },
    {
        key: 'IconCircleCheckFilled',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill={color}  className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
        ),
    },
    {
        key: 'IconPlus',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        ),
    },
    {
        key: 'IconCalendarMonth',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
        ),
    },
    {
        key: 'IconH1',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-h-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 18v-8l-2 2" /><path d="M4 6v12" /><path d="M12 6v12" /><path d="M11 18h2" /><path d="M3 18h2" /><path d="M4 12h8" /><path d="M3 6h2" /><path d="M11 6h2" /></svg>
        ),
    },
    {
        key: 'IconAlt',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-alt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 16v-6a2 2 0 1 1 4 0v6" /><path d="M4 13h4" /><path d="M11 8v8h4" /><path d="M16 8h4" /><path d="M18 8v8" /></svg>
        ),
    },
    {
        key: 'IconHash',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-hash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 9l14 0" /><path d="M5 15l14 0" /><path d="M11 4l-4 16" /><path d="M17 4l-4 16" /></svg>
        ),
    },
    {
        key: 'IconUsersGroup',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
        ),
    },
    {
        key: 'IconSwitchHorizontal',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-switch-horizontal"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 3l4 4l-4 4" /><path d="M10 7l10 0" /><path d="M8 13l-4 4l4 4" /><path d="M4 17l9 0" /></svg>
        ),
    },
    {
        key: 'IconAdjustmentsHorizontal',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-horizontal"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 6l8 0" /><path d="M16 6l4 0" /><path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 12l2 0" /><path d="M10 12l10 0" /><path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 18l11 0" /><path d="M19 18l1 0" /></svg>
        ),
    },
    {
        key: 'IconUserCircle',
        svg: (width, height, color, strokeWidth) => (
        <svg xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
        )
    },
    {
        key: 'IconMessages',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-message"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
        )
    },
    {
        key: 'IconArrowBack',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
        )
    },
    {
        key: 'IconBrandX',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="butt"  strokeLinejoin="butt"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
        )
    }
    
]

export const Icons = (key,width = 24, height = 24,color,strokeWidth) => {
    const foundIcon = iconList.find(icon => icon.key === key);

    return foundIcon ? foundIcon.svg(width || 24, height || 24, color, strokeWidth) : null;
};

export const GetAllIcons = () => {
    return iconList;
}
