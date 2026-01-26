import { useEffect, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, User, Settings2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { coachService } from '../lib/api';

export const SettingsPage = () => {
    const { t, i18n } = useTranslation();
    const [, startTransition] = useTransition();
    const { user } = useAuth();

    const [coach, setCoach] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            fetchCoach();
        }
    }, [user]);

    const fetchCoach = async () => {
        try {
            // In a real app, user.id would be the coach ID
            // For now, we take 'trit-default' or the first coach if no user.id match
            const data = await coachService.get(user?.id || 'trit-default');
            setCoach(data);
        } catch (error) {
            console.error('Failed to fetch coach:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!coach) return;
        setSaving(true);
        try {
            await coachService.update(coach.id, {
                name: coach.name,
                descriptor: coach.descriptor,
                programs_enabled: coach.programs_enabled
            });
            alert(t('settings.saved_success') || 'Settings saved successfully');
        } catch (error) {
            console.error('Failed to save profile:', error);
            alert('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    const changeLanguage = (lng: string) => {
        startTransition(() => {
            i18n.changeLanguage(lng);
            const dir = lng === 'he' ? 'rtl' : 'ltr';
            document.documentElement.dir = dir;
            document.documentElement.lang = lng;
        });
    };

    if (loading) return <div className="p-8 text-center">{t('common.loading')}</div>;

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light">
            <header className="border-b border-[#dfe2e2] bg-white px-8 py-3 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="text-primary">
                        <Settings2 size={24} />
                    </div>
                    <h2 className="text-text-main text-lg font-bold">{t('settings.title')}</h2>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Language Settings */}
                    <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
                            <Languages className="text-primary" size={20} />
                            <h3 className="font-bold text-text-main">{t('settings.language_preferences')}</h3>
                        </div>
                        <div className="p-6">
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
                    </section>

                    {/* Coach Profile */}
                    <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <form onSubmit={handleSaveProfile}>
                            <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
                                <User className="text-primary" size={20} />
                                <h3 className="font-bold text-text-main">{t('settings.coach_profile')}</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings.name')}</label>
                                    <input
                                        type="text"
                                        value={coach?.name || ''}
                                        onChange={e => setCoach({ ...coach, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings.descriptor')}</label>
                                    <input
                                        type="text"
                                        value={coach?.descriptor || ''}
                                        onChange={e => setCoach({ ...coach, descriptor: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                        placeholder="e.g. Balanced • All Macros"
                                    />
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-0.5">
                                            <p className="text-text-main font-bold">{t('settings.enable_programs')}</p>
                                            <p className="text-text-muted text-xs">{t('settings.enable_programs_hint')}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setCoach({ ...coach, programs_enabled: !coach?.programs_enabled })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${coach?.programs_enabled ? 'bg-primary' : 'bg-gray-200'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${coach?.programs_enabled ? (i18n.dir() === 'rtl' ? '-translate-x-6' : 'translate-x-6') : (i18n.dir() === 'rtl' ? '-translate-x-1' : 'translate-x-1')}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    {saving ? t('settings.saving') : t('settings.save_changes')}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};
