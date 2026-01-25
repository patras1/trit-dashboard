import { useState, useEffect } from 'react';
import { coachService } from '../lib/api';
import { Edit, ChevronRight, ChevronLeft } from 'lucide-react';
import { IdentityTab } from '../components/coach/IdentityTab';
import { BehaviorEngineTab } from '../components/coach/BehaviorEngineTab';
import { ProgramsTab } from '../components/coach/ProgramsTab';
import { VoiceToneTab } from '../components/coach/VoiceToneTab';
import { QuestsGamificationTab } from '../components/coach/QuestsGamificationTab';
import { SimulateTab } from '../components/coach/SimulateTab';
import { ShareTab } from '../components/coach/ShareTab';
import { useTranslation } from 'react-i18next';

interface Coach {
    id: string;
    name: string;
    descriptor: string;
    strictness: number;
    proteinPriority: number;
    carbTolerance: number;
    fatTolerance: number;
    hydrationEmphasis: number;
    consistencyEmphasis: number;
    tone: string;
    language: string;
}

export const CoachesPage = () => {
    const { t, i18n } = useTranslation();
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [activeTab, setActiveTab] = useState<string>('identity');

    useEffect(() => {
        fetchCoaches();
    }, []);

    const fetchCoaches = async () => {
        try {
            const data = await coachService.list();
            setCoaches(data);
            if (data.length > 0 && !selectedCoach) {
                const defaultCoach = data.find((c: Coach) => c.id === 'trit-default') || data[0];
                setSelectedCoach(defaultCoach);
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: t('coaches.messages.error_load') });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedCoach) return;
        setSaving(true);
        setMessage(null);
        try {
            const updated = await coachService.update(selectedCoach.id, selectedCoach);
            setCoaches(coaches.map(c => c.id === updated.id ? updated : c));
            setSelectedCoach(updated);
            setMessage({ type: 'success', text: t('coaches.messages.success_save') });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: t('coaches.messages.error_save') });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-primary">{t('coaches.messages.loading')}</div>;

    const tabs = [
        { id: 'identity', label: t('coaches.tabs.identity') },
        { id: 'behavior', label: t('coaches.tabs.behavior') },
        { id: 'programs', label: t('coaches.tabs.programs') },
        { id: 'voice', label: t('coaches.tabs.voice') },
        { id: 'quests', label: t('coaches.tabs.quests') },
        { id: 'simulate', label: t('coaches.tabs.simulate') },
        { id: 'share', label: t('coaches.tabs.share') },
    ];

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between border-b border-[#dfe2e2] bg-white px-8 py-3 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="text-primary">
                            <Edit size={24} />
                        </div>
                        <h2 className="text-text-main text-lg font-bold">{t('coaches.title')}</h2>
                    </div>

                    {/* Tab Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-sm font-medium py-4 -mb-4 border-b-2 transition-colors ${activeTab === tab.id ? 'text-primary border-primary font-bold' : 'text-text-muted border-transparent hover:text-primary'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* Coach Selector */}
                    <select
                        value={selectedCoach?.id || ''}
                        onChange={(e) => setSelectedCoach(coaches.find(c => c.id === e.target.value) || null)}
                        className={`bg-background-light border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                        {coaches.map(coach => (
                            <option key={coach.id} value={coach.id}>{coach.name}</option>
                        ))}
                    </select>


                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-[#f2f3f3] hover:bg-gray-200 text-text-main px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                        >
                            <span>{t('coaches.save_draft')}</span>
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                        >
                            <span>{t('coaches.publish')}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                {/* Toast Message */}
                {message && (
                    <div className={`fixed top-20 ${i18n.dir() === 'rtl' ? 'left-8' : 'right-8'} z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-${i18n.dir() === 'rtl' ? 'left' : 'right'} ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                {selectedCoach && (
                    <div className="max-w-6xl w-full">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 mb-4">
                            <a className="text-text-muted text-sm font-medium hover:text-primary" href="#">{t('coaches.title')}</a>
                            {i18n.dir() === 'rtl' ? <ChevronLeft size={14} className="text-text-muted" /> : <ChevronRight size={14} className="text-text-muted" />}
                            <span className="text-text-main text-sm font-semibold">
                                {tabs.find(t => t.id === activeTab)?.label}
                            </span>
                        </div>

                        {/* TAB CONTENT: IDENTITY */}
                        {activeTab === 'identity' && (
                            <IdentityTab coach={selectedCoach} onChange={setSelectedCoach} />
                        )}

                        {/* TAB CONTENT: BEHAVIOR */}
                        {activeTab === 'behavior' && (
                            <BehaviorEngineTab coach={selectedCoach} onChange={setSelectedCoach} />
                        )}

                        {/* TAB CONTENT: PROGRAMS */}
                        {activeTab === 'programs' && (
                            <ProgramsTab />
                        )}

                        {/* TAB CONTENT: VOICE */}
                        {activeTab === 'voice' && (
                            <VoiceToneTab coach={selectedCoach} onChange={setSelectedCoach} />
                        )}

                        {/* TAB CONTENT: QUESTS */}
                        {activeTab === 'quests' && (
                            <QuestsGamificationTab />
                        )}

                        {/* TAB CONTENT: SIMULATE */}
                        {activeTab === 'simulate' && (
                            <SimulateTab />
                        )}

                        {/* TAB CONTENT: SHARE */}
                        {activeTab === 'share' && (
                            <ShareTab coach={selectedCoach} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
