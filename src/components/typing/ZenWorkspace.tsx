import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
    Monitor, Volume2, VolumeX, Pause, Play,
    Crown, X, ChevronDown, Settings, Lock
} from "lucide-react";
import { cn } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { useGamification } from "@/contexts/GamificationContext";

export interface AmbientEnvironment {
    id: string;
    name: string;
    description: string;
    videoUrl: string;
    audioUrl: string;
    thumbnail: string;
    isPremium: boolean;
    color: string;
}

const AMBIENT_ENVIRONMENTS: AmbientEnvironment[] = [
    {
        id: "rainy_cafe",
        name: "Rainy Café",
        description: "Cozy coffee shop with rain outside",
        videoUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&h=1080&fit=crop",
        audioUrl: "https://cdn.freesound.org/previews/531/531947_9497060-lq.mp3",
        thumbnail: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&fit=crop",
        isPremium: false,
        color: "from-amber-900/50 to-stone-900/50"
    },
    {
        id: "cyberpunk_city",
        name: "Cyberpunk City",
        description: "Neon-lit futuristic metropolis",
        videoUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop",
        audioUrl: "https://cdn.freesound.org/previews/466/466677_4397472-lq.mp3",
        thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        isPremium: false,
        color: "from-purple-900/50 to-cyan-900/50"
    },
    {
        id: "forest_stream",
        name: "Forest Stream",
        description: "Peaceful woodland with flowing water",
        videoUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&h=1080&fit=crop",
        audioUrl: "https://cdn.freesound.org/previews/531/531584_9497060-lq.mp3",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop",
        isPremium: true,
        color: "from-green-900/50 to-emerald-900/50"
    },
    {
        id: "ocean_waves",
        name: "Ocean Waves",
        description: "Calming beach with waves",
        videoUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&h=1080&fit=crop",
        audioUrl: "https://cdn.freesound.org/previews/467/467090_4397472-lq.mp3",
        thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=300&fit=crop",
        isPremium: true,
        color: "from-blue-900/50 to-teal-900/50"
    },
    {
        id: "space_station",
        name: "Space Station",
        description: "Orbiting Earth in zero gravity",
        videoUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=1080&fit=crop",
        audioUrl: "https://cdn.freesound.org/previews/531/531947_9497060-lq.mp3",
        thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
        isPremium: true,
        color: "from-slate-900/50 to-indigo-900/50"
    }
];

interface ZenWorkspaceProps {
    children: React.ReactNode;
    isActive?: boolean;
}

export const ZenWorkspace: React.FC<ZenWorkspaceProps> = ({ children, isActive = false }) => {
    const { t } = useTranslation();
    const { userStats } = useGamification();
    const audioRef = useRef<HTMLAudioElement>(null);

    const [selectedEnv, setSelectedEnv] = useState<AmbientEnvironment>(AMBIENT_ENVIRONMENTS[0]);
    const [showSelector, setShowSelector] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [volume, setVolume] = useState([50]);
    const [focusMode, setFocusMode] = useState(false);

    // Handle audio playback
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume[0] / 100;
        }
    }, [volume]);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isAudioPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => {
                    // Autoplay blocked - user needs to interact first
                });
            }
            setIsAudioPlaying(!isAudioPlaying);
        }
    };

    const selectEnvironment = (env: AmbientEnvironment) => {
        if (env.isPremium && !userStats.isPremium) {
            return; // Block premium for free users
        }
        setSelectedEnv(env);
        setShowSelector(false);
        setIsAudioPlaying(false);
    };

    if (!isActive) return <>{children}</>;

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${selectedEnv.videoUrl})` }}
            />

            {/* Gradient Overlay */}
            <div className={cn(
                "fixed inset-0 z-[1] bg-gradient-to-b transition-all duration-1000",
                selectedEnv.color
            )} />

            {/* Focus Mode Overlay */}
            <AnimatePresence>
                {focusMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2] bg-black/60 backdrop-blur-sm pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={selectedEnv.audioUrl}
                loop
                preload="metadata"
            />

            {/* Control Panel */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50]">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-3 p-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10"
                >
                    {/* Environment Selector */}
                    <div className="relative">
                        <Button
                            variant="ghost"
                            className="gap-2 text-white/80 hover:text-white hover:bg-white/10"
                            onClick={() => setShowSelector(!showSelector)}
                        >
                            <Monitor className="w-4 h-4" />
                            <span className="text-sm font-medium">{selectedEnv.name}</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", showSelector && "rotate-180")} />
                        </Button>

                        {/* Dropdown */}
                        <AnimatePresence>
                            {showSelector && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full left-0 mb-2 w-72 p-2 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10"
                                >
                                    <div className="grid gap-1">
                                        {AMBIENT_ENVIRONMENTS.map(env => {
                                            const isLocked = env.isPremium && !userStats.isPremium;
                                            return (
                                                <button
                                                    key={env.id}
                                                    onClick={() => selectEnvironment(env)}
                                                    disabled={isLocked}
                                                    className={cn(
                                                        "flex items-center gap-3 p-2 rounded-lg transition-all text-left",
                                                        selectedEnv.id === env.id
                                                            ? "bg-primary/20 text-white"
                                                            : "hover:bg-white/10 text-white/70 hover:text-white",
                                                        isLocked && "opacity-50 cursor-not-allowed"
                                                    )}
                                                >
                                                    <img
                                                        src={env.thumbnail}
                                                        alt={env.name}
                                                        className="w-12 h-8 rounded object-cover"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium truncate">{env.name}</span>
                                                            {env.isPremium && (
                                                                isLocked
                                                                    ? <Lock className="w-3 h-3 text-yellow-500" />
                                                                    : <Crown className="w-3 h-3 text-yellow-500" />
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] text-white/50">{env.description}</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="w-px h-6 bg-white/20" />

                    {/* Audio Controls */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/80 hover:text-white hover:bg-white/10"
                        onClick={toggleAudio}
                    >
                        {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>

                    <div className="w-24">
                        <Slider
                            value={volume}
                            onValueChange={setVolume}
                            max={100}
                            step={1}
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="w-px h-6 bg-white/20" />

                    {/* Focus Mode Toggle */}
                    <Button
                        variant={focusMode ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                            "gap-2 text-sm",
                            focusMode
                                ? "bg-primary text-white"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                        )}
                        onClick={() => setFocusMode(!focusMode)}
                    >
                        <Settings className="w-4 h-4" />
                        {t("Focus")}
                    </Button>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="relative z-[10]">
                {children}
            </div>
        </div>
    );
};

export default ZenWorkspace;
