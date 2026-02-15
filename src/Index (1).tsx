import { TypingTestBox } from "@/components/TypingTestBox";
import { DailyChallenges } from "@/components/DailyChallenges";
import { AdBanner } from "@/components/shared/AdBanner";
import { PremiumUpsell } from "@/components/shared/PremiumBadge";
import { ReferralWidget } from "@/components/ReferralSystem";
import { QuickStats } from "@/components/shared/QuickStats";

const Index = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 max-w-5xl mx-auto">
      {/* Quick Stats Row - Compact on mobile */}
      <QuickStats />
      
      {/* Main Typing Canvas - THE HERO */}
      <div className="w-full">
        <TypingTestBox />
      </div>
      
      {/* Secondary Content - Below main canvas on mobile, hidden on desktop (in right panel) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:hidden">
        <DailyChallenges />
        <ReferralWidget />
      </div>
      
      {/* Ad Banner - Only shows between sessions */}
      <div className="xl:hidden">
        <PremiumUpsell feature="Remove ads & unlock AI coaching" />
        <AdBanner type="sidebar" />
      </div>
    </div>
  );
};

export default Index;
