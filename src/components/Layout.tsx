import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { SelectedSidebar } from "./SelectedSidebar";
import { Button } from "./common/Button";
import { Sun, Moon, Compass, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const selectedCount = useStore((state) => state.selectedProfiles.length);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground w-full">
      {/* Sticky header navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/70 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-black tracking-tight text-foreground hover:opacity-90 transition-opacity"
          >
            <svg className="h-5.5 w-5.5 text-purple-600 dark:text-purple-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
              <circle cx="12" cy="12" r="3.5" className="fill-white dark:fill-zinc-950" />
            </svg>
            <span className="font-extrabold bg-gradient-to-r from-zinc-950 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
              CreatorScope
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-purple-600 dark:text-purple-400 bg-purple-500/10"
            >
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0 flex items-center justify-center border border-border dark:border-white/[0.06] rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4.5 w-4.5 text-amber-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4.5 w-4.5 text-purple-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* Selected shortlist trigger button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="relative flex items-center gap-2 border border-border dark:border-white/[0.06] rounded-xl text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Shortlist</span>
              {selectedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[9px] font-black h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-md">
                  {selectedCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main page content area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 text-center">
        {title && (
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            {title}
          </h1>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-surface/50 py-6 text-center text-xs text-muted">
        <p>© 2026 CreatorScope. All rights reserved.</p>
      </footer>

      {/* Selected Influencers Drawer Panel */}
      <SelectedSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
