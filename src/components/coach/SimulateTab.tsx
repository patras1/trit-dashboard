import { MessageSquare, Sparkles, ThumbsUp, ThumbsDown, Copy, History, Share2, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SimulateTab = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex flex-col h-full overflow-hidden -m-8">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-center gap-3 p-8 bg-background-light">
                <div className="flex flex-col gap-1">
                    <h1 className="text-text-main text-3xl font-bold leading-tight tracking-tight">{t('coach_simulate.title')}</h1>
                    <p className="text-text-muted text-sm font-normal">{t('coach_simulate.description')}</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#dfe2e2] rounded-lg text-sm font-medium hover:bg-white transition-colors">
                        <History size={16} />
                        {t('coach_simulate.history')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#dfe2e2] rounded-lg text-sm font-medium hover:bg-white transition-colors">
                        <Share2 size={16} />
                        {t('coach_simulate.export')}
                    </button>
                </div>
            </div>

            {/* Simulation Container (Split Layout) */}
            <div className="flex flex-1 gap-6 px-8 pb-8 overflow-hidden bg-background-light">
                {/* Left Column: Context Configurator */}
                <div className="w-[400px] flex flex-col bg-white rounded-xl border border-[#dfe2e2] overflow-hidden shadow-sm">
                    <div className="p-6 flex-1 overflow-y-auto space-y-6">
                        <div>
                            <h3 className="text-text-main text-lg font-bold mb-4">{t('coach_simulate.context')}</h3>
                            {/* Scenario Selector */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">{t('coach_simulate.select_scenario')}</label>
                                <select className={`w-full rounded-lg border border-[#dfe2e2] bg-white text-text-main focus:ring-primary focus:border-primary py-3 px-4 text-sm outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                    <option value="missed">{t('coach_simulate.scenarios.missed')}</option>
                                    <option value="protein">{t('coach_simulate.scenarios.protein')}</option>
                                    <option value="binge">{t('coach_simulate.scenarios.binge')}</option>
                                    <option value="holiday">{t('coach_simulate.scenarios.holiday')}</option>
                                    <option value="plateau">{t('coach_simulate.scenarios.plateau')}</option>
                                </select>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* User State Summary */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-semibold text-text-main uppercase tracking-wider">{t('coach_simulate.user_profile')}</h4>
                                <button className="text-primary text-xs font-bold hover:underline">{t('coach_simulate.edit_json')}</button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-background-light rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">{t('coach_simulate.data.protein')}</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-xl font-bold text-text-main">142g</span>
                                        <span className="text-[10px] text-green-600 font-bold mb-1" dir="ltr">+12%</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-background-light rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">{t('coach_simulate.data.streak')}</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-xl font-bold text-text-main">12 Days</span>
                                        <span className="text-orange-500 text-sm mb-1">🔥</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-background-light rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">{t('coach_simulate.data.goal_type')}</p>
                                    <span className="text-sm font-bold text-text-main">Hypertrophy</span>
                                </div>
                                <div className="p-4 bg-background-light rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">{t('coach_simulate.data.mood_score')}</p>
                                    <span className="text-sm font-bold text-text-main">Neutral (3/5)</span>
                                </div>
                            </div>
                            <div className="p-4 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-background-light transition-colors">
                                <Plus size={16} className="text-gray-400" />
                                <span className="text-xs font-medium text-gray-500">{t('coach_simulate.add_field')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="p-6 border-t border-[#dfe2e2] bg-white">
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]">
                            <Sparkles size={20} />
                            {t('coach_simulate.generate')}
                        </button>
                    </div>
                </div>

                {/* Right Column: Chat Simulator */}
                <div className="flex-1 flex flex-col bg-white rounded-xl border border-[#dfe2e2] overflow-hidden shadow-sm">
                    {/* Chat Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-background-light/50">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <MessageSquare size={16} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-text-main">{t('coach_simulate.preview_title')}</h3>
                                <p className="text-[10px] text-text-muted flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    {t('coach_simulate.live_mode')}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wide">{t('coach_simulate.encouraging_tone')}</span>
                            <span className="px-2 py-1 bg-gray-100 text-text-muted text-[10px] font-bold rounded uppercase tracking-wide">v2.4-stable</span>
                        </div>
                    </div>

                    {/* Chat Message Area */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-background-light/30">
                        {/* User Input Mockup */}
                        <div className="flex justify-end">
                            <div className={`max-w-[70%] bg-white border border-[#dfe2e2] p-4 rounded-2xl shadow-sm ${i18n.dir() === 'rtl' ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                                <p className="text-sm text-text-main leading-relaxed">
                                    {t('coach_simulate.user_msg')}
                                </p>
                                <p className={`text-[10px] text-gray-400 mt-2 ${i18n.dir() === 'rtl' ? 'text-left' : 'text-right'}`}>Today, 10:45 AM</p>
                            </div>
                        </div>

                        {/* Coach Response */}
                        <div className="flex justify-start">
                            <div className="max-w-[85%]">
                                <div className={`bg-primary text-white p-6 rounded-2xl shadow-lg space-y-4 ${i18n.dir() === 'rtl' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                                    <p className="text-sm leading-relaxed font-medium">
                                        {t('coach_simulate.coach_msg_1')}
                                    </p>
                                    <p className="text-sm leading-relaxed font-medium">
                                        {t('coach_simulate.coach_msg_2')}
                                    </p>
                                    <p className="text-sm leading-relaxed font-medium">
                                        {t('coach_simulate.coach_msg_3')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-3">
                                    <p className="text-[10px] text-text-muted font-medium">{t('coach_simulate.ai_coach')}</p>
                                    <div className="flex gap-2">
                                        <button className="text-gray-400 hover:text-primary transition-colors">
                                            <ThumbsUp size={14} />
                                        </button>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <ThumbsDown size={14} />
                                        </button>
                                        <button className="text-gray-400 hover:text-primary transition-colors">
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Simulation Helper */}
                        <div className="flex justify-center py-4">
                            <div className="px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest text-center">{t('coach_simulate.end_simulation')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input (Disabled in Preview) */}
                    <div className="p-6 border-t border-gray-100 bg-white">
                        <div className="relative">
                            <input
                                className={`w-full py-3 rounded-xl border border-[#dfe2e2] bg-background-light text-sm focus:ring-primary focus:border-primary opacity-60 cursor-not-allowed outline-none ${i18n.dir() === 'rtl' ? 'pl-12 pr-4' : 'pl-4 pr-12'}`}
                                disabled
                                placeholder={t('coach_simulate.input_placeholder')}
                                type="text"
                            />
                            <button className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${i18n.dir() === 'rtl' ? 'left-3' : 'right-3'}`} disabled>
                                <MessageSquare size={18} />
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-text-muted mt-3 italic">
                            {t('coach_simulate.input_hint')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
