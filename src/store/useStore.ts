import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";
import { toast } from "sonner";

interface StoreState {
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  clearProfiles: () => void;
  isSelected: (userId: string) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],
      addProfile: (profile) => {
        const alreadyExists = get().selectedProfiles.some(
          (p) => p.user_id === profile.user_id
        );
        if (!alreadyExists) {
          set({
            selectedProfiles: [...get().selectedProfiles, profile],
          });
          toast.success(`Saved ${profile.fullname} to shortlist`);
        }
      },
      removeProfile: (userId) => {
        const profile = get().selectedProfiles.find((p) => p.user_id === userId);
        set({
          selectedProfiles: get().selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        });
        if (profile) {
          toast.info(`Removed ${profile.fullname} from shortlist`);
        }
      },
      clearProfiles: () => {
        const count = get().selectedProfiles.length;
        set({ selectedProfiles: [] });
        if (count > 0) {
          toast.info("Cleared all shortlisted creators");
        }
      },
      isSelected: (userId) => {
        return get().selectedProfiles.some((p) => p.user_id === userId);
      },
    }),
    {
      name: "wobb-selected-influencers",
    }
  )
);
