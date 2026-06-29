import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useStore } from "@/store/useStore";
import { Avatar } from "./common/Avatar";
import { Button } from "./common/Button";
import { PLATFORM_BRANDS } from "@/constants";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return count.toString();
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const isSelected = useStore((state) => state.isSelected(profile.user_id));
  const addProfile = useStore((state) => state.addProfile);
  const removeProfile = useStore((state) => state.removeProfile);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeProfile(profile.user_id);
    } else {
      addProfile(profile);
    }
  };

  const brand = PLATFORM_BRANDS[platform];

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between gap-4 cursor-pointer hover:border-purple-300 dark:hover:border-purple-900 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left"
    >
      <div className="flex items-start gap-3">
        <Avatar
          src={profile.picture}
          name={profile.fullname}
          className="w-14 h-14 flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base text-zinc-900 dark:text-zinc-50 truncate">
              {profile.fullname}
            </span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
            @{profile.username}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${brand.bg} ${brand.text}`}
            >
              {brand.label}
            </span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {formatFollowersLocal(profile.followers)} followers
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 dark:border-zinc-800/60 pt-3 flex items-center justify-between gap-2">
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
          {profile.engagement_rate !== undefined
            ? `ER: ${(profile.engagement_rate * 100).toFixed(2)}%`
            : "N/A Engagement"}
        </span>
        <Button
          type="button"
          onClick={handleAddToggle}
          variant={isSelected ? "primary" : "secondary"}
          size="sm"
          className="px-4.5"
        >
          {isSelected ? "Added" : "Add to List"}
        </Button>
      </div>
    </div>
  );
});
