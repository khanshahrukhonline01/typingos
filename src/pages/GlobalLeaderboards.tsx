import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '@/contexts/GamificationContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Trophy, Medal, Users, Shield,
    TrendingUp, Shell, Globe, Crown,
    ArrowUpRight, ArrowDownRight, Minus
} from "lucide-react";
import { cn } from "@/utils/utils";

const CLAN_RANKINGS = [
    { id: 'c1', name: 'Neon Strikers', tag: 'NEON', level: 42, xp: 250000, trend: 'up', members: 48, treasury: 150000 },
    { id: 'c3', name: 'Ether Kings', tag: 'ETH', level: 38, xp: 210000, trend: 'down', members: 50, treasury: 120000 },
    { id: 'c2', name: 'Keyboard Warriors', tag: 'KBW', level: 25, xp: 120000, trend: 'up', members: 32, treasury: 45000 },
    { id: 'c4', name: 'Void Walkers', tag: 'VOID', level: 22, xp: 95000, trend: 'stable', members: 28, treasury: 30000 },
    { id: 'c5', name: 'Data Drifters', tag: 'DATA', level: 18, xp: 72000, trend: 'up', members: 25, treasury: 15600 },
];

const PLAYER_RANKINGS = [
    { id: 'p1', username: 'SpeedDemon', seasonXP: 45200, seasonLevel: 45, wpm: 142, trend: 'up', country: 'US' },
    { id: 'p2', username: 'GhostWriter', seasonXP: 42100, seasonLevel: 42, wpm: 138, trend: 'stable', country: 'UK' },
    { id: 'p3', username: 'NeonKnight', seasonXP: 38500, seasonLevel: 38, wpm: 135, trend: 'up', country: 'JP' },
    { id: 'p4', username: 'TypingGod', seasonXP: 35000, seasonLevel: 35, wpm: 128, trend: 'down', country: 'CA' },
    { id: 'p5', username: 'Matrix_Fan', seasonXP: 31200, seasonLevel: 31, wpm: 125, trend: 'up', country: 'DE' },
];

export default function GlobalLeaderboards() {
    const { userStats, userClan } = useGamification();

    return (
        <div className="min-h-screen bg-background p-8 pt-20">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Globe className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">Global Rankings</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-white uppercase leading-none">
                            World <span className="text-primary">Conquest</span>
                        </h1>
                        <p className="text-muted-foreground max-w-md">
                            The ultimate ranking of the world's most elite clans and individual typists for Season 20.
                        </p>
                    </div>

                    <div className="flex gap-4 p-2 bg-muted/20 rounded-2xl border border-white/5">
                        <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                            <span className="text-[10px] font-black uppercase text-white/40 mb-1">Season Ends In</span>
                            <span className="text-xl font-bold font-mono text-primary">12d 04h 22m</span>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="clans" className="w-full">
                    <TabsList className="h-16 bg-muted/20 p-2 rounded-2xl border border-white/5 mb-8">
                        <TabsTrigger value="clans" className="rounded-xl px-8 font-black uppercase tracking-widest text-[11px] data-[state=active]:bg-primary data-[state=active]:text-background">
                            <Shield className="w-4 h-4 mr-2" /> Top Clans
                        </TabsTrigger>
                        <TabsTrigger value="players" className="rounded-xl px-8 font-black uppercase tracking-widest text-[11px] data-[state=active]:bg-primary data-[state=active]:text-background">
                            <Trophy className="w-4 h-4 mr-2" /> Season MVPs
                        </TabsTrigger>
                        <TabsTrigger value="hall" className="rounded-xl px-8 font-black uppercase tracking-widest text-[11px] data-[state=active]:bg-primary data-[state=active]:text-background">
                            <Crown className="w-4 h-4 mr-2" /> Hall of Fame
                        </TabsTrigger>
                    </TabsList>

                    {/* CLAN LEADERBOARD */}
                    <TabsContent value="clans" className="space-y-4">
                        <div className="grid grid-cols-12 px-8 mb-4 text-[10px] font-black uppercase text-white/30 tracking-widest">
                            <div className="col-span-1">Rank</div>
                            <div className="col-span-5">Clan Citadel</div>
                            <div className="col-span-2 text-center">Level</div>
                            <div className="col-span-2 text-center">Members</div>
                            <div className="col-span-2 text-right">Total XP</div>
                        </div>

                        <div className="space-y-3">
                            {CLAN_RANKINGS.map((clan, i) => (
                                <motion.div
                                    key={clan.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={cn(
                                        "grid grid-cols-12 items-center p-6 rounded-[1.5rem] border transition-all hover:scale-[1.01] hover:bg-white/5",
                                        i === 0 ? "bg-primary/10 border-primary/30" : "bg-muted/10 border-white/5",
                                        userClan?.id === clan.id && "ring-2 ring-primary ring-offset-4 ring-offset-background"
                                    )}
                                >
                                    <div className="col-span-1 flex items-center gap-4 font-black text-xl">
                                        {i === 0 ? <Crown className="text-yellow-400 w-6 h-6" /> : (i + 1)}
                                    </div>
                                    <div className="col-span-5 flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-muted border border-white/10 flex items-center justify-center text-3xl shadow-inner">
                                            {clan.tag.startsWith('NEON') ? '⚡' : '🛡️'}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-black uppercase tracking-tight text-white">{clan.name}</h3>
                                                <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-md">[{clan.tag}]</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {clan.trend === 'up' && <ArrowUpRight className="text-green-500 w-3 h-3" />}
                                                {clan.trend === 'down' && <ArrowDownRight className="text-red-500 w-3 h-3" />}
                                                {clan.trend === 'stable' && <Minus className="text-blue-500 w-3 h-3" />}
                                                <span className="text-[9px] font-bold text-white/30 uppercase">Global Trend</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-center font-black text-xl text-white">LV {clan.level}</div>
                                    <div className="col-span-2 text-center font-black text-xl text-white/60">{clan.members}</div>
                                    <div className="col-span-2 text-right">
                                        <div className="font-black text-xl text-primary">{clan.xp.toLocaleString()}</div>
                                        <div className="text-[9px] font-bold text-white/30 uppercase">Citadel XP</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* PLAYER LEADERBOARD */}
                    <TabsContent value="players" className="space-y-4">
                        <div className="grid grid-cols-12 px-8 mb-4 text-[10px] font-black uppercase text-white/30 tracking-widest">
                            <div className="col-span-1">Rank</div>
                            <div className="col-span-5">Typist Identity</div>
                            <div className="col-span-2 text-center">Season Level</div>
                            <div className="col-span-2 text-center">Avg WPM</div>
                            <div className="col-span-2 text-right">Season XP</div>
                        </div>

                        <div className="space-y-3">
                            {PLAYER_RANKINGS.map((player, i) => (
                                <motion.div
                                    key={player.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={cn(
                                        "grid grid-cols-12 items-center p-6 rounded-[1.5rem] border transition-all hover:scale-[1.01] hover:bg-white/5",
                                        i === 0 ? "bg-primary/10 border-primary/30" : "bg-muted/10 border-white/5"
                                    )}
                                >
                                    <div className="col-span-1 flex items-center gap-4 font-black text-xl">
                                        {i === 0 ? <Medal className="text-yellow-400 w-6 h-6" /> : (i + 1)}
                                    </div>
                                    <div className="col-span-5 flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-full bg-muted border border-white/10 flex items-center justify-center text-3xl shadow-inner overflow-hidden">
                                            <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${player.username}`} alt="avatar" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-black uppercase tracking-tight text-white">{player.username}</h3>
                                                <span className="text-[10px] font-bold text-white/30 px-2 py-0.5 bg-white/5 rounded-md">INC [{player.country}]</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {player.trend === 'up' && <ArrowUpRight className="text-green-500 w-3 h-3" />}
                                                {player.trend === 'down' && <ArrowDownRight className="text-red-500 w-3 h-3" />}
                                                {player.trend === 'stable' && <Minus className="text-blue-500 w-3 h-3" />}
                                                <span className="text-[9px] font-bold text-white/30 uppercase">Growth Vector</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-center font-black text-xl text-white">LV {player.seasonLevel}</div>
                                    <div className="col-span-2 text-center font-black text-xl text-primary">{player.wpm}</div>
                                    <div className="col-span-2 text-right">
                                        <div className="font-black text-xl text-white">{player.seasonXP.toLocaleString()}</div>
                                        <div className="text-[9px] font-bold text-white/30 uppercase">Points</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* HALL OF FAME */}
                    <TabsContent value="hall" className="h-64 flex flex-col items-center justify-center bg-muted/10 rounded-[2rem] border border-white/5 border-dashed gap-4 text-center">
                        <Crown className="w-12 h-12 text-primary opacity-20" />
                        <div className="space-y-1">
                            <h3 className="font-black uppercase text-white">Vault Restricted</h3>
                            <p className="text-xs text-muted-foreground">Previous season records are available to Pro Members only.</p>
                        </div>
                        <Button variant="outline" className="rounded-xl border-primary/30 text-primary">Upgrade Portal</Button>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
