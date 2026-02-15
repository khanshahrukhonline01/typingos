import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Wallet {
    coins: number;
    gems: number;
}

interface Item {
    id: string;
    name: string;
    type: 'keyboard' | 'sound' | 'effect' | 'ticket';
    price: number;
    currency: 'coins' | 'gems';
    owned: boolean;
}

interface EconomyContextType {
    wallet: Wallet;
    inventory: string[]; // List of owned item IDs
    addCurrency: (amount: number, type: 'coins' | 'gems') => void;
    spendCurrency: (amount: number, type: 'coins' | 'gems') => boolean;
    purchaseItem: (item: Item) => void;
    hasItem: (itemId: string) => boolean;
}

const EconomyContext = createContext<EconomyContextType | undefined>(undefined);

export const useEconomy = () => {
    const context = useContext(EconomyContext);
    if (!context) {
        throw new Error('useEconomy must be used within an EconomyProvider');
    }
    return context;
};

export const EconomyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize from localStorage or default
    const [wallet, setWallet] = useState<Wallet>(() => {
        const saved = localStorage.getItem('typingos_wallet');
        return saved ? JSON.parse(saved) : { coins: 1500, gems: 50 };
    });

    const [inventory, setInventory] = useState<string[]>(() => {
        const saved = localStorage.getItem('typingos_inventory');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('typingos_wallet', JSON.stringify(wallet));
    }, [wallet]);

    useEffect(() => {
        localStorage.setItem('typingos_inventory', JSON.stringify(inventory));
    }, [inventory]);

    const addCurrency = (amount: number, type: 'coins' | 'gems') => {
        setWallet(prev => ({
            ...prev,
            [type]: prev[type] + amount
        }));
        toast.success(`Earned ${amount} ${type}!`);
    };

    const spendCurrency = (amount: number, type: 'coins' | 'gems'): boolean => {
        if (wallet[type] >= amount) {
            setWallet(prev => ({
                ...prev,
                [type]: prev[type] - amount
            }));
            return true;
        }
        return false;
    };

    const purchaseItem = (item: Item) => {
        if (inventory.includes(item.id)) {
            toast.info("You already own this item!");
            return;
        }

        if (spendCurrency(item.price, item.currency)) {
            setInventory(prev => [...prev, item.id]);
            toast.success(`Purchased ${item.name}!`);
        } else {
            toast.error(`Not enough ${item.currency}!`);
        }
    };

    const hasItem = (itemId: string) => inventory.includes(itemId);

    return (
        <EconomyContext.Provider value={{ wallet, inventory, addCurrency, spendCurrency, purchaseItem, hasItem }}>
            {children}
        </EconomyContext.Provider>
    );
};
