import { Bot, Sparkles, TrendingUp, Target, Lightbulb, MessageCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/contexts/GamificationContext";
import { useTestHistoryContext } from "@/contexts/TestHistoryContext";
import { useState, useEffect } from "react";
import { aiService } from "@/services/ai/AIService";

interface AITip {
  icon: React.ElementType;
  title: string;
  message: string;
  type: "improvement" | "encouragement" | "technique" | "goal";
}

export function AICoach({ context = "general" }: { context?: "general" | "typing" | "games" | "lessons" | "achievements" | "statistics" | "exams" }) {
  const { userStats } = useGamification();
  const { getAverageWpm, getBestWpm, getAverageAccuracy, results } = useTestHistoryContext();
  const [currentTip, setCurrentTip] = useState<AITip | null>(null);
  const [isLlmLoading, setIsLlmLoading] = useState(false);

  const fetchLlmTip = async () => {
    setIsLlmLoading(true);
    try {
      const avgWpm = getAverageWpm();
      const accuracy = getAverageAccuracy();
      const stats = `Current Stats: ${avgWpm} AVG WPM, ${accuracy}% Accuracy, ${userStats.streak} day streak. Context: ${context}.`;

      const response = await aiService.generateText({
        modelId: 'openai:gpt-3.5-turbo',
        systemPrompt: "You are a world-class typing coach. Provide one short, punchy, actionable tip (max 20 words) for the user based on their stats. Be encouraging but direct. Output ONLY the tip text.",
        prompt: stats,
        temperature: 0.7
      });

      if (response) {
        setCurrentTip({
          icon: Bot,
          title: "AI Analysis",
          message: response,
          type: "improvement"
        });
        return;
      }
    } catch (error) {
      console.warn("AI Coach failed to reach LLM, falling back to static rules.");
    } finally {
      setIsLlmLoading(false);
    }

    // Fallback to static tips
    const tips = generateTips();
    if (tips.length > 0) {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }
  };

  useEffect(() => {
    fetchLlmTip();
  }, [context, results.length]);

  const generateTips = (): AITip[] => {
    const avgWpm = getAverageWpm();
    const bestWpm = getBestWpm();
    const avgAccuracy = getAverageAccuracy();
    const testCount = results.length;

    const tips: AITip[] = [];

    // Context-specific tips
    if (context === "typing") {
      if (avgAccuracy < 90) {
        tips.push({
          icon: Target,
          title: "Focus on Accuracy",
          message: "Your accuracy is at " + avgAccuracy + "%. Try slowing down a bit - accuracy builds speed over time!",
          type: "improvement",
        });
      }
      if (bestWpm > avgWpm + 20) {
        tips.push({
          icon: TrendingUp,
          title: "Consistency Opportunity",
          message: `You've hit ${bestWpm} WPM before! With practice, you can make this your average.`,
          type: "encouragement",
        });
      }
      tips.push({
        icon: Lightbulb,
        title: "Pro Tip",
        message: "Keep your eyes on the text, not your keyboard. Trust your muscle memory!",
        type: "technique",
      });
    }

    if (context === "games") {
      tips.push({
        icon: Sparkles,
        title: "Game Strategy",
        message: "Word Blitz is great for building reflexes. Try Space Race for sustained speed practice!",
        type: "technique",
      });
    }

    if (context === "lessons") {
      tips.push({
        icon: Bot,
        title: "Learning Path",
        message: "Complete lessons in order for best results. Each builds on the previous skills!",
        type: "technique",
      });
    }

    if (context === "achievements") {
      const unlockedPct = Math.round((userStats.level / 50) * 100);
      tips.push({
        icon: Target,
        title: "Achievement Hunter",
        message: `You're level ${userStats.level}! Keep practicing to unlock more achievements.`,
        type: "goal",
      });
    }

    if (context === "statistics") {
      if (testCount > 10) {
        tips.push({
          icon: TrendingUp,
          title: "Progress Analysis",
          message: `Based on ${testCount} tests, you're averaging ${avgWpm} WPM. Great consistency!`,
          type: "encouragement",
        });
      }
    }

    if (context === "exams") {
      tips.push({
        icon: Bot,
        title: "Exam Prep",
        message: "Practice with timed tests matching your exam duration. Stamina matters!",
        type: "technique",
      });
    }

    // General tips
    tips.push({
      icon: Lightbulb,
      title: "Quick Tip",
      message: "Take short breaks every 20 minutes to prevent fatigue and maintain accuracy.",
      type: "technique",
    });

    if (userStats.streak >= 3) {
      tips.push({
        icon: Sparkles,
        title: "Streak Power!",
        message: `Amazing ${userStats.streak}-day streak! Your dedication is paying off.`,
        type: "encouragement",
      });
    }

    return tips;
  };

  if (!currentTip) return null;

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground text-sm">AI Coach</span>
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {currentTip.title}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{currentTip.message}</p>
        </div>
      </div>
    </Card>
  );
}

export function AIInsightCard({ wpm, accuracy, mistakes }: { wpm: number; accuracy: number; mistakes: string[] }) {
  const getInsight = () => {
    if (accuracy >= 98 && wpm >= 80) {
      return "Outstanding performance! You're typing like a pro. Consider challenging yourself with harder texts.";
    }
    if (accuracy < 90) {
      return `Focus on accuracy first. You mistyped: ${mistakes.slice(0, 3).join(", ")}. Practice these keys specifically.`;
    }
    if (wpm < 40) {
      return "Building a solid foundation! Try the home row lessons to improve your base speed.";
    }
    if (wpm >= 60 && accuracy >= 95) {
      return "Great balance of speed and accuracy! You're ready to push for higher WPM.";
    }
    return "Keep practicing! Consistency is key to improvement.";
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
      <Bot className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-foreground text-sm mb-1">AI Analysis</p>
        <p className="text-sm text-muted-foreground">{getInsight()}</p>
      </div>
    </div>
  );
}
