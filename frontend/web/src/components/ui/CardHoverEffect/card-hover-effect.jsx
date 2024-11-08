import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Title, Text, Image,Card as MantineCard } from "@mantine/core";

export const HoverEffect = ({items,className}) => {
    let [hoveredIndex, setHoveredIndex] = useState(null);
    const [inView, setInView] = useState(false); // To track visibility
    const sectionRef = useRef(null);

    const handleIntersection = useCallback((entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      }, []);

      useEffect(() => {
        const currentSection = sectionRef.current; 
        const observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.32,
        });
      
        if (currentSection) {
          observer.observe(currentSection);
        }
      
        return () => {
          if (currentSection) {
            observer.unobserve(currentSection);
          }
        };
      }, [handleIntersection]);

    return (
        <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 50 }} // Initial hidden state
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animate in when visible
            transition={{ duration: 0.4, ease: 'easeIn' }} // Customize animation timing
        >
            <div
            className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 py-10", className)}>
            {items.map((item, idx) => (
                <div
                    // href={item?.link}
                    key={idx}
                    className="relative group block p-2 h-full w-full"
                    // underline="never"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full dark:bg-slate-800/[0.8] block rounded-3xl"
                                layoutId="hoverBackground"
                                style={{ backgroundColor: "#1b2246" }}
                                initial={{ opacity: 0 }}
                                animate={{
                                opacity: 1,
                                transition: { duration: 0.15 },
                                }}
                                exit={{
                                opacity: 0,
                                transition: { duration: 0.15, delay: 0.2 },
                                }} 
                            />
                        )}
                    </AnimatePresence>
                    <Card key={idx}>
                        <Image h={80} w='auto' mb={20} src={item.illustration} />
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </Card>
                </div>
            ))}
            </div>
        </motion.div>
    );
};

export const Card = ({className,children}) => {
    return (
        (<div
        className={cn(
            "rounded-2xl h-full w-full p-4 overflow-hidden group-hover:border-slate-700 relative z-20",
            className
        )}
        style={{background: "#0b0b0b", border: "1.5px solid #676767"}}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>)
    );
};
export const CardTitle = ({children}) => {
    return (
        <Title c='#eaeaea' order={2} ff='Helvetica' className={cn('tracking-wide')}>{children}</Title>
    );
};
export const CardDescription = ({className,children}) => {
    return (
        <Text c='#b6b6b6' fz={13.8} ff='Helvetica' mt={34} className={cn('tracking-wide leading-relaxed')}>{children}</Text>
    );
};
