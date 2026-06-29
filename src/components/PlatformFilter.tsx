import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { PLATFORM_BRANDS } from "@/constants";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 space-y-6">
      {/* Platform selection pills */}
      <div className="flex flex-wrap gap-3 justify-center">
        {PLATFORMS.map((p) => {
          const brand = PLATFORM_BRANDS[p];
          const isSelected = selected === p;

          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-xs border ${
                isSelected
                  ? `${brand.color} text-white border-transparent scale-105 shadow-md`
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>

      {/* Modern Search bar wrapper with icon */}
      <div className="relative max-w-lg mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-555">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search ${getPlatformLabel(selected)} creators by handle or name...`}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 shadow-xs transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            type="button"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 cursor-pointer"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
