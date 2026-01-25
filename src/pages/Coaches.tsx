import { useState, useEffect } from 'react';
import { coachService } from '../lib/api';
import { Save, Edit, ChevronRight } from 'lucide-react';
import { IdentityTab } from '../components/coach/IdentityTab';
import { BehaviorEngineTab } from '../components/coach/BehaviorEngineTab';
import { ProgramsTab } from '../components/coach/ProgramsTab';
import { VoiceToneTab } from '../components/coach/VoiceToneTab';
import { QuestsGamificationTab } from '../components/coach/QuestsGamificationTab';
import { SimulateTab } from '../components/coach/SimulateTab';
import { ShareTab } from '../components/coach/ShareTab';

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
            setMessage({ type: 'error', text: 'Failed to load coaches' });
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
            setMessage({ type: 'success', text: 'Coach updated successfully' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to save changes' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-primary">Loading coaches...</div>;

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between border-b border-[#dfe2e2] bg-white px-8 py-3 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="text-primary">
                            <Edit size={24} />
                        </div>
                        <h2 className="text-text-main text-lg font-bold">Coach Editor</h2>
                    </div>

                    {/* Tab Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => setActiveTab('identity')}
                            className={`text-sm font-medium py-4 -mb-4 border-b-2 transition-colors ${activeTab === 'identity' ? 'text-primary border-primary font-bold' : 'text-text-muted border-transparent hover:text-primary'}`}
                        >
                            Identity & Visuals
                        </button>
                        <button
                            onClick={() => setActiveTab('behavior')}
                            className={`text-sm font-medium py-4 -mb-4 border-b-2 transition-colors ${activeTab === 'behavior' ? 'text-primary border-primary font-bold' : 'text-text-muted border-transparent hover:text-primary'}`}
                        >
                            Behavior Engine
                        </button>
                        <button
                            onClick={() => setActiveTab('programs')}
                            className={`text-sm font-medium py-4 -mb-4 border-b-2 transition-colors ${activeTab === 'programs' ? 'text-primary border-primary font-bold' : 'text-text-muted border-transparent hover:text-primary'}`}
                        >
                            Programs
                        </button>
                        <button
                            onClick={() => setActiveTab('voice')}
                            className={`text-sm font-medium py-4 -mb-4 border-b-2 transition-colors ${activeTab === 'voice' ? 'text-primary border-primary font-bold' : 'text-text-muted border-transparent hover:text-primary'}`}
                        >
                            Voice & Tone
                        </button>
                        <button
                            onClick={() => setActiveTab('quests')}
                            className={`text-sm font-medium py-4 -mb-4 border-b-2 transition-colors ${activeTab === 'quests' ? 'text-primary border-primary font-bold' : 'text-text-muted border-transparent hover:text-primary'}`}
                        >
                            Quests & Gamification
                        </button>
                        <button
                            onClick={() => setActiveTab('simulate')}
                            className={`text-sm font-medium py-4 -mb-4 border-b-2 transition-colors ${activeTab === 'simulate' ? 'text-primary border-primary font-bold' : 'text-text-muted border-transparent hover:text-primary'}`}
                        >
                            Simulate
                        </button>
                        <button
                            onClick={() => setActiveTab('share')}
                            className={`text-sm font-medium py-4 -mb-4 border-b-2 transition-colors ${activeTab === 'share' ? 'text-primary border-primary font-bold' : 'text-text-muted border-transparent hover:text-primary'}`}
                        >
                            Share
                        </button>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* Coach Selector */}
                    <select
                        value={selectedCoach?.id || ''}
                        onChange={(e) => setSelectedCoach(coaches.find(c => c.id === e.target.value) || null)}
                        className="bg-background-light border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none"
                    >
                        {coaches.map(coach => (
                            <option key={coach.id} value={coach.id}>{coach.name}</option>
                        ))}
                    </select>


                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={16} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                {/* Toast Message */}
                {message && (
                    <div className={`fixed top-20 right-8 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-right ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                {selectedCoach && (
                    <div className="max-w-6xl w-full">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 mb-4">
                            <a className="text-text-muted text-sm font-medium hover:text-primary" href="#">Coach Editor</a>
                            <ChevronRight size={14} className="text-text-muted" />
                            <span className="text-text-main text-sm font-semibold">
                                {activeTab === 'identity' ? 'Identity & Visuals' :
                                    activeTab === 'behavior' ? 'Behavior Engine' :
                                        activeTab === 'programs' ? 'Programs' :
                                            activeTab === 'quests' ? 'Quests & Gamification' :
                                                activeTab === 'simulate' ? 'Simulate' :
                                                    activeTab === 'share' ? 'Share' : 'Voice & Tone'}
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
