import React from 'react';

const iconList = [
    {
        key: 'IconClipboardList',
        svg: (width, height, color, strokeWidth) => (
            <svg xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 12l.01 0" /><path d="M13 12l2 0" /><path d="M9 16l.01 0" /><path d="M13 16l2 0" /></svg>
        ),
    },
    {
        key: 'IconFiles',
        svg: (width, height, color, strokeWidth) => (
            <svg xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-files"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 3v4a1 1 0 0 0 1 1h4" /><path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" /><path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" /></svg>        
        ),
    },
    {
        key: 'IconCalendarWeek',
        svg: (width, height, color, strokeWidth) => (
            <svg xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-week"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M8 14v4" /><path d="M12 14v4" /><path d="M16 14v4" /></svg>
        ),
    },
    {
        key: 'IconApps',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-apps"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
        ),
    },
    {
        key: 'IconSTurnRight',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-s-turn-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 5h9.5a3.5 3.5 0 0 1 0 7h-9a3.5 3.5 0 0 0 0 7h13.5" /><path d="M18 16l3 3l-3 3" /></svg>
        ),
    },
    {
        key: 'IconChalkboard',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chalkboard"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 19h-3a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v11a1 1 0 0 1 -1 1" /><path d="M11 16m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
        ),
    },
    {
        key: 'IconSettings',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
        ),
    },
    {
        key: 'IconLayoutKanban',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height} viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-layout-kanban"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l6 0" /><path d="M14 4l6 0" /><path d="M4 8m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M14 8m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg>        
        ),
    },
    {
        key: 'IconBrush',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brush"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21v-4a4 4 0 1 1 4 4h-4" /><path d="M21 3a16 16 0 0 0 -12.8 10.2" /><path d="M21 3a16 16 0 0 1 -10.2 12.8" /><path d="M10.6 9a9 9 0 0 1 4.4 4.4" /></svg>
        ),
    },
    {
        key: 'IconTargetArrow',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-target-arrow"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 7a5 5 0 1 0 5 5" /><path d="M13 3.055a9 9 0 1 0 7.941 7.945" /><path d="M15 6v3h3l3 -3h-3v-3z" /><path d="M15 9l-3 3" /></svg>
        ),
    },
    {
        key: 'IconBrandProducthunt',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-producthunt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 16v-8h2.5a2.5 2.5 0 1 1 0 5h-2.5" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
        ),
    },
    {
        key: 'IconTimeline',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-timeline"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 16l6 -7l5 5l5 -6" /><path d="M15 14m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M10 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M4 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M20 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
        ),
    },
    {
        key: 'IconAd2',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-ad-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.933 5h-6.933v16h13v-8" /><path d="M14 17h-5" /><path d="M9 13h5v-4h-5z" /><path d="M15 5v-2" /><path d="M18 6l2 -2" /><path d="M19 9h2" /></svg>
        ),
    },
    {
        key: 'IconChartHistogram',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chart-histogram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3v18h18" /><path d="M20 18v3" /><path d="M16 16v5" /><path d="M12 13v8" /><path d="M8 16v5" /><path d="M3 11c6 0 5 -5 9 -5s3 5 9 5" /></svg>
        ),
    },
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
        key: 'IconCircleCheck',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>        
        ),
    },
    {
        key: 'IconUser',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"} strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>        
        ),
    },
    {
        key: 'IconCheck',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}   strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
        ),
    },
    {
        key: 'IconCloudUpload',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cloud-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><path d="M9 15l3 -3l3 3" /><path d="M12 12l0 9" /></svg>        
        ),
    },
    {
        key: 'IconBell',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>        
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
        key: 'IconHome',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>        
        ),
    },
    {
        key: 'IconInbox',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-inbox"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M4 13h3l3 3h4l3 -3h3" /></svg>
        ),
    },
    {
        key: 'IconFile',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>        
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
        key: 'IconFlag3',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-flag-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 14h14l-4.5 -4.5l4.5 -4.5h-14v16" /></svg>
        ),
    },
    {
        key: 'IconLoader',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}   strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-loader"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6l0 -3" /><path d="M16.25 7.75l2.15 -2.15" /><path d="M18 12l3 0" /><path d="M16.25 16.25l2.15 2.15" /><path d="M12 18l0 3" /><path d="M7.75 16.25l-2.15 2.15" /><path d="M6 12l-3 0" /><path d="M7.75 7.75l-2.15 -2.15" /></svg>
        ),
    },
    {
        key: 'IconDots',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
        ),
    },
    {
        key: 'IconPencil',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
        ),
    },
    {
        key: 'IconCalendarDue',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-due"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
        ),
    },
    {
        key: 'IconEdit',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
        ),
    },
    {
        key: 'IconCalendarPlus',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
        ),
    },
    {
        key: 'IconX',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
        ),
    },
    {
        key: 'IconClock',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>
        ),
    },
    {
        key: 'IconClipboard',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg>
        ),
    },
    {
        key: 'IconClipboardCheck',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 14l2 2l4 -4" /></svg>
        ),
    },
    {
        key: 'IconBookmark',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" /></svg>
        ),
    },
    {
        key: 'IconShare',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-share"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>
        ),
    },
    {
        key: 'IconSquareChevronUp',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-square-chevron-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M9 13l3 -3l3 3" /></svg>
        ),
    },
    {
        key: 'IconSquareChevronDown',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-square-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11l-3 3l-3 -3" /><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /></svg>
        ),
    },
    {
        key: 'IconH1',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-h-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 18v-8l-2 2" /><path d="M4 6v12" /><path d="M12 6v12" /><path d="M11 18h2" /><path d="M3 18h2" /><path d="M4 12h8" /><path d="M3 6h2" /><path d="M11 6h2" /></svg>
        ),
    },
    {
        key: 'IconH2',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-h-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 12a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0" /><path d="M4 6v12" /><path d="M12 6v12" /><path d="M11 18h2" /><path d="M3 18h2" /><path d="M4 12h8" /><path d="M3 6h2" /><path d="M11 6h2" /></svg>
        ),
    },
    {
        key: 'IconQuote',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-quote"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" /><path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" /></svg>
        ),
    },
    {
        key: 'IconH3',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-h-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 14a2 2 0 1 0 -2 -2" /><path d="M17 16a2 2 0 1 0 2 -2" /><path d="M4 6v12" /><path d="M12 6v12" /><path d="M11 18h2" /><path d="M3 18h2" /><path d="M4 12h8" /><path d="M3 6h2" /><path d="M11 6h2" /></svg>
        ),
    },
    {
        key: 'IconClearFormatting',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-clear-formatting"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 15l4 4m0 -4l-4 4" /><path d="M7 6v-1h11v1" /><path d="M7 19l4 0" /><path d="M13 5l-4 14" /></svg>
        ),
    },
    {
        key: 'IconList',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
        ),
    },
    {
        key: 'IconCode',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-code"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></svg>
        ),
    },
    {
        key: 'IconArrowBigUp',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
        ),
    },
    {
        key: 'IconLetterB',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-letter-b"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 20v-16h6a4 4 0 0 1 0 8a4 4 0 0 1 0 8h-6" /><path d="M7 12l6 0" /></svg>
        ),
    },
    {
        key: 'IconLetterC',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-letter-c"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5" /></svg>
        ),
    },
    {
        key: 'IconAlt',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-alt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 16v-6a2 2 0 1 1 4 0v6" /><path d="M4 13h4" /><path d="M11 8v8h4" /><path d="M16 8h4" /><path d="M18 8v8" /></svg>
        ),
    },
    {
        key: 'IconNumber0',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-number-0"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 16v-8" /><path d="M12 20a4 4 0 0 0 4 -4v-8a4 4 0 1 0 -8 0v8a4 4 0 0 0 4 4z" /></svg>
        ),
    },
    {
        key: 'IconNumber1',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-number-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 20v-16l-5 5" /></svg>
        ),
    },
    {
        key: 'IconNumber2',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-number-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 9.185h8" /></svg>
        ),
    },
    {
        key: 'IconNumber3',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-number-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12a4 4 0 1 0 -4 -4" /><path d="M8 16a4 4 0 1 0 4 -4" /></svg>
        ),
    },
    {
        key: 'IconNumber7',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-number-7"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 4h8l-4 16" /></svg>
        ),
    },
    {
        key: 'IconNumber8',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-number-8"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M12 16m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /></svg>
        ),
    },
    {
        key: 'IconNumber9',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-number-9"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 8a4 4 0 1 0 -8 0v1a4 4 0 1 0 8 0" /><path d="M8 16a4 4 0 1 0 8 0v-8" /></svg>
        ),
    },
    {
        key: 'IconSeparatorHorizontal',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-separator-horizontal"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12l16 0" /><path d="M8 8l4 -4l4 4" /><path d="M16 16l-4 4l-4 -4" /></svg>
        ),
    },
    {
        key: 'IconMinus',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
        ),
    },
    {
        key: 'IconListNumbers',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-list-numbers"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 6h9" /><path d="M11 12h9" /><path d="M12 18h8" /><path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" /><path d="M6 10v-6l-2 2" /></svg>
        ),
    },
    {
        key: 'IconListCheck',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-list-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" /><path d="M11 6l9 0" /><path d="M11 12l9 0" /><path d="M11 18l9 0" /></svg>
        ),
    },
    {
        key: 'IconFolder',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" /></svg>
        ),
    },
    {
        key: 'IconPlanet',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-planet"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" /><path d="M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /></svg>
        ),
    },
    {
        key: 'IconColorFilter',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-color-filter"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.58 13.79c.27 .68 .42 1.43 .42 2.21c0 1.77 -.77 3.37 -2 4.46a5.93 5.93 0 0 1 -4 1.54c-3.31 0 -6 -2.69 -6 -6c0 -2.76 1.88 -5.1 4.42 -5.79" /><path d="M17.58 10.21c2.54 .69 4.42 3.03 4.42 5.79c0 3.31 -2.69 6 -6 6a5.93 5.93 0 0 1 -4 -1.54" /><path d="M12 8m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" /></svg>
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
        key: 'IconLink',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" /></svg>
        )
    },
    {
        key: 'IconWorldSearch',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 12a9 9 0 1 0 -9 9" /><path d="M3.6 9h16.8" /><path d="M3.6 15h7.9" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
        )
    },
    {
        key: 'IconCircleChevronRightFilled',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill={color || "currentColor"}  className="icon icon-tabler icons-tabler-filled icon-tabler-circle-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -20 0c0 -5.523 4.477 -10 10 -10m-.293 6.293a1 1 0 0 0 -1.414 0l-.083 .094a1 1 0 0 0 .083 1.32l2.292 2.293l-2.292 2.293a1 1 0 0 0 1.414 1.414l3 -3a1 1 0 0 0 0 -1.414z" /></svg>
        )
    },
    {
        key: 'IconCircleChevronLeftFilled',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill={color || "currentColor"}  className="icon icon-tabler icons-tabler-filled icon-tabler-circle-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 0 1 5 8.66c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10a10 10 0 0 1 15 -8.66m-3.293 4.953a1 1 0 0 0 -1.414 0l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 0 0 1.414 0l.083 -.094a1 1 0 0 0 -.083 -1.32l-2.292 -2.293l2.292 -2.293a1 1 0 0 0 0 -1.414" /></svg>
        )
    },
    {
        key: 'IconSelector',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-selector"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9l4 -4l4 4" /><path d="M16 15l-4 4l-4 -4" /></svg>
        )
    },
    {
        key: 'IconUsersGroup',
        svg: (width, height, color, strokeWidth) => (
            <svg  xmlns="http://www.w3.org/2000/svg"  width={width}  height={height}  viewBox="0 0 24 24"  fill="none"  stroke={color || "currentColor"}  strokeWidth={strokeWidth || "2"}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
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
