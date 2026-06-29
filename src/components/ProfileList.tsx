import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

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
        <div className="py-12 text-center text-zinc-400 dark:text-zinc-600">
          No profiles found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
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
