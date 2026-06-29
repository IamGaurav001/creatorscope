import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { Search } from "lucide-react";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  onProfileClick,
}: ProfileListProps) {
  return (
    <div className="w-full">
      {profiles.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
          <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] flex items-center justify-center mb-4 text-zinc-400 dark:text-zinc-500 shadow-inner">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100">No creators found</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium leading-relaxed">
            We couldn't find any content creators matching your search term. Try another username or spelling.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.user_id}
              profile={profile}
              platform={platform}
              onProfileClick={onProfileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
