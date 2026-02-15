import { useState } from "react";
import { Trophy, Users, Clock, Coins, Zap, Crown, Timer, Target, Medal, Play, Calendar, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { tournaments } from "@/data/enterpriseFeaturesData";
import { useGamification } from "@/contexts/GamificationContext";
import { useTestHistoryContext } from "@/contexts/TestHistoryContext";
import { toast } from "sonner";
import { cn } from "@/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TournamentBracket } from "@/components/tournaments/TournamentBracket";
import Confetti from 'react-confetti';

const categoryColors: Record<string, string> = {
  beginner: "bg-green-500/20 text-green-400",
  intermediate: "bg-blue-500/20 text-blue-400",
  advanced: "bg-purple-500/20 text-purple-400",
  pro: "bg-amber-500/20 text-amber-400",
};

const typeColors: Record<string, string> = {
  live: "bg-red-500/20 text-red-400",
  scheduled: "bg-blue-500/20 text-blue-400",
  completed: "bg-gray-500/20 text-gray-400",
};

export default function Tournaments() {
  const {
    userStats, addCoins, addXP,
    joinedTournaments, joinTournament: ctxJoin,
    leaveTournament: ctxLeave
  } = useGamification();
  const { getBestWpm } = useTestHistoryContext();

  // Local state for active tournament session
  const [activeTourneyId, setActiveTourneyId] = useState<string | null>(null);
  const [tourneyPhase, setTourneyPhase] = useState<'registered' | 'quarter' | 'semi' | 'final' | 'won'>('registered');
  const [isSimulatingMatch, setIsSimulatingMatch] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const userWpm = getBestWpm();

  const handleJoin = (tournament: typeof tournaments[0]) => {
    if (joinedTournaments.includes(tournament.id)) {
      setActiveTourneyId(tournament.id);
      toast.info("Opening active tournament...");
      return;
    }

    if (tournament.entryFee > userStats.coins) {
      toast.error("Insufficient Funds", { description: `You need ${tournament.entryFee} coins to enter.` });
      return;
    }

    ctxJoin(tournament.id);
    addCoins(-tournament.entryFee);
    setActiveTourneyId(tournament.id);
    setTourneyPhase('registered');
    toast.success(`Registered for ${tournament.name}!`, { description: `-${tournament.entryFee} Coins deducted.` });
  };

  const simulateMatch = () => {
    setIsSimulatingMatch(true);
    // Sequence of dopamine inducing phases
    setTimeout(() => {
      setIsSimulatingMatch(false);
      if (tourneyPhase === 'registered') setTourneyPhase('quarter');
      else if (tourneyPhase === 'quarter') setTourneyPhase('semi');
      else if (tourneyPhase === 'semi') setTourneyPhase('final');
      else if (tourneyPhase === 'final') {
        setTourneyPhase('won');
        setShowConfetti(true);
        const prize = tournaments.find(t => t.id === activeTourneyId)?.prize || 1000;
        addCoins(prize);
        addXP(250);
        toast.success("TOURNAMENT SUPREMACY!", { description: `You won the championship and earned ${prize} Coins!` });
      }
    }, 2000);
  };

  const formatTimeLeft = (endTime: number) => {
    const diff = endTime - Date.now();
    if (diff <= 0) return "Ended";
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m left`;
  };

  const formatStartTime = (startTime: number) => {
    const date = new Date(startTime);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const liveTournaments = tournaments.filter(t => t.type === "live");
  const scheduledTournaments = tournaments.filter(t => t.type === "scheduled");

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative mb-8 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 p-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Tournaments</h1>
                <p className="text-muted-foreground">Compete with typists worldwide and win prizes!</p>
              </div>
            </div>
            <Badge className="bg-red-500 text-white animate-pulse">
              <Play className="w-3 h-3 mr-1 fill-white" />
              LIVE
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <Zap className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{liveTournaments.length}</div>
                  <div className="text-xs text-muted-foreground">Live Now</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{scheduledTournaments.length}</div>
                  <div className="text-xs text-muted-foreground">Upcoming</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Coins className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">390K</div>
                  <div className="text-xs text-muted-foreground">Coins Up For Grabs</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1.8K</div>
                  <div className="text-xs text-muted-foreground">Competing</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Tournament Tabs */}
      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="live" className="gap-2">
            <Play className="w-4 h-4 fill-current" />
            Live Tournaments
            <Badge className="bg-red-500 text-white text-xs">{liveTournaments.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming
            <Badge variant="secondary">{scheduledTournaments.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="my" className="gap-2">
            <Medal className="w-4 h-4" />
            My Tournaments
            <Badge variant="secondary">{joinedTournaments.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="elite" className="gap-2 text-amber-500 font-bold">
            <Crown className="w-4 h-4" />
            Elite League
            <Badge className="bg-amber-500 text-white border-0">VIP</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          {liveTournaments.map((tournament) => (
            <Card key={tournament.id} className="p-6 bg-card hover:border-primary/50 transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={typeColors[tournament.type]}>
                      <Play className="w-3 h-3 mr-1 fill-current" />
                      LIVE
                    </Badge>
                    <Badge className={categoryColors[tournament.category]}>
                      {tournament.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{tournament.name}</h3>
                  <p className="text-muted-foreground mb-4">{tournament.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{tournament.participants}/{tournament.maxParticipants}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Timer className="w-4 h-4 text-red-400" />
                      <span className="text-red-400">{formatTimeLeft(tournament.endTime)}</span>
                    </div>
                    {tournament.minWpm > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span>Min {tournament.minWpm} WPM</span>
                      </div>
                    )}
                    {tournament.entryFee > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-amber-500" />
                        <span>{tournament.entryFee} entry</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      <Trophy className="w-5 h-5" />
                      <span className="text-2xl font-bold">${tournament.prize.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Prize Pool</span>
                  </div>
                  <Progress value={(tournament.participants / tournament.maxParticipants) * 100} className="w-32 h-2" />
                  <Button
                    size="lg"
                    disabled={joinedTournaments.includes(tournament.id)}
                    onClick={() => handleJoin(tournament)}
                    className={joinedTournaments.includes(tournament.id) ? "" : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/20"}
                  >
                    {joinedTournaments.includes(tournament.id) ? (
                      <>
                        <Medal className="w-4 h-4 mr-2" />
                        Entered
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Enter Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {scheduledTournaments.map((tournament) => (
            <Card key={tournament.id} className="p-6 bg-card hover:border-primary/50 transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={typeColors[tournament.type]}>
                      <Clock className="w-3 h-3 mr-1" />
                      Upcoming
                    </Badge>
                    <Badge className={categoryColors[tournament.category]}>
                      {tournament.category}
                    </Badge>
                    {tournament.category === "pro" && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                        <Crown className="w-3 h-3 mr-1" />
                        Elite
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{tournament.name}</h3>
                  <p className="text-muted-foreground mb-4">{tournament.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>Starts: {formatStartTime(tournament.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{tournament.participants}/{tournament.maxParticipants} registered</span>
                    </div>
                    {tournament.minWpm > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span>Min {tournament.minWpm} WPM</span>
                      </div>
                    )}
                    {tournament.entryFee > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-amber-500" />
                        <span>{tournament.entryFee} coins entry</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      <Trophy className="w-5 h-5" />
                      <span className="text-2xl font-bold">${tournament.prize.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Prize Pool</span>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={joinedTournaments.includes(tournament.id)}
                    onClick={() => handleJoin(tournament)}
                  >
                    {joinedTournaments.includes(tournament.id) ? (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Registered
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="my" className="space-y-6">
          {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

          {activeTourneyId ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-white/5">
                <div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tight">
                    {tournaments.find(t => t.id === activeTourneyId)?.name}
                  </h2>
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                    Status: <span className="text-primary">{tourneyPhase}</span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" onClick={() => setActiveTourneyId(null)}>
                    Exit Arena
                  </Button>
                  {tourneyPhase !== 'won' && (
                    <Button
                      onClick={simulateMatch}
                      disabled={isSimulatingMatch}
                      className="bg-primary text-background font-black uppercase tracking-widest px-8"
                    >
                      {isSimulatingMatch ? <Zap className="w-4 h-4 animate-spin" /> : "Initiate Duel"}
                    </Button>
                  )}
                </div>
              </div>

              <Card className="p-8 bg-black/40 border-white/5 backdrop-blur-xl relative overflow-hidden min-h-[400px]">
                <AnimatePresence mode="wait">
                  {isSimulatingMatch ? (
                    <motion.div
                      key="sim"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 space-y-4"
                    >
                      <div className="text-4xl font-black italic uppercase animate-pulse">MATCH IN PROGRESS...</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest">DECODING INPUT VECTORS</div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <TournamentBracket status={tourneyPhase} />

                <div className="absolute bottom-4 left-4 flex gap-8">
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">My Potential</div>
                    <div className="text-xl font-black text-amber-500">{tournaments.find(t => t.id === activeTourneyId)?.prize} Coins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">My Streak</div>
                    <div className="text-xl font-black text-blue-400">3 Matches</div>
                  </div>
                </div>
              </Card>
            </div>
          ) : joinedTournaments.length === 0 ? (
            <Card className="p-12 text-center bg-white/[0.02] border-white/5">
              <Trophy className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">No active duels</h3>
              <p className="text-muted-foreground mb-6">Enter a tournament to claim your place in history.</p>
              <Button onClick={() => document.querySelector('[value="live"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                Browse Tournaments
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tournaments
                .filter(t => joinedTournaments.includes(t.id))
                .map((tournament) => (
                  <Card key={tournament.id} className="p-6 bg-white/[0.02] border-primary/20 hover:border-primary transition-all cursor-pointer" onClick={() => {
                    setActiveTourneyId(tournament.id);
                    setTourneyPhase('registered');
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Medal className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black uppercase tracking-tight text-foreground">{tournament.name}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">{tournament.category} League</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="border-primary/50 text-primary text-[9px] uppercase font-black">ENTRANT</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="elite" className="space-y-8">
          <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
              <Crown className="w-64 h-64 text-amber-500" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-amber-500 text-background font-black uppercase tracking-[0.2em] px-3 py-1">The High Table</Badge>
                <span className="text-amber-500/60 font-mono text-[10px]">Tier 0 Access Only</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic uppercase">Elite League <span className="text-amber-500 select-none">S1</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                Welcome to the absolute peak of TypingOS. Entry requires a baseline of **100+ WPM** in official standardized examinations.
              </p>

              {userWpm < 100 ? (
                <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-4">
                  <Zap className="w-10 h-10 text-rose-500" />
                  <div>
                    <h4 className="font-black uppercase text-sm">Access Denied</h4>
                    <p className="text-[11px] text-muted-foreground">Your current peak is **{userWpm} WPM**. Reach **100 WPM** to unlock Elite Tiers.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-6 bg-black/40 border-amber-500/30 backdrop-blur-xl">
                      <h4 className="font-black uppercase text-[10px] tracking-widest text-amber-500 mb-4">Upcoming Bout</h4>
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full bg-blue-500/20 mx-auto mb-2 flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-400" />
                          </div>
                          <span className="text-[10px] font-bold">You</span>
                        </div>
                        <span className="font-black italic text-2xl text-white/20">VS</span>
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full bg-rose-500/20 mx-auto mb-2 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-rose-400" />
                          </div>
                          <span className="text-[10px] font-bold">Ghost_X</span>
                        </div>
                      </div>
                      <Button className="w-full bg-amber-500 text-background font-black uppercase tracking-widest hover:bg-amber-600">Enter Arena</Button>
                    </Card>

                    <Card className="p-6 bg-black/40 border-white/5 backdrop-blur-xl flex flex-col justify-center items-center text-center space-y-2">
                      <Trophy className="w-8 h-8 text-white/20" />
                      <h4 className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Season Prize</h4>
                      <span className="text-3xl font-black text-white">25,000 Coins</span>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
