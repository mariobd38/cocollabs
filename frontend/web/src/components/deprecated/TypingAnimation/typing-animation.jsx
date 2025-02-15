"use client";
import { useEffect, useState } from "react";
import { Title } from '@mantine/core';


export default function TypingAnimation({
  text,
  duration = 200,
  className
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i]);

  return (
    <Title order={1} pb={0} fz={{ base: '3.6rem', sm: '3.9rem', xl: '4.3rem'}} style={{transition: "font-size 0.4s ease", letterSpacing: "1px"}}
    ff='Lato' textWrap="balance" c='#fafafa' ta='center' >
        {displayedText ? displayedText : text}
    </Title>
  );
}
