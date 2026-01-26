import { Star, Flame, Trophy, Award, Target, Plus, Settings, MoreVertical, Droplets, Utensils, Info, Users, Smartphone, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const QuestsGamificationTab = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col gap-8">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-end gap-6 mb-2">
                    <div className="max-w-2xl">
                        <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">{t('coach_gamification.title')}</h1>
                        <p className="text-text-muted text-lg leading-relaxed">{t('coach_gamification.description')}</p>
                    </div>
                </div>

                {/* Master Toggle */}
                <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-text-main text-lg font-bold">{t('coach_gamification.enable')}</p>
                        <p className="text-text-muted text-sm font-medium">{t('coach_gamification.enable_hint')}</p>
                    </div>
                    <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-[#dfe2e2] p-1 has-[:checked]:justify-end has-[:checked]:bg-primary transition-all duration-300">
                        <div className="h-6 w-6 rounded-full bg-white shadow-sm"></div>
                        <input defaultChecked className="hidden" type="checkbox" />
                    </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Configuration Logic */}
                    <section className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2 bg-white">
                            <Settings size={20} className="text-primary" />
                            <h2 className="text-text-main text-base font-bold">{t('coach_gamification.config_logic')}</h2>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Points System */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Star className="text-primary fill-current" size={18} />
                                    <h3 className="text-sm font-bold text-text-main">{t('coach_gamification.points_system')}</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-background-light rounded-xl border border-[#dfe2e2]/50">
                                        <span className="text-sm font-semibold text-text-main">{t('coach_gamification.log_meal')}</span>
                                        <div className="flex items-center gap-2">
                                            <input className="w-16 h-9 rounded-lg border border-[#dfe2e2] bg-white text-center text-sm font-bold text-text-main focus:ring-2 focus:ring-primary/50 outline-none" type="number" defaultValue="10" />
                                            <span className="text-[10px] font-black text-primary tracking-wider">PTS</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-background-light rounded-xl border border-[#dfe2e2]/50">
                                        <span className="text-sm font-semibold text-text-main">{t('coach_gamification.hit_protein')}</span>
                                        <div className="flex items-center gap-2">
                                            <input className="w-16 h-9 rounded-lg border border-[#dfe2e2] bg-white text-center text-sm font-bold text-text-main focus:ring-2 focus:ring-primary/50 outline-none" type="number" defaultValue="25" />
                                            <span className="text-[10px] font-black text-primary tracking-wider">PTS</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-background-light rounded-xl border border-[#dfe2e2]/50">
                                        <span className="text-sm font-semibold text-text-main">{t('coach_gamification.drink_water')}</span>
                                        <div className="flex items-center gap-2">
                                            <input className="w-16 h-9 rounded-lg border border-[#dfe2e2] bg-white text-center text-sm font-bold text-text-main focus:ring-2 focus:ring-primary/50 outline-none" type="number" defaultValue="15" />
                                            <span className="text-[10px] font-black text-primary tracking-wider">PTS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Streak Rules */}
                            <div className="pt-6 border-t border-[#dfe2e2] space-y-6">
                                <div className="flex items-center gap-2">
                                    <Flame className="text-primary fill-current" size={18} />
                                    <h3 className="text-sm font-bold text-text-main">{t('coach_gamification.streak_rules')}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">{t('coach_gamification.validation_interval')}</label>
                                        <select className={`w-full rounded-lg bg-background-light border-none px-4 py-2.5 text-text-main font-semibold focus:ring-2 focus:ring-primary/50 text-sm outline-none shadow-sm ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                            <option>{t('coach_gamification.intervals.0')}</option>
                                            <option>{t('coach_gamification.intervals.1')}</option>
                                            <option>{t('coach_gamification.intervals.2')}</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">{t('coach_gamification.grace_period')}</label>
                                        <select className={`w-full rounded-lg bg-background-light border-none px-4 py-2.5 text-text-main font-semibold focus:ring-2 focus:ring-primary/50 text-sm outline-none shadow-sm ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                            <option>{t('coach_gamification.grace_periods.0')}</option>
                                            <option>{t('coach_gamification.grace_periods.1')}</option>
                                            <option>{t('coach_gamification.grace_periods.2')}</option>
                                            <option>{t('coach_gamification.grace_periods.3')}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Right Column: Content Management */}
                    <section className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center justify-between bg-white">
                            <div className="flex items-center gap-2">
                                <Trophy size={20} className="text-primary" />
                                <h2 className="text-text-main text-base font-bold">{t('coach_gamification.content_management')}</h2>
                            </div>
                            <button className="text-primary text-xs font-bold flex items-center gap-1.5 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors border border-primary/10">
                                <Plus size={14} />
                                {t('coach_gamification.new_content')}
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Achievement Badges */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-text-main">{t('coach_gamification.achievement_badges')}</h3>
                                    <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">{t('coach_gamification.manage_all')}</button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border border-[#dfe2e2] flex flex-col items-center text-center gap-3 hover:bg-background-light cursor-pointer transition-all hover:border-primary/30 group">
                                        <div className="size-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
                                            <Flame size={28} className="fill-current" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-text-main mb-1">{t('coach_gamification.badges.fire_starter.title')}</p>
                                            <p className="text-[10px] text-text-muted leading-tight">{t('coach_gamification.badges.fire_starter.desc')}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-[#dfe2e2] flex flex-col items-center text-center gap-3 hover:bg-background-light cursor-pointer transition-all hover:border-primary/30 group">
                                        <div className="size-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                                            <Award size={28} className="fill-current" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-text-main mb-1">{t('coach_gamification.badges.macro_master.title')}</p>
                                            <p className="text-[10px] text-text-muted leading-tight">{t('coach_gamification.badges.macro_master.desc')}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border-2 border-dashed border-[#dfe2e2] flex flex-col items-center justify-center text-center gap-2 text-text-muted hover:text-primary hover:border-primary hover:bg-primary/5 cursor-pointer transition-all h-full">
                                        <Plus size={24} />
                                        <p className="text-[10px] font-bold uppercase tracking-wide">{t('coach_gamification.add_badge')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Active Quests */}
                            <div className="pt-6 border-t border-[#dfe2e2]">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-text-main">{t('coach_gamification.active_quests')}</h3>
                                    <button className="bg-primary px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:bg-primary/90 transition-all shadow-sm">{t('coach_gamification.new_quest')}</button>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { id: 'protein', icon: Target, color: 'text-primary', bg: 'bg-primary/10', title: 'quests.protein.title', desc: 'quests.protein.desc', status: 'quests.protein.status', dot: 'bg-green-500' },
                                        { id: 'hydration', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100', title: 'quests.hydration.title', desc: 'quests.hydration.desc', status: 'quests.hydration.status', dot: 'bg-green-500' },
                                        { id: 'meal_prep', icon: Utensils, color: 'text-amber-600', bg: 'bg-amber-100', title: 'quests.meal_prep.title', desc: 'quests.meal_prep.desc', status: 'quests.meal_prep.status', dot: 'bg-amber-500', opacity: 'opacity-80' }
                                    ].map((quest) => (
                                        <div key={quest.id} className={`flex items-center gap-4 p-3 border border-[#dfe2e2] rounded-xl hover:bg-background-light transition-all cursor-pointer group ${quest.opacity || ''}`}>
                                            <div className={`size-10 rounded-lg ${quest.bg} flex items-center justify-center ${quest.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                                <quest.icon size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-text-main mb-0.5">{t(`coach_gamification.${quest.title}`)}</p>
                                                <p className="text-[10px] text-text-muted font-medium">{t(`coach_gamification.${quest.desc}`)}</p>
                                            </div>
                                            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-md border border-[#dfe2e2]/50 shadow-sm">
                                                <span className={`h-1.5 w-1.5 rounded-full ${quest.dot}`}></span>
                                                <span className="text-[10px] font-bold uppercase tracking-tight text-text-main">{t(`coach_gamification.${quest.status}`)}</span>
                                            </div>
                                            <button className="p-1 text-text-muted hover:text-text-main hover:bg-gray-100 rounded-md transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer / Helper Bar */}
                <div className="mt-8 pt-6 border-t border-[#dfe2e2] flex flex-wrap justify-between items-center gap-4 text-text-muted">
                    <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                            <Info size={14} className="text-primary" />
                            {t('coach_gamification.footer.last_saved')}
                        </span>
                        <span className="flex items-center gap-2">
                            <Users size={14} className="text-primary" />
                            {t('coach_gamification.footer.active_participants')}
                        </span>
                    </div>
                    <div className="flex gap-6">
                        <a className="text-[11px] font-bold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-2" href="#">
                            <Smartphone size={14} />
                            {t('coach_gamification.footer.preview_app')}
                        </a>
                        <a className="text-[11px] font-bold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-2" href="#">
                            <BookOpen size={14} />
                            {t('coach_gamification.footer.view_docs')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
