import { Info, HelpCircle, Activity, Settings } from 'lucide-react';
import { useState } from 'react';
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

interface BehaviorEngineTabProps {
    coach: Coach;
    onChange: (coach: Coach) => void;
}

export const BehaviorEngineTab = ({ coach, onChange }: BehaviorEngineTabProps) => {
    const { t, i18n } = useTranslation();
    const [encouragement, setEncouragement] = useState(0.92);
    const [technicality, setTechnicality] = useState(0.25);
    const [directness, setDirectness] = useState(0.68);
    const [notificationFreq, setNotificationFreq] = useState('medium');
    const [forgivenessFactor, setForgivenessFactor] = useState('balanced');
    const [checkinStyle, setCheckinStyle] = useState('supportive');

    const handleSliderChange = (field: keyof Coach, value: number) => {
        onChange({ ...coach, [field]: value });
    };

    const handleReset = () => {
        onChange({
            ...coach,
            strictness: 0.5,
            proteinPriority: 0.5,
            hydrationEmphasis: 0.5,
            consistencyEmphasis: 0.5,
        });
        setEncouragement(0.5);
        setTechnicality(0.5);
        setDirectness(0.5);
    };

    return (
        <div className="animate-in fade-in duration-300 max-w-6xl mx-auto w-full">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
                <div className="max-w-2xl">
                    <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">{t('coach_behavior.title')}</h1>
                    <p className="text-text-muted text-lg leading-relaxed">
                        {t('coach_behavior.description')}
                    </p>
                </div>
                <button className="bg-white border border-[#f2f3f3] text-text-main px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <HelpCircle size={16} />
                    {t('coach_behavior.view_docs')}
                </button>
            </div>

            {/* Section: Personality Matrix */}
            <section className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2 bg-white">
                    <Activity size={20} className="text-primary" />
                    <h2 className="text-text-main text-base font-bold">{t('coach_behavior.personality_matrix')}</h2>
                    <Info size={16} className="text-text-muted cursor-help ml-1" />
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Slider Card: Strictness */}
                        <div className="bg-background-light p-5 rounded-xl border border-[#dfe2e2]/50">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-text-main">{t('coach_behavior.sliders.strictness')}</label>
                                <span className="bg-white text-primary text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-primary/10 shadow-sm">
                                    {coach.strictness.toFixed(2)}
                                </span>
                            </div>
                            <input
                                className={`w-full h-1.5 bg-white border border-[#dfe2e2] rounded-lg appearance-none cursor-pointer accent-primary ${i18n.dir() === 'rtl' ? 'rotate-180' : ''}`}
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={coach.strictness}
                                onChange={(e) => handleSliderChange('strictness', parseFloat(e.target.value))}
                            />
                            <div className="flex justify-between mt-2 px-0.5">
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.lenient')}</span>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.rigid')}</span>
                            </div>
                        </div>

                        {/* Slider Card: Protein Priority */}
                        <div className="bg-background-light p-5 rounded-xl border border-[#dfe2e2]/50">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-text-main">{t('coach_behavior.sliders.protein_priority')}</label>
                                <span className="bg-white text-primary text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-primary/10 shadow-sm">
                                    {coach.proteinPriority.toFixed(2)}
                                </span>
                            </div>
                            <input
                                className={`w-full h-1.5 bg-white border border-[#dfe2e2] rounded-lg appearance-none cursor-pointer accent-primary ${i18n.dir() === 'rtl' ? 'rotate-180' : ''}`}
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={coach.proteinPriority}
                                onChange={(e) => handleSliderChange('proteinPriority', parseFloat(e.target.value))}
                            />
                            <div className="flex justify-between mt-2 px-0.5">
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.standard')}</span>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.aggressive')}</span>
                            </div>
                        </div>

                        {/* Slider Card: Hydration Emphasis */}
                        <div className="bg-background-light p-5 rounded-xl border border-[#dfe2e2]/50">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-text-main">{t('coach_behavior.sliders.hydration_emphasis')}</label>
                                <span className="bg-white text-primary text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-primary/10 shadow-sm">
                                    {coach.hydrationEmphasis.toFixed(2)}
                                </span>
                            </div>
                            <input
                                className={`w-full h-1.5 bg-white border border-[#dfe2e2] rounded-lg appearance-none cursor-pointer accent-primary ${i18n.dir() === 'rtl' ? 'rotate-180' : ''}`}
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={coach.hydrationEmphasis}
                                onChange={(e) => handleSliderChange('hydrationEmphasis', parseFloat(e.target.value))}
                            />
                            <div className="flex justify-between mt-2 px-0.5">
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.minimal')}</span>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.frequent')}</span>
                            </div>
                        </div>

                        {/* Slider Card: Encouragement */}
                        <div className="bg-background-light p-5 rounded-xl border border-[#dfe2e2]/50">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-text-main">{t('coach_behavior.sliders.encouragement')}</label>
                                <span className="bg-white text-primary text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-primary/10 shadow-sm">
                                    {encouragement.toFixed(2)}
                                </span>
                            </div>
                            <input
                                className={`w-full h-1.5 bg-white border border-[#dfe2e2] rounded-lg appearance-none cursor-pointer accent-primary ${i18n.dir() === 'rtl' ? 'rotate-180' : ''}`}
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={encouragement}
                                onChange={(e) => setEncouragement(parseFloat(e.target.value))}
                            />
                            <div className="flex justify-between mt-2 px-0.5">
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.stoic')}</span>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.hyper')}</span>
                            </div>
                        </div>

                        {/* Slider Card: Technicality */}
                        <div className="bg-background-light p-5 rounded-xl border border-[#dfe2e2]/50">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-text-main">{t('coach_behavior.sliders.technicality')}</label>
                                <span className="bg-white text-primary text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-primary/10 shadow-sm">
                                    {technicality.toFixed(2)}
                                </span>
                            </div>
                            <input
                                className={`w-full h-1.5 bg-white border border-[#dfe2e2] rounded-lg appearance-none cursor-pointer accent-primary ${i18n.dir() === 'rtl' ? 'rotate-180' : ''}`}
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={technicality}
                                onChange={(e) => setTechnicality(parseFloat(e.target.value))}
                            />
                            <div className="flex justify-between mt-2 px-0.5">
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.simple')}</span>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.scientific')}</span>
                            </div>
                        </div>

                        {/* Slider Card: Directness */}
                        <div className="bg-background-light p-5 rounded-xl border border-[#dfe2e2]/50">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-text-main">{t('coach_behavior.sliders.directness')}</label>
                                <span className="bg-white text-primary text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-primary/10 shadow-sm">
                                    {directness.toFixed(2)}
                                </span>
                            </div>
                            <input
                                className={`w-full h-1.5 bg-white border border-[#dfe2e2] rounded-lg appearance-none cursor-pointer accent-primary ${i18n.dir() === 'rtl' ? 'rotate-180' : ''}`}
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={directness}
                                onChange={(e) => setDirectness(parseFloat(e.target.value))}
                            />
                            <div className="flex justify-between mt-2 px-0.5">
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.nuanced')}</span>
                                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t('coach_behavior.sliders.blunt')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Behavioral Triggers */}
            <section className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden mb-12">
                <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2 bg-white">
                    <Settings size={20} className="text-primary" />
                    <h2 className="text-text-main text-base font-bold">{t('coach_behavior.triggers_title')}</h2>
                </div>

                <div className="bg-white divide-y md:divide-y-0 md:divide-x divide-[#dfe2e2] grid grid-cols-1 md:grid-cols-3">
                    {/* Trigger 1 */}
                    <div className="p-6 hover:bg-gray-50/50 transition-colors">
                        <label className="block text-sm font-bold text-text-main mb-2">{t('coach_behavior.notification_freq.label')}</label>
                        <p className="text-xs text-text-muted mb-4 leading-relaxed">{t('coach_behavior.notification_freq.hint')}</p>
                        <select
                            className={`w-full bg-background-light border-none rounded-lg text-sm py-2.5 px-3 focus:ring-2 focus:ring-primary/50 text-text-main font-semibold outline-none shadow-sm ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            value={notificationFreq}
                            onChange={(e) => setNotificationFreq(e.target.value)}
                        >
                            <option value="low">{t('coach_behavior.notification_freq.options.low')}</option>
                            <option value="medium">{t('coach_behavior.notification_freq.options.medium')}</option>
                            <option value="high">{t('coach_behavior.notification_freq.options.high')}</option>
                            <option value="realtime">{t('coach_behavior.notification_freq.options.realtime')}</option>
                        </select>
                    </div>

                    {/* Trigger 2 */}
                    <div className="p-6 hover:bg-gray-50/50 transition-colors">
                        <label className="block text-sm font-bold text-text-main mb-2">{t('coach_behavior.forgiveness_factor.label')}</label>
                        <p className="text-xs text-text-muted mb-4 leading-relaxed">{t('coach_behavior.forgiveness_factor.hint')}</p>
                        <select
                            className={`w-full bg-background-light border-none rounded-lg text-sm py-2.5 px-3 focus:ring-2 focus:ring-primary/50 text-text-main font-semibold outline-none shadow-sm ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            value={forgivenessFactor}
                            onChange={(e) => setForgivenessFactor(e.target.value)}
                        >
                            <option value="strict">{t('coach_behavior.forgiveness_factor.options.strict')}</option>
                            <option value="balanced">{t('coach_behavior.forgiveness_factor.options.balanced')}</option>
                            <option value="lenient">{t('coach_behavior.forgiveness_factor.options.lenient')}</option>
                        </select>
                    </div>

                    {/* Trigger 3 */}
                    <div className="p-6 hover:bg-gray-50/50 transition-colors">
                        <label className="block text-sm font-bold text-text-main mb-2">{t('coach_behavior.checkin_style.label')}</label>
                        <p className="text-xs text-text-muted mb-4 leading-relaxed">{t('coach_behavior.checkin_style.hint')}</p>
                        <select
                            className={`w-full bg-background-light border-none rounded-lg text-sm py-2.5 px-3 focus:ring-2 focus:ring-primary/50 text-text-main font-semibold outline-none shadow-sm ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            value={checkinStyle}
                            onChange={(e) => setCheckinStyle(e.target.value)}
                        >
                            <option value="aggressive">{t('coach_behavior.checkin_style.options.aggressive')}</option>
                            <option value="supportive">{t('coach_behavior.checkin_style.options.supportive')}</option>
                            <option value="passive">{t('coach_behavior.checkin_style.options.passive')}</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[#f2f3f3]">
                <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#f2f3f3] text-text-main text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                    {t('coach_behavior.reset_defaults')}
                </button>
                <button className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md">
                    {t('coach_behavior.update_logic')}
                </button>
            </div>
        </div>
    );
};
