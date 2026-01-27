import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useDirection } from '../contexts/DirectionContext';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const { toggleDirection } = useDirection();

    return (
        <button
            onClick={toggleDirection}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            aria-label="Toggle Language"
        >
            <Globe size={16} />
            <span>{i18n.language === 'en' ? 'English' : 'עברית'}</span>
        </button>
    );
};
