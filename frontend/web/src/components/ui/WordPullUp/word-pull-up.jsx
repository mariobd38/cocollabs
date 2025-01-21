"use client";
import { motion } from "framer-motion";

import { createPolymorphicComponent, Title } from '@mantine/core';

// Create a motion version of the Title component
const MotionTitle = createPolymorphicComponent(motion.div);


// import { cn } from "@/lib/utils";

export default function WordPullUp({
  words,

  wrapperFramerProps = {
    hidden: { y: 190, opacity: 0 },
    show: { y: 0, opacity: 1 },
    
  },

  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },

  className
}) {
  return (
    (<motion.span
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className="text-balance"
      >
      {words.split(" ").map((word, i) => (
        <MotionTitle
        key={i}
        variants={framerProps}
        component={motion.span}
        display="inline-block"
        pr="8px"
        ff="Helvetica"
        fz={{ 
          base: '1.12rem', 
          sm: '1.2rem', 
          xl: '1.3rem'
        }}
        style={{
          transition: "font-size 0.4s ease"
        }}
        fw={550}
        c="#d0d3d6"
        textWrap="balance"
        ta="center"
      >
        {word === "" ? <span>&nbsp;</span> : word}
      </MotionTitle>
      ))}
    </motion.span>)
  );
}
