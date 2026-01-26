import { MessageSquare, Sparkles, ThumbsUp, ThumbsDown, Copy, History, Share2, Plus, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SimulateTab = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col gap-8">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-end gap-6 mb-2">
                    <div className="max-w-2xl">
                        <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">{t('coach_simulate.title')}</h1>
                        <p className="text-text-muted text-lg leading-relaxed">
                            {t('coach_simulate.description')}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#dfe2e2] rounded-lg text-sm font-bold text-text-main hover:bg-white transition-all bg-background-light/50">
                            <History size={16} className="text-primary" />
                            {t('coach_simulate.history')}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#dfe2e2] rounded-lg text-sm font-bold text-text-main hover:bg-white transition-all bg-background-light/50">
                            <Share2 size={16} className="text-primary" />
                            {t('coach_simulate.export')}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Context Configurator */}
                    <section className="w-full lg:w-[400px] bg-white rounded-xl border border-[#dfe2e2] overflow-hidden flex flex-col shrink-0">
                        <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2 bg-white">
                            <Settings size={20} className="text-primary" />
                            <h2 className="text-text-main text-base font-bold">{t('coach_simulate.context')}</h2>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Scenario Selector */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">{t('coach_simulate.select_scenario')}</label>
                                <select className={`w-full rounded-lg bg-background-light border-none py-3 px-4 text-sm font-semibold text-text-main focus:ring-2 focus:ring-primary/50 outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                    <option value="missed">{t('coach_simulate.scenarios.missed')}</option>
                                    <option value="protein">{t('coach_simulate.scenarios.protein')}</option>
                                    <option value="binge">{t('coach_simulate.scenarios.binge')}</option>
                                    <option value="holiday">{t('coach_simulate.scenarios.holiday')}</option>
                                    <option value="plateau">{t('coach_simulate.scenarios.plateau')}</option>
                                </select>
                            </div>

                            {/* User State Summary */}
                            <div className="pt-6 border-t border-[#dfe2e2] space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">{t('coach_simulate.user_profile')}</h4>
                                    <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">{t('coach_simulate.edit_json')}</button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 bg-background-light rounded-xl border border-[#dfe2e2]/50">
                                        <p className="text-[10px] text-text-muted uppercase font-bold mb-1 tracking-wider">{t('coach_simulate.data.protein')}</p>
                                        <div className="flex items-end gap-1">
                                            <span className="text-lg font-black text-text-main">142g</span>
                                            <span className="text-[10px] text-green-600 font-black mb-1" dir="ltr">+12%</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-background-light rounded-xl border border-[#dfe2e2]/50">
                                        <p className="text-[10px] text-text-muted uppercase font-bold mb-1 tracking-wider">{t('coach_simulate.data.streak')}</p>
                                        <div className="flex items-end gap-1">
                                            <span className="text-lg font-black text-text-main">12 Days</span>
                                            <span className="text-orange-500 text-sm mb-1">🔥</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-background-light rounded-xl border border-[#dfe2e2]/50">
                                        <p className="text-[10px] text-text-muted uppercase font-bold mb-1 tracking-wider">{t('coach_simulate.data.goal_type')}</p>
                                        <span className="text-xs font-bold text-text-main">Hypertrophy</span>
                                    </div>
                                    <div className="p-4 bg-background-light rounded-xl border border-[#dfe2e2]/50">
                                        <p className="text-[10px] text-text-muted uppercase font-bold mb-1 tracking-wider">{t('coach_simulate.data.mood_score')}</p>
                                        <span className="text-xs font-bold text-text-main">Neutral (3/5)</span>
                                    </div>
                                </div>
                                <button className="w-full p-4 border-2 border-dashed border-[#dfe2e2] rounded-xl flex items-center justify-center gap-2 group hover:border-primary/30 hover:bg-primary/5 transition-all">
                                    <Plus size={16} className="text-text-muted group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted group-hover:text-primary transition-colors">{t('coach_simulate.add_field')}</span>
                                </button>
                            </div>
                        </div>

                        {/* Bottom Action Button */}
                        <div className="p-6 border-t border-[#dfe2e2] bg-white mt-auto">
                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-sm">
                                <Sparkles size={20} />
                                <span className="uppercase tracking-widest text-sm">{t('coach_simulate.generate')}</span>
                            </button>
                        </div>
                    </section>

                    {/* Right Column: Chat Simulator */}
                    <section className="flex-1 w-full bg-white rounded-xl border border-[#dfe2e2] overflow-hidden flex flex-col min-h-[600px]">
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-[#dfe2e2] flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-text-main tracking-tight">{t('coach_simulate.preview_title')}</h3>
                                    <p className="text-[10px] text-text-muted flex items-center gap-1.5 font-bold uppercase tracking-wider">
                                        <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        {t('coach_simulate.live_mode')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-md uppercase tracking-widest">{t('coach_simulate.encouraging_tone')}</span>
                                <span className="px-2.5 py-1 bg-background-light text-text-muted text-[10px] font-black rounded-md uppercase tracking-widest border border-[#dfe2e2]/50 italic">v2.4-stable</span>
                            </div>
                        </div>

                        {/* Chat Message Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light/30">
                            {/* User Input Mockup */}
                            <div className="flex justify-end">
                                <div className={`max-w-[70%] bg-white border border-[#dfe2e2] p-5 rounded-2xl shadow-sm ${i18n.dir() === 'rtl' ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                                    <p className="text-sm text-text-main leading-relaxed font-medium">
                                        {t('coach_simulate.user_msg')}
                                    </p>
                                    <p className={`text-[10px] font-bold text-text-muted mt-3 uppercase tracking-wider ${i18n.dir() === 'rtl' ? 'text-left' : 'text-right'}`}>Today, 10:45 AM</p>
                                </div>
                            </div>

                            {/* Coach Response */}
                            <div className="flex justify-start">
                                <div className="max-w-[85%]">
                                    <div className={`bg-primary text-white p-6 rounded-2xl shadow-sm space-y-4 ${i18n.dir() === 'rtl' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                                        <p className="text-sm leading-relaxed font-bold">
                                            {t('coach_simulate.coach_msg_1')}
                                        </p>
                                        <p className="text-sm leading-relaxed font-bold">
                                            {t('coach_simulate.coach_msg_2')}
                                        </p>
                                        <p className="text-sm leading-relaxed font-bold">
                                            {t('coach_simulate.coach_msg_3')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 px-1">
                                        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{t('coach_simulate.ai_coach')}</p>
                                        <div className="flex gap-3">
                                            <button className="text-text-muted hover:text-primary transition-colors">
                                                <ThumbsUp size={16} />
                                            </button>
                                            <button className="text-text-muted hover:text-red-500 transition-colors">
                                                <ThumbsDown size={16} />
                                            </button>
                                            <button className="text-text-muted hover:text-primary transition-colors">
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Simulation Helper */}
                            <div className="flex justify-center py-6">
                                <div className="px-6 py-2 bg-white rounded-full border border-[#dfe2e2] shadow-sm">
                                    <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em] text-center">{t('coach_simulate.end_simulation')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Input (Disabled in Preview) */}
                        <div className="p-6 border-t border-[#dfe2e2] bg-white">
                            <div className="relative">
                                <input
                                    className={`w-full py-4 rounded-xl border border-[#dfe2e2] bg-background-light text-sm font-semibold text-text-main focus:ring-2 focus:ring-primary/50 opacity-60 cursor-not-allowed outline-none shadow-inner ${i18n.dir() === 'rtl' ? 'pl-14 pr-5' : 'pl-5 pr-14'}`}
                                    disabled
                                    placeholder={t('coach_simulate.input_placeholder')}
                                    type="text"
                                />
                                <button className={`absolute top-1/2 -translate-y-1/2 text-text-muted ${i18n.dir() === 'rtl' ? 'left-4' : 'right-4'}`} disabled>
                                    <MessageSquare size={20} />
                                </button>
                            </div>
                            <p className="text-[11px] font-bold tracking-tight text-center text-text-muted mt-4 italic opacity-70">
                                {t('coach_simulate.input_hint')}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
