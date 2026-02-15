
export type CoachPersona = 'sensei' | 'drill_sergeant' | 'hype_beast' | 'analytical_bot';

interface CoachProfile {
    id: CoachPersona;
    name: string;
    avatar: string;
    greeting: string;
    style: string;
}

export const COACH_PROFILES: Record<CoachPersona, CoachProfile> = {
    sensei: {
        id: 'sensei',
        name: 'Master Kenji',
        avatar: '🧘‍♂️',
        greeting: "Breathe in. Focus. Let us find flow in your keystrokes.",
        style: "Calm, philosophical, focuses on rhythm and accuracy."
    },
    drill_sergeant: {
        id: 'drill_sergeant',
        name: 'Sgt. Stryker',
        avatar: '🪖',
        greeting: "DROP AND GIVE ME 50 WORDS PER MINUTE! MOVE IT!",
        style: "Aggressive, high-energy, demands speed and discipline."
    },
    hype_beast: {
        id: 'hype_beast',
        name: 'Neon',
        avatar: '⚡',
        greeting: "Yo! Let's crush those high scores! You got this fam!",
        style: "Enthusiastic, uses slang, focuses on gamification and streaks."
    },
    analytical_bot: {
        id: 'analytical_bot',
        name: 'Unit 734',
        avatar: '🤖',
        greeting: "Initializing analysis protocols. Efficiency is paramount.",
        style: "Precise, data-driven, focuses on metrics and error patterns."
    }
};

export interface TypingAnalysis {
    weakKeys: string[];
    speedTrend: 'increasing' | 'decreasing' | 'stable';
    accuracyTrend: 'improving' | 'declining' | 'stable';
    recommendation: string;
    suggestedLesson: string;
}

export class AnalysisEngine {
    static analyzePerformance(history: any[], persona: CoachPersona): TypingAnalysis {
        // Mock analysis logic
        // In a real implementation, this would analyze the user's actual history data

        const weakKeys = ['q', 'z', 'p', '-']; // Mock weak keys
        const speedTrend = 'increasing';
        const accuracyTrend = 'stable';

        let recommendation = "";

        switch (persona) {
            case 'sensei':
                recommendation = "Your pinky finger hesitates on 'P'. Practice is the path to perfection.";
                break;
            case 'drill_sergeant':
                recommendation = "YOU'RE SLOWING DOWN ON THE PUNCTUATION! TIGHTEN IT UP!";
                break;
            case 'hype_beast':
                recommendation = "You're crushing it, but that 'Z' key is looking sus. Let's fix it for the win!";
                break;
            case 'analytical_bot':
                recommendation = "Detected 15% latency on right-hand periphery keys. Optimization required.";
                break;
        }

        return {
            weakKeys,
            speedTrend,
            accuracyTrend,
            recommendation,
            suggestedLesson: "Right Pinky Precision Drill"
        };
    }

    static analyzeGroupPerformance(users: any[], persona: CoachPersona): TypingAnalysis {
        // Mock group analysis logic
        const weakKeys = ['x', 'q', 'num-row'];
        const speedTrend = 'increasing';
        const accuracyTrend = 'stable';

        let recommendation = "";

        switch (persona) {
            case 'sensei':
                recommendation = "The class harmony is improving, but attention wavers on complex symbols.";
                break;
            case 'drill_sergeant':
                recommendation = "20% OF THE PLATOON IS LAGGING! WE NEED MORE DRILLS ON NUMBER ROWS!";
                break;
            case 'hype_beast':
                recommendation = "Squad is vibes, but we gotta boost that accuracy on different rows fam.";
                break;
            case 'analytical_bot':
                recommendation = "Aggregate efficiency up 12%. Detected collective deficit in numeric entry.";
                break;
        }

        return {
            weakKeys,
            speedTrend,
            accuracyTrend,
            recommendation,
            suggestedLesson: "Team Sync: Number Row Challenge"
        };
    }

    static generateLesson(weakKeys: string[]): string {
        // Mock lesson generation
        return `Practice these words: ${weakKeys.map(k => `${k}zz ${k}pp ${k}--`).join(' ')}`;
    }
}
