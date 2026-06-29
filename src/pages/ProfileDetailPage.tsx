import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { formatEngagementRate, formatNumber } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useStore } from "@/store/useStore";
import { Avatar } from "@/components/common/Avatar";
import { StatCard } from "@/components/common/StatCard";
import { Button } from "@/components/common/Button";
import { getInfluencerMeta, PLATFORM_BRANDS } from "@/constants";
import { Users, TrendingUp, FileText, Heart, MessageSquare, Play, Zap, ArrowLeft, ExternalLink, Check, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { PlatformBadge } from "@/components/common/PlatformBadge";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return count.toLocaleString();
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);

  const addProfile = useStore((state) => state.addProfile);
  const removeProfile = useStore((state) => state.removeProfile);
  const selectedProfiles = useStore((state) => state.selectedProfiles);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="py-12">
          <p className="text-red-500 mb-4">Invalid profile username specified</p>
          <Link to="/">
            <Button variant="outline">Back to Search</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        {/* Shimmer loading layout skeletons */}
        <div className="max-w-4xl mx-auto py-12 animate-pulse space-y-8">
          <div className="bg-card border border-border rounded-3xl overflow-hidden text-left flex flex-col relative">
            <div className="h-40 sm:h-48 w-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10 -mt-12 sm:-mt-16">
              <div className="h-28 w-28 sm:h-32 sm:w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full border-4 border-white dark:border-zinc-900 mx-auto md:mx-0 flex-shrink-0" />
              <div className="flex-1 w-full pt-16 md:pt-20 space-y-4">
                <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-32 bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-white/[0.04] rounded-2xl sm:col-span-3" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-28 bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-white/[0.04] rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="max-w-md mx-auto py-12 text-center">
          <p className="text-red-600 mb-6 font-semibold">
            Could not load profile details for "{username}"
          </p>
          <Link to="/">
            <Button variant="primary">Back to search</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const platform = (searchParams.get("platform") || user.type || "unknown") as Platform;
  const isSelected = selectedProfiles.some((p) => p.user_id === user.user_id);

  const handleAddToggle = () => {
    if (isSelected) {
      removeProfile(user.user_id);
    } else {
      addProfile(user);
    }
  };

  const meta = getInfluencerMeta(user.username);
  const brand = PLATFORM_BRANDS[platform] || {
    label: platform,
    color: "bg-zinc-550",
    text: "text-zinc-650 dark:text-zinc-400",
    bg: "bg-zinc-100 dark:bg-zinc-850",
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back navigation link */}
        <div className="text-left mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Search</span>
          </Link>
        </div>

        {/* Profile Card details wrapper */}
        <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden text-left flex flex-col relative mt-2">
          
          {/* Cover Banner */}
          <div className="h-40 sm:h-48 w-full relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${meta.brandColor} opacity-90`} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/35 backdrop-blur-[1px]" />
          </div>

          <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
            {/* Left side: Avatar stacked over banner & toggle button */}
            <div className="flex flex-col items-center md:items-start gap-4 -mt-16 sm:mt-[-80px] relative z-20 w-full md:w-auto">
              <div className={`p-1.5 rounded-full bg-gradient-to-tr ${meta.brandColor} shadow-lg`}>
                <Avatar
                  src={user.picture}
                  name={user.fullname}
                  className="w-28 h-28 sm:w-32 sm:h-32 border-4 border-white dark:border-zinc-900"
                />
              </div>
              
              <Button
                onClick={handleAddToggle}
                variant={isSelected ? "primary" : "secondary"}
                icon={isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                className={`w-full justify-center transition-all duration-300 ${isSelected ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-transparent shadow-md shadow-emerald-500/10" : ""}`}
              >
                {isSelected ? "Saved to List" : "Save Creator"}
              </Button>
            </div>

            {/* Right side: Detail metadata list */}
            <div className="flex-1 min-w-0 w-full pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-2 m-0">
                    {user.fullname}
                    <VerifiedBadge verified={user.is_verified} />
                  </h2>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium text-sm">
                    @{user.username}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PlatformBadge platform={platform as Platform} className="text-xs px-3 py-1.5 rounded-lg" />
                  <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-350 rounded-lg">
                    {meta.country}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mt-4">
                {meta.category}
              </div>

              {/* Bio Description */}
              {user.description && (
                <p className="mt-3.5 text-sm leading-relaxed text-zinc-650 dark:text-zinc-350 font-normal">
                  {user.description}
                </p>
              )}

              {/* View platform profile external link */}
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  <span>View on {brand.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {/* Stats Grid Dashboard */}
              <div className="mt-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                  Account Statistics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <StatCard
                    label="Followers"
                    value={formatFollowersDetail(user.followers)}
                    icon={<Users className="h-5.5 w-5.5 text-purple-500" />}
                    className="col-span-2 sm:col-span-3 bg-gradient-to-r from-purple-500/[0.04] to-indigo-500/[0.04] border-purple-500/20 dark:border-purple-500/10 shadow-sm py-6"
                    description="Total content reach across platform network"
                  />
                  <StatCard
                    label="Engagement Rate"
                    value={formatEngagementRate(user.engagement_rate)}
                    icon={<TrendingUp className="h-4 w-4" />}
                  />
                  {user.posts_count !== undefined && (
                    <StatCard
                      label="Total Posts"
                      value={formatNumber(user.posts_count)}
                      icon={<FileText className="h-4 w-4" />}
                    />
                  )}
                  {user.avg_likes !== undefined && (
                    <StatCard
                      label="Avg Likes"
                      value={formatFollowersDetail(user.avg_likes)}
                      icon={<Heart className="h-4 w-4" />}
                    />
                  )}
                  {user.avg_comments !== undefined && (
                    <StatCard
                      label="Avg Comments"
                      value={formatNumber(user.avg_comments)}
                      icon={<MessageSquare className="h-4 w-4" />}
                    />
                  )}
                  {user.avg_views !== undefined && user.avg_views > 0 && (
                    <StatCard
                      label="Avg Views"
                      value={formatFollowersDetail(user.avg_views)}
                      icon={<Play className="h-4 w-4" />}
                    />
                  )}
                  {user.engagements !== undefined && (
                    <StatCard
                      label="Total Engagements"
                      value={formatNumber(user.engagements)}
                      icon={<Zap className="h-4 w-4" />}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
