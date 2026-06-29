import { useState } from "react";

interface AvatarProps {
  src?: string;
  name: string;
  className?: string;
}

const GRADIENTS = [
  "bg-gradient-to-tr from-pink-500 to-rose-500 text-white",
  "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white",
  "bg-gradient-to-tr from-blue-500 to-teal-500 text-white",
  "bg-gradient-to-tr from-emerald-500 to-teal-600 text-white",
  "bg-gradient-to-tr from-amber-500 to-orange-500 text-white",
  "bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getGradientClass(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
}

export function Avatar({ src, name, className = "w-12 h-12" }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const initials = getInitials(name);
  const gradientClass = getGradientClass(name);

  // If there's no source image, or if it failed to load, display the initials fallback
  if (!src || hasError) {
    return (
      <div
        className={`${className} rounded-full flex items-center justify-center font-bold text-sm tracking-wider select-none shadow-inner border border-zinc-200/10 ${gradientClass}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className={`${className} rounded-full object-cover shadow-sm border border-zinc-200/20`}
    />
  );
}
