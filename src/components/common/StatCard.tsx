import type { ReactNode } from "react";

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
    <div
      className={`p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        {icon && (
          <span className="text-zinc-400 dark:text-zinc-500 text-sm">
            {icon}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {value}
        </div>
        {description && (
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
