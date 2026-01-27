import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Direction = 'ltr' | 'rtl';

interface DirectionContextType {
    direction: Direction;
    toggleDirection: () => void; // Kept for compatibility, now changes language
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export const DirectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { i18n } = useTranslation();
    const [direction, setDirection] = useState<Direction>(
        i18n.language === 'he' ? 'rtl' : 'ltr'
    );

    useEffect(() => {
        const newDir = i18n.language === 'he' ? 'rtl' : 'ltr';
        setDirection(newDir);
        document.documentElement.dir = newDir;
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    const toggleDirection = () => {
        const newLang = i18n.language === 'en' ? 'he' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <DirectionContext.Provider value={{ direction, toggleDirection }}>
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
