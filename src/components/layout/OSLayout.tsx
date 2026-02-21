import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/utils/utils";
import { OSTopBar } from "@/components/layout/OSTopBar";
import { OSBottomDock } from "@/components/layout/OSBottomDock";
import { OSRightPanel } from "@/components/layout/OSRightPanel";
import { OSMicroHUD } from "@/components/layout/OSMicroHUD";
import { Footer } from "@/components/layout/Footer";
import { TypingSessionProvider, useTypingSession } from "@/contexts/TypingSessionContext";
import { motion, AnimatePresence } from "framer-motion";

// Pages where we show the full OS shell
const OS_SHELL_PAGES = [
  "/",
  "/home-dashboard",
  "/games",
  "/progressive-lessons",
  "/global-exams",
  "/skill-progression",
  "/multiplayer-race",
  "/ai-academy",
  "/statistics",
  "/achievements",
  "/leaderboard",
  "/word-crush",
  "/number-symbol-practice",
  "/lessons",
  "/tournaments",
  "/earn",
  "/community",
  "/marketplace",
  "/book-library",
  "/custom-practice",
  "/blog-comments",
  "/ai-coach",
  "/blog",
  "/settings",
  "/profile",
];

// Pages that should be fullscreen (no shell)
const FULLSCREEN_PAGES = [
  "/mode-selection",
  "/blog",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/contact",
  "/jobs",
  "/download",
  "/faq",
  "/user-guides",
  "/whats-new",
  "/zen",
];

interface OSLayoutProps {
  children: ReactNode;
}

function OSLayoutInner({ children }: OSLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isFocusMode, isTyping } = useTypingSession();

  // Check if we should show the OS shell specific elements (like Right Panel)
  const isOSShellContext = OS_SHELL_PAGES.some(page =>
    page === "/" ? currentPath === "/" : currentPath.startsWith(page)
  );

  // In focus mode, hide all OS chrome except minimal HUD
  const hidePanels = isFocusMode || isTyping;

  return (
    <div className={cn(
      "min-h-screen w-full bg-background transition-colors duration-500 overflow-x-hidden",
      isFocusMode && "bg-black"
    )}>
      {/* Focus mode overlay */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)"
            }}
          />
        )}
      </AnimatePresence>

      {/* TOP OS BAR - Hidden in focus mode */}
      {!isFocusMode && (
        <>
          <OSTopBar />
        </>
      )}

      {/* MAIN CANVAS */}
      <main
        className={cn(
          "min-h-screen transition-all duration-500",
          // Top padding for fixed header (reduced in focus mode)
          isFocusMode ? "pt-4" : "pt-20 lg:pt-24", // Reduced for mobile
          // Bottom padding for mobile dock
          isFocusMode ? "pb-4" : "pb-24 lg:pb-0", // Increased for mobile to avoid dock overlap
          // Side padding for Right Panel
          isOSShellContext && !isFocusMode && "xl:pr-80",
          // Center content more in focus mode
          isFocusMode && "flex items-center justify-center"
        )}
      >
        <div className={cn(
          "transition-all duration-500 w-full h-full flex flex-col",
          isFocusMode && "max-w-4xl mx-auto px-4"
        )}>
          <div className="flex-1">
            {children}
          </div>
          {!isFocusMode && <Footer />}
        </div>
      </main>

      {/* RIGHT AI PANEL - Desktop only, hidden in focus mode */}
      {isOSShellContext && !hidePanels && <OSRightPanel />}

      {/* MICRO HUD - Shows during typing, minimal in focus mode */}
      <OSMicroHUD />

      {/* BOTTOM DOCK - Mobile only, hidden in focus mode */}
      {!isFocusMode && <OSBottomDock />}
    </div>
  );
}

export function OSLayout({ children }: OSLayoutProps) {
  return (
    <TypingSessionProvider>
      <OSLayoutInner>{children}</OSLayoutInner>
    </TypingSessionProvider>
  );
}
