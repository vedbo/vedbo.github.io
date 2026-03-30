"use client";
import { motion } from "framer-motion";

export interface FilterCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  activeColor: string;
}

const categories: FilterCategory[] = [
  { id: "all", label: "All", icon: "⚡", color: "text-gray-400", activeColor: "bg-white text-black" },
  { id: "hardware", label: "Hardware", icon: "🔧", color: "text-cyan-400", activeColor: "bg-cyan-500 text-black" },
  { id: "ai", label: "AI / ML", icon: "🧠", color: "text-purple-400", activeColor: "bg-purple-500 text-white" },
  { id: "swift", label: "Swift Apps", icon: "📱", color: "text-red-400", activeColor: "bg-red-500 text-white" },
  { id: "hackathon", label: "Hackathons", icon: "🏆", color: "text-yellow-400", activeColor: "bg-yellow-500 text-black" },
  { id: "creative", label: "Creative", icon: "🎮", color: "text-green-400", activeColor: "bg-green-500 text-black" },
];

export function ProjectFilter({
  activeFilter,
  onFilterChange,
  counts,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12">
      {categories.map((cat) => {
        const isActive = activeFilter === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onFilterChange(cat.id)}
            className={`relative px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors duration-200 border ${
              isActive
                ? `${cat.activeColor} border-transparent shadow-lg`
                : "bg-transparent border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="flex items-center gap-1.5 md:gap-2">
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`text-[8px] md:text-[9px] font-mono ${isActive ? "opacity-80" : "opacity-50"}`}>
                {counts[cat.id] || 0}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { categories };
