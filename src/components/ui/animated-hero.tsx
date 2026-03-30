"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";

interface AnimatedHeroProps {
  titles?: string[];
  staticText?: string;
  subtitle?: string;
}

export function AnimatedHero({ 
  titles = ["Robotics", "Data Science", "Research", "Engineering", "Innovation"],
  staticText = "Computer Science &",
  subtitle = "Rutgers Honors College"
}: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter font-black">
        <span className="text-white">{staticText}</span>
        <span className="relative flex w-full overflow-hidden md:pb-4 md:pt-1 h-[1.2em]">
          &nbsp;
          {titles.map((title, index) => (
            <motion.span
              key={index}
              className="absolute font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: "-100" }}
              transition={{ type: "spring", stiffness: 50 }}
              animate={
                titleNumber === index
                  ? {
                      y: 0,
                      opacity: 1,
                    }
                  : {
                      y: titleNumber > index ? -150 : 150,
                      opacity: 0,
                    }
              }
            >
              {title}
            </motion.span>
          ))}
        </span>
      </h1>
      <TextShimmer
        as="p"
        className="text-lg md:text-xl font-bold [--base-color:#CC0033] [--base-gradient-color:#ff4d6d] dark:[--base-color:#CC0033] dark:[--base-gradient-color:#ff4d6d]"
        duration={3}
        spread={3}
      >
        {subtitle}
      </TextShimmer>
    </div>
  );
}
