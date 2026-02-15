import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    angle: number;
}

export const QuantumParticles: React.FC<{ x: number; y: number; trigger: any }> = ({ x, y, trigger }) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        if (!trigger) return;

        const colors = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#fbbf24"];
        const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
            id: Date.now() + i,
            x,
            y,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 2,
            angle: (Math.PI * 2 * i) / 8 + (Math.random() * 0.5),
        }));

        setParticles(prev => [...prev, ...newParticles].slice(-40));

        // Cleanup after animation
        const timeout = setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.includes(p)));
        }, 1000);

        return () => clearTimeout(timeout);
    }, [trigger]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[60]">
            <AnimatePresence>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{
                            x: p.x,
                            y: p.y,
                            opacity: 1,
                            scale: 1,
                            rotate: 0
                        }}
                        animate={{
                            x: p.x + Math.cos(p.angle) * 100,
                            y: p.y + Math.sin(p.angle) * 100,
                            opacity: 0,
                            scale: 0,
                            rotate: 360
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute rounded-sm blur-[1px]"
                        style={{
                            width: p.size,
                            height: p.size,
                            background: p.color,
                            boxShadow: `0 0 10px ${p.color}`,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
