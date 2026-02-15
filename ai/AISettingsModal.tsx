
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { aiService } from "@/services/ai/AIService";
import { Bot, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { AIProviderId } from "@/services/ai/types";

interface AISettingsModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
}

export function AISettingsModal({ open, onOpenChange, children }: AISettingsModalProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined;
    const showOpen = isControlled ? open : internalOpen;
    const setShowOpen = isControlled && onOpenChange ? onOpenChange : setInternalOpen;

    const [keys, setKeys] = useState<Record<string, string>>({
        openai: "",
        google: "",
        deepseek: "",
        xai: ""
    });

    const [activeTab, setActiveTab] = useState<string>("openai");

    useEffect(() => {
        // Load existing keys (masked)
        const providers = aiService.getAllProviders();
        const loadedKeys: Record<string, string> = {};

        // Note: We can't actually retrieve keys back from the service easily due to security implementation details 
        // unless we exposed a method. For now, we will rely on checking if configured.
        // Real implementation would probably load from localStorage directly here for display editing.
        const storedConfig = localStorage.getItem('ai-service-config');
        if (storedConfig) {
            const config = JSON.parse(storedConfig);
            Object.keys(config).forEach(key => {
                if (config[key]?.apiKey) {
                    loadedKeys[key] = config[key].apiKey;
                }
            });
            setKeys(prev => ({ ...prev, ...loadedKeys }));
        }
    }, [showOpen]);

    const handleSave = (providerId: string) => {
        const key = keys[providerId];
        if (!key) {
            toast.error("Please enter an API Key");
            return;
        }

        try {
            aiService.saveConfig(providerId as AIProviderId, { apiKey: key });
            toast.success(`${providerId.charAt(0).toUpperCase() + providerId.slice(1)} configuration saved!`);
        } catch (error) {
            toast.error("Failed to save configuration");
        }
    };

    return (
        <Dialog open={showOpen} onOpenChange={setShowOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="icon">
                        <Bot className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-primary" />
                        AI Model Settings
                    </DialogTitle>
                    <DialogDescription>
                        Configure your API keys to enable AI features. Your keys are stored locally in your browser.
                    </DialogDescription>
                </DialogHeader>

                <Alert className="bg-muted/50 border-primary/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Security Note</AlertTitle>
                    <AlertDescription className="text-xs">
                        These keys are stored in your browser's LocalStorage. Do not use this on a public computer.
                    </AlertDescription>
                </Alert>

                <Tabs defaultValue="openai" value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="openai">OpenAI</TabsTrigger>
                        <TabsTrigger value="google">Gemini</TabsTrigger>
                        <TabsTrigger value="deepseek">DeepSeek</TabsTrigger>
                        <TabsTrigger value="xai">Grok</TabsTrigger>
                    </TabsList>

                    <div className="mt-6 space-y-4">
                        {Object.keys(keys).map((providerId) => (
                            <TabsContent key={providerId} value={providerId} className="space-y-4 mt-0">
                                <div className="grid gap-2">
                                    <Label htmlFor={`${providerId}-key`}>API Key</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id={`${providerId}-key`}
                                            type="password"
                                            placeholder={`sk-...`}
                                            value={keys[providerId] || ""}
                                            onChange={(e) => setKeys(prev => ({ ...prev, [providerId]: e.target.value }))}
                                            className="flex-1"
                                        />
                                        <Button onClick={() => handleSave(providerId)} size="sm" className="gap-2">
                                            <Save className="w-4 h-4" />
                                            Save
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">
                                        {providerId === 'openai' && "Get your key from platform.openai.com"}
                                        {providerId === 'google' && "Get your key from makersuite.google.com"}
                                        {providerId === 'deepseek' && "Get your key from platform.deepseek.com"}
                                        {providerId === 'xai' && "Get your key from console.x.ai"}
                                    </p>
                                </div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
