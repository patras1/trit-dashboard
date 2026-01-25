import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Languages } from 'lucide-react';

export const SettingsPage = () => {
    const { t, i18n } = useTranslation();
    const [, startTransition] = useTransition();

    const changeLanguage = (lng: string) => {
        startTransition(() => {
            i18n.changeLanguage(lng);
            // Optionally update text direction based on language
            const dir = lng === 'he' ? 'rtl' : 'ltr';
            document.documentElement.dir = dir;
            document.documentElement.lang = lng;
        });
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light">
            {/* Header */}
            <header className="border-b border-[#dfe2e2] bg-white px-8 py-3 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="text-primary">
                        <Languages size={24} />
                    </div>
                    <h2 className="text-text-main text-lg font-bold">{t('settings.title')}</h2>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="max-w-2xl space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold text-text-main mb-2">{t('settings.title')}</h1>
                        <p className="text-text-muted">{t('settings.general')}</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <Globe size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-text-main mb-1">{t('settings.language')}</h3>
                                <p className="text-sm text-text-muted mb-4">{t('settings.select_language')}</p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => changeLanguage('en')}
                                        className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${i18n.language === 'en'
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => changeLanguage('he')}
                                        className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all ${i18n.language === 'he'
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        עברית
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
