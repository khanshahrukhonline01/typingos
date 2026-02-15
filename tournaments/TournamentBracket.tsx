import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, User, Swords, Crown } from 'lucide-react';
import { cn } from "@/utils/utils";

interface MatchProps {
    p1: string;
    p2: string;
    winner?: string | null;
    isUserMatch?: boolean;
}

const BracketMatch = ({ p1, p2, winner, isUserMatch }: MatchProps) => (
    <div className={cn(
        "relative flex flex-col gap-1 w-40 p-2 rounded-xl border border-white/5 bg-black/20",
        isUserMatch && "border-primary/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
    )}>
        <div className={cn(
            "flex justify-between items-center px-2 py-1 rounded bg-white/5 text-[10px] font-bold uppercase",
            winner === p1 && "text-primary bg-primary/10",
            (winner && winner !== p1) && "opacity-30"
        )}>
            <span>{p1}</span>
            {winner === p1 && <Crown className="w-3 h-3 text-amber-500" />}
        </div>
        <div className={cn(
            "flex justify-between items-center px-2 py-1 rounded bg-white/5 text-[10px] font-bold uppercase",
            winner === p2 && "text-primary bg-primary/10",
            (winner && winner !== p2) && "opacity-30"
        )}>
            <span>{p2}</span>
            {winner === p2 && <Crown className="w-3 h-3 text-amber-500" />}
        </div>

        {/* Connector Line (Right) */}
        <div className="absolute top-1/2 -right-6 w-6 h-px bg-white/10" />
    </div>
);

export const TournamentBracket = ({ status }: { status: 'registered' | 'quarter' | 'semi' | 'final' | 'won' }) => {
    return (
        <div className="flex items-center justify-center gap-12 py-12 overflow-x-auto min-w-[800px]">
            {/* Quarter Finals */}
            <div className="flex flex-col gap-8">
                <BracketMatch p1="You" p2="Bot_Alpha" winner={status !== 'registered' ? "You" : undefined} isUserMatch />
                <BracketMatch p1="SpeedDemon" p2="TypistX" winner="SpeedDemon" />
                <BracketMatch p1="KeyMaster" p2="ProTyper" winner="KeyMaster" />
                <BracketMatch p1="NeonUser" p2="CyberBot" winner="NeonUser" />
            </div>

            {/* Semi Finals */}
            <div className="flex flex-col gap-20">
                <div className="relative">
                    <BracketMatch
                        p1="You" p2="SpeedDemon"
                        winner={['semi', 'final', 'won'].includes(status) ? "You" : undefined}
                        isUserMatch
                    />
                    <div className="absolute top-1/2 -left-6 w-6 h-px bg-white/10" />
                </div>
                <div className="relative">
                    <BracketMatch p1="KeyMaster" p2="NeonUser" winner="KeyMaster" />
                    <div className="absolute top-1/2 -left-6 w-6 h-px bg-white/10" />
                </div>
            </div>

            {/* Finals */}
            <div className="flex flex-col gap-8 relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-center animte-pulse">
                    <Trophy className="w-12 h-12 text-amber-500 mx-auto drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                </div>
                <BracketMatch
                    p1="You" p2="KeyMaster"
                    winner={status === 'won' ? "You" : undefined}
                    isUserMatch
                />
                <div className="absolute top-1/2 -left-6 w-6 h-px bg-white/10" />
            </div>
        </div>
    );
};
