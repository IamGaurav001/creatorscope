import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  description,
  className = "",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      className={`p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left ${className}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {label}
        </span>
        {icon && (
          <span className="text-purple-500 dark:text-purple-400 flex-shrink-0">
            {icon}
          </span>
        )}
      </div>
      <div>
        <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 truncate">
          {value}
        </div>
        {description && (
          <p className="text-[9px] sm:text-[10px] text-zinc-400 dark:text-zinc-500 mt-1.5 font-normal line-clamp-1">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
