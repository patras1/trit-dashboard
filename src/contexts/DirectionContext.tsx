import React, { createContext, useContext, useState, useEffect } from 'react';

type Direction = 'ltr' | 'rtl';

interface DirectionContextType {
    direction: Direction;
    setDirection: (dir: Direction) => void;
    toggleDirection: () => void;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export const DirectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [direction, setDirectionState] = useState<Direction>(() => {
        // Get from localStorage or default to ltr
        const saved = localStorage.getItem('app-direction');
        return (saved === 'rtl' || saved === 'ltr') ? saved : 'ltr';
    });

    useEffect(() => {
        // Apply direction to document
        document.documentElement.dir = direction;
        document.documentElement.lang = direction === 'rtl' ? 'he' : 'en';

        // Save to localStorage
        localStorage.setItem('app-direction', direction);
    }, [direction]);

    const setDirection = (dir: Direction) => {
        setDirectionState(dir);
    };

    const toggleDirection = () => {
        setDirectionState(prev => prev === 'ltr' ? 'rtl' : 'ltr');
    };

    return (
        <DirectionContext.Provider value={{ direction, setDirection, toggleDirection }}>
            {children}
        </DirectionContext.Provider>
    );
};

export const useDirection = () => {
    const context = useContext(DirectionContext);
    if (!context) {
        throw new Error('useDirection must be used within DirectionProvider');
    }
    return context;
};
