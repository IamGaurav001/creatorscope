import { useState, useCallback, useRef } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const clickCountRef = useRef(0);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = useCallback((username: string) => {
    clickCountRef.current += 1;
    console.log("Clicked profile:", username, "total clicks:", clickCountRef.current);
  }, []);

  const handlePlatformChange = useCallback((p: Platform) => {
    setPlatform(p);
    setSearchQuery("");
  }, []);

  return (
    <Layout title="Find Influencers">
      <p className="text-zinc-500 dark:text-zinc-450 mb-6 text-sm">
        Discover and analyze top content creators across Instagram, YouTube, and TikTok
      </p>

      <PlatformFilter
        selected={platform}
        onChange={handlePlatformChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4 text-left max-w-7xl mx-auto font-medium">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

      <ProfileList
        profiles={filtered}
        platform={platform}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
