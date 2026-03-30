"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface OrbitingLink {
  name: string;
  url: string;
  color: string;
  shadow: string;
  icon: React.ReactNode;
}

interface FunContactProps {
  links: OrbitingLink[];
}

export function FunContactOrbit({ links }: FunContactProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const animRef = useRef<number | undefined>(undefined);

  const animate = useCallback(() => {
    if (hoveredIndex === null) {
      setRotationAngle((prev) => (prev + 0.4) % 360);
    }
    animRef.current = requestAnimationFrame(animate);
  }, [hoveredIndex]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Central pulsing orb */}
      <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 animate-pulse flex items-center justify-center z-10">
        <div className="absolute w-24 h-24 rounded-full border border-white/20 animate-ping opacity-50"></div>
        <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md"></div>
      </div>

      {/* Orbit ring */}
      <div className="absolute w-72 h-72 rounded-full border border-white/10"></div>

      {/* Orbiting links */}
      {links.map((link, index) => {
        const angle = ((index / links.length) * 360 + rotationAngle) % 360;
        const radian = (angle * Math.PI) / 180;
        const radius = 140;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);
        const isHovered = hoveredIndex === index;

        return (
          <a
            key={index}
            href={link.url}
            target={link.url.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="absolute transition-all duration-300 z-20"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${isHovered ? 1.4 : 1})`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300"
              style={{
                background: isHovered ? link.color : "rgba(0,0,0,0.6)",
                borderColor: isHovered ? link.shadow : "rgba(255,255,255,0.2)",
                boxShadow: isHovered ? `0 0 25px ${link.shadow}` : "none",
              }}
            >
              {link.icon}
            </div>
            {isHovered && (
              <span className="absolute top-16 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap bg-black/80 px-3 py-1 rounded-lg">
                {link.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}

export function FunContactSwipe({ links }: FunContactProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % links.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + links.length) % links.length);

  const link = links[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6">
      <a
        href={link.url}
        target={link.url.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="w-48 h-48 rounded-3xl flex flex-col items-center justify-center gap-4 border-2 transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${link.color}, rgba(0,0,0,0.8))`,
          borderColor: link.shadow,
          boxShadow: `0 0 40px ${link.shadow}40`,
        }}
      >
        <div className="w-16 h-16 flex items-center justify-center">
          {link.icon}
        </div>
        <span className="text-sm font-black uppercase tracking-widest text-white">{link.name}</span>
      </a>
      <div className="flex gap-4 items-center">
        <button onClick={prev} className="text-white/50 hover:text-white text-2xl font-bold transition-colors">←</button>
        <span className="text-white/30 text-xs font-mono">{currentIndex + 1}/{links.length}</span>
        <button onClick={next} className="text-white/50 hover:text-white text-2xl font-bold transition-colors">→</button>
      </div>
    </div>
  );
}
