// ScrollProgressBar.tsx
 import React, { useState, useEffect } from 'react';

 interface ScrollProgressBarProps {
   height?: string;
   color?: string;
 }

 const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ height = '5px', color = 'red' }) => {
   const [scrollPercentage, setScrollPercentage] = useState(0);

   useEffect(() => {
     const handleScroll = () => {
       const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
       const scrolled = (window.scrollY / scrollHeight) * 100;
       setScrollPercentage(scrolled);
     };

     window.addEventListener('scroll', handleScroll);
     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, []);

   const progressBarStyles = {
     height: height,
     width: `${scrollPercentage}%`,
     backgroundColor: color,
     position: 'fixed',
     top: 0,
     left: 0,
     zIndex: 1000,
   };

   return <div style={progressBarStyles}></div>;
 };

 export default ScrollProgressBar;


 // Usage example (App.tsx or any other component)
 // import ScrollProgressBar from './ScrollProgressBar';

 // <ScrollProgressBar height="8px" color="blue" />