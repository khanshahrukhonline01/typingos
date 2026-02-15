import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Package, Sparkles, Star, Crown, Zap, Gift,
    Key, X, ChevronRight, Volume2
} from "lucide-react";
import { cn } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import confetti from "canvas-confetti";

import { useGamification } from "@/contexts/GamificationContext";
import { COSMETIC_ITEMS, RARITY_CONFIG, Cosmetic, CosmeticRarity, CosmeticType } from "@/data/cosmetics";


interface GachaSystemProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GachaSystem: React.FC<GachaSystemProps> = ({
    isOpen,
    onClose
}) => {
    const { userStats, consumeCrate, unlockCosmetic } = useGamification();
    const cratesAvailable = userStats.cratesAvailable;
    const { t } = useTranslation();
    const [phase, setPhase] = useState<"ready" | "shaking" | "opening" | "reveal">("ready");
    const [revealedItem, setRevealedItem] = useState<Cosmetic | null>(null);

    // Roll for a random item based on rarity weights
    const rollLoot = (): Cosmetic => {
        const totalWeight = Object.values(RARITY_CONFIG).reduce((sum, r) => sum + r.weight, 0);
        let roll = Math.random() * totalWeight;

        let selectedRarity: CosmeticRarity = "common";
        for (const [rarity, config] of Object.entries(RARITY_CONFIG)) {
            roll -= config.weight;
            if (roll <= 0) {
                selectedRarity = rarity as CosmeticRarity;
                break;
            }
        }

        const rarityItems = COSMETIC_ITEMS.filter(item => item.rarity === selectedRarity);
        return rarityItems[Math.floor(Math.random() * rarityItems.length)];
    };

    const handleOpenCrate = () => {
        if (!consumeCrate()) {
            toast.error(t("No crates available!"));
            return;
        }

        // Phase 1: Shaking
        setPhase("shaking");

        // Phase 2: Opening (after 1.5s)
        setTimeout(() => {
            setPhase("opening");
        }, 1500);

        // Phase 3: Reveal (after 3s total)
        setTimeout(() => {
            const item = rollLoot();
            setRevealedItem(item);
            setPhase("reveal");
            unlockCosmetic(item.id);

            // Trigger confetti for epic/legendary
            if (item.rarity === "epic" || item.rarity === "legendary") {
                confetti({
                    particleCount: item.rarity === "legendary" ? 200 : 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: item.rarity === "legendary"
                        ? ["#ffd700", "#ffaa00", "#ff8800"]
                        : ["#a855f7", "#7c3aed", "#6366f1"]
                });
            }
        }, 3000);
    };

    const handleClose = () => {
        setPhase("ready");
        setRevealedItem(null);
        onClose();
    };

    const getRarityLabel = (rarity: CosmeticRarity) => {
        return rarity.charAt(0).toUpperCase() + rarity.slice(1);
    };

    const getTypeIcon = (type: CosmeticType) => {
        switch (type) {
            case "keycap": return "⌨️";
            case "sound": return "🔊";
            case "particle": return "✨";
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
                onClick={phase === "ready" || phase === "reveal" ? handleClose : undefined}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative max-w-lg w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    {(phase === "ready" || phase === "reveal") && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -top-12 right-0 text-white/50 hover:text-white"
                            onClick={handleClose}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    )}

                    {/* READY PHASE */}
                    {phase === "ready" && (
                        <motion.div className="text-center space-y-6">
                            <div className="inline-flex p-6 rounded-full bg-primary/20 mb-4">
                                <Package className="w-16 h-16 text-primary" />
                            </div>

                            <h1 className="text-4xl font-black uppercase tracking-tighter">
                                {t("Mystery Crate")}
                            </h1>

                            <p className="text-muted-foreground">
                                {t("Open to reveal exclusive cosmetics!")}
                            </p>

                            <div className="flex justify-center gap-4 text-sm">
                                <Badge className="bg-gray-500/20 text-gray-400">60% Common</Badge>
                                <Badge className="bg-blue-500/20 text-blue-400">25% Rare</Badge>
                                <Badge className="bg-purple-500/20 text-purple-400">12% Epic</Badge>
                                <Badge className="bg-yellow-500/20 text-yellow-400">3% Legendary</Badge>
                            </div>

                            <Card className="p-4 bg-secondary/20 border-primary/30">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">{t("Crates Available")}</span>
                                    <span className="text-2xl font-black text-primary">{cratesAvailable}</span>
                                </div>
                            </Card>

                            <Button
                                size="lg"
                                onClick={handleOpenCrate}
                                disabled={cratesAvailable <= 0}
                                className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-lg px-12 py-6 font-black uppercase tracking-wider gap-2"
                            >
                                <Gift className="w-5 h-5" />
                                {t("Open Crate")}
                            </Button>
                        </motion.div>
                    )}

                    {/* SHAKING PHASE */}
                    {phase === "shaking" && (
                        <motion.div
                            className="text-center"
                            animate={{
                                x: [0, -10, 10, -10, 10, -5, 5, 0],
                                rotate: [0, -5, 5, -5, 5, -2, 2, 0]
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: 3,
                                ease: "easeInOut"
                            }}
                        >
                            <motion.div
                                className="inline-flex p-8 rounded-3xl bg-gradient-to-br from-primary/30 to-purple-500/30 border border-primary/50"
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(var(--primary), 0.3)",
                                        "0 0 60px rgba(var(--primary), 0.6)",
                                        "0 0 20px rgba(var(--primary), 0.3)"
                                    ]
                                }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <Package className="w-24 h-24 text-primary" />
                            </motion.div>
                            <p className="mt-6 text-xl font-bold text-primary animate-pulse">
                                {t("Opening...")}
                            </p>
                        </motion.div>
                    )}

                    {/* OPENING PHASE */}
                    {phase === "opening" && (
                        <motion.div
                            className="text-center"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.2, 1.5, 2] }}
                            transition={{ duration: 1.5 }}
                        >
                            <motion.div
                                className="inline-flex p-8 rounded-3xl bg-gradient-to-br from-primary/50 to-purple-500/50"
                                animate={{
                                    opacity: [1, 0.8, 0.6, 0],
                                    rotate: [0, 180, 360, 720]
                                }}
                                transition={{ duration: 1.5 }}
                            >
                                <Sparkles className="w-24 h-24 text-white" />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* REVEAL PHASE */}
                    {phase === "reveal" && revealedItem && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="text-center space-y-6"
                        >
                            {/* Rarity Banner */}
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Badge
                                    className={cn(
                                        "text-lg px-6 py-2 font-black uppercase tracking-widest",
                                        RARITY_CONFIG[revealedItem.rarity].bg,
                                        RARITY_CONFIG[revealedItem.rarity].color
                                    )}
                                >
                                    {revealedItem.rarity === "legendary" && <Crown className="w-5 h-5 mr-2" />}
                                    {revealedItem.rarity === "epic" && <Star className="w-5 h-5 mr-2" />}
                                    {getRarityLabel(revealedItem.rarity)}
                                </Badge>
                            </motion.div>

                            {/* Item Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className={cn(
                                    "inline-flex p-8 rounded-3xl text-6xl",
                                    RARITY_CONFIG[revealedItem.rarity].bg,
                                    "shadow-lg",
                                    RARITY_CONFIG[revealedItem.rarity].glow
                                )}
                            >
                                {revealedItem.icon}
                            </motion.div>

                            {/* Item Name */}
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className={cn(
                                    "text-3xl font-black",
                                    RARITY_CONFIG[revealedItem.rarity].color
                                )}
                            >
                                {revealedItem.name}
                            </motion.h2>

                            {/* Item Type & Description */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="space-y-2"
                            >
                                <Badge variant="outline" className="text-xs uppercase tracking-wider">
                                    {getTypeIcon(revealedItem.type)} {revealedItem.type}
                                </Badge>
                                <p className="text-muted-foreground">{revealedItem.description}</p>
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex justify-center gap-4 pt-4"
                            >
                                {cratesAvailable > 1 && (
                                    <Button
                                        size="lg"
                                        onClick={() => {
                                            setPhase("ready");
                                            setRevealedItem(null);
                                        }}
                                        className="gap-2"
                                    >
                                        <Gift className="w-4 h-4" />
                                        {t("Open Another")} ({cratesAvailable - 1})
                                    </Button>
                                )}
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={handleClose}
                                    className="gap-2"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                    {t("Continue")}
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GachaSystem;
