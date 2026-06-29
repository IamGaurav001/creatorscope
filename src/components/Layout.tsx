import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { SelectedSidebar } from "./SelectedSidebar";
import { Button } from "./common/Button";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const selectedCount = useStore((state) => state.selectedProfiles.length);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 w-full">
      {/* Sticky header navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            <svg
              className="h-6 w-6 stroke-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>vibeSearch</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="relative flex items-center gap-2 border-purple-200 hover:border-purple-300 dark:border-zinc-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-zinc-900"
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Selected List</span>
              {selectedCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {selectedCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main page content area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-10 text-center">
        {title && (
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            {title}
          </h1>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 py-6 text-center text-xs text-zinc-400 dark:text-zinc-550">
        <p>© 2026 vibeSearch. Powered by Zustand and React.</p>
      </footer>

      {/* Selected Influencers Drawer Panel */}
      <SelectedSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
