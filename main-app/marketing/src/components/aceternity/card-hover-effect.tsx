import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Type for item.icon: a React component with optional props
type IconType = React.ComponentType<{ className?: string }>;

type Item = {
  icon: IconType;
  iconBg: "teal" | "purple" | "pink" | "amber" | string;
  title: string;
  description: string;
};

type HoverEffectProps = {
  items: Item[];
  className?: string;
};

const getBgColor = (color: string): string => {
  const colors: Record<string, string> = {
    teal: "bg-teal-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    amber: "bg-amber-500",
  };
  return colors[color] || "bg-gray-500";
};

export const HoverEffect: React.FC<HoverEffectProps> = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [inView, setInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setInView(true);
    }
  }, []);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.25,
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
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.34, ease: "easeIn" }}
    >
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 py-10", className)}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="bg-blue-100/20 absolute inset-0 h-full w-full dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <Card key={idx}>
              <div className='gap-3 flex flex-col '>
                <div className="flex justify-between">
                  <div className={`rounded-lg text-white p-3 ${getBgColor(item.iconBg)}`}>
                    <item.icon className="size-5" />
                  </div>
                  {idx > 1 && (
                    <Button className="cursor-default rounded-full h-9 px-4 bg-gray-100/90 border border-gray-300 text-gray-800 text-[13px]">
                      Coming soon
                    </Button>
                  )}
                </div>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

type CardProps = {
  className?: string;
  children: ReactNode;
};

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "border rounded-2xl h-full w-full p-4 overflow-hidden group-hover:border-blue-300 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

type CardTitleProps = {
  children: ReactNode;
};

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return (
    <h1 className={cn('text-2xl min-h-14 font-semibold text-gray-800 tracking-wide')}>
      {children}
    </h1>
  );
};

type CardDescriptionProps = {
  className?: string;
  children: ReactNode;
};

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children }) => {
  return (
    <p
      className={cn(
        'mt-2 text-sm tracking-wide text-gray-500 leading-relaxed',
        className
      )}
    >
      {children}
    </p>
  );
};
