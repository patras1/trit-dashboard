import { Star, Flame, Trophy, Award, Target, Plus, Settings, MoreVertical, Droplets, Utensils, Zap, Info, Users, Smartphone, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const QuestsGamificationTab = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="animate-in fade-in duration-300">
            {/* Page Heading is handled by the parent layout, but we keep the main content structure */}

            <div className="flex flex-col gap-8">
                {/* Page Heading handled by parent, but including context here as per design flow */}
                <div className="flex flex-wrap justify-between items-end gap-3 mb-2">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-text-main dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">{t('coach_gamification.title')}</h1>
                        <p className="text-text-muted text-base font-normal leading-normal">{t('coach_gamification.description')}</p>
                    </div>
                </div>

                {/* Master Toggle */}
                <div className="@container">
                    <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 @[480px]:flex-row @[480px]:items-center">
                        <div className="flex flex-col gap-1">
                            <p className="text-text-main dark:text-white text-lg font-bold leading-tight">{t('coach_gamification.enable')}</p>
                            <p className="text-text-muted text-base font-normal leading-normal">{t('coach_gamification.enable_hint')}</p>
                        </div>
                        <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#dfe2e2] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary transition-colors">
                            <div className="h-full w-[27px] rounded-full bg-white shadow-md"></div>
                            <input defaultChecked className="invisible absolute" type="checkbox" />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Configuration Logic */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 px-1">
                            <Settings className="text-primary" size={24} />
                            <h2 className="text-text-main dark:text-white text-[22px] font-bold leading-tight">{t('coach_gamification.config_logic')}</h2>
                        </div>

                        {/* Points System */}
                        <div className="rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-background-dark p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Star className="text-primary fill-current" size={24} />
                                <h3 className="text-lg font-bold text-text-main">{t('coach_gamification.points_system')}</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-background-light dark:bg-white/5 rounded-lg">
                                    <span className="text-sm font-medium text-text-main">{t('coach_gamification.log_meal')}</span>
                                    <div className="flex items-center gap-2">
                                        <input className="w-16 h-8 rounded border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-[#171b1b] text-center text-sm focus:ring-primary focus:border-primary outline-none" type="number" defaultValue="10" />
                                        <span className="text-xs font-bold text-primary">PTS</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-background-light dark:bg-white/5 rounded-lg">
                                    <span className="text-sm font-medium text-text-main">{t('coach_gamification.hit_protein')}</span>
                                    <div className="flex items-center gap-2">
                                        <input className="w-16 h-8 rounded border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-[#171b1b] text-center text-sm focus:ring-primary focus:border-primary outline-none" type="number" defaultValue="25" />
                                        <span className="text-xs font-bold text-primary">PTS</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-background-light dark:bg-white/5 rounded-lg">
                                    <span className="text-sm font-medium text-text-main">{t('coach_gamification.drink_water')}</span>
                                    <div className="flex items-center gap-2">
                                        <input className="w-16 h-8 rounded border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-[#171b1b] text-center text-sm focus:ring-primary focus:border-primary outline-none" type="number" defaultValue="15" />
                                        <span className="text-xs font-bold text-primary">PTS</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Streak Rules */}
                        <div className="rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-background-dark p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Flame className="text-primary fill-current" size={24} />
                                <h3 className="text-lg font-bold text-text-main">{t('coach_gamification.streak_rules')}</h3>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-2">{t('coach_gamification.validation_interval')}</label>
                                    <select className={`w-full rounded-lg border border-[#dfe2e2] dark:border-[#2d3333] bg-[#f2f3f3] dark:bg-white/5 px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                        <option>{t('coach_gamification.intervals.0')}</option>
                                        <option>{t('coach_gamification.intervals.1')}</option>
                                        <option>{t('coach_gamification.intervals.2')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-2">{t('coach_gamification.grace_period')}</label>
                                    <select className={`w-full rounded-lg border border-[#dfe2e2] dark:border-[#2d3333] bg-[#f2f3f3] dark:bg-white/5 px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                        <option>{t('coach_gamification.grace_periods.0')}</option>
                                        <option>{t('coach_gamification.grace_periods.1')}</option>
                                        <option>{t('coach_gamification.grace_periods.2')}</option>
                                        <option>{t('coach_gamification.grace_periods.3')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content Management */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <Trophy className="text-primary" size={24} />
                                <h2 className="text-text-main dark:text-white text-[22px] font-bold leading-tight">{t('coach_gamification.content_management')}</h2>
                            </div>
                            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                <Plus size={16} />
                                {t('coach_gamification.new_content')}
                            </button>
                        </div>

                        {/* Achievement Badges */}
                        <div className="rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-background-dark p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-text-main">{t('coach_gamification.achievement_badges')}</h3>
                                <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">{t('coach_gamification.manage_all')}</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] flex flex-col items-center text-center gap-2 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors group">
                                    <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <Flame size={24} className="fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main opacity-90">{t('coach_gamification.badges.fire_starter.title')}</p>
                                        <p className="text-[10px] text-text-muted">{t('coach_gamification.badges.fire_starter.desc')}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] flex flex-col items-center text-center gap-2 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors group">
                                    <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Award size={24} className="fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main opacity-90">{t('coach_gamification.badges.macro_master.title')}</p>
                                        <p className="text-[10px] text-text-muted">{t('coach_gamification.badges.macro_master.desc')}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] flex flex-col items-center text-center gap-2 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors group">
                                    <div className="size-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                        <Zap size={24} className="fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main opacity-90">{t('coach_gamification.badges.early_bird.title')}</p>
                                        <p className="text-[10px] text-text-muted">{t('coach_gamification.badges.early_bird.desc')}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border-2 border-dashed border-[#dfe2e2] dark:border-[#2d3333] flex flex-col items-center justify-center text-center gap-2 text-text-muted hover:text-primary hover:border-primary cursor-pointer transition-all">
                                    <Plus size={24} />
                                    <p className="text-xs font-medium">{t('coach_gamification.add_badge')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Active Quests */}
                        <div className="rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-background-dark p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-text-main">{t('coach_gamification.active_quests')}</h3>
                                <button className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors">{t('coach_gamification.new_quest')}</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-3 border border-[#dfe2e2] dark:border-[#2d3333] rounded-lg hover:bg-background-light transition-colors cursor-pointer">
                                    <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                        <Target size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-text-main">{t('coach_gamification.quests.protein.title')}</p>
                                        <p className="text-[10px] text-text-muted">{t('coach_gamification.quests.protein.desc')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-text-main">{t('coach_gamification.quests.protein.status')}</span>
                                    </div>
                                    <button className="text-text-muted hover:text-text-main">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 p-3 border border-[#dfe2e2] dark:border-[#2d3333] rounded-lg hover:bg-background-light transition-colors cursor-pointer">
                                    <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Droplets size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-text-main">{t('coach_gamification.quests.hydration.title')}</p>
                                        <p className="text-[10px] text-text-muted">{t('coach_gamification.quests.hydration.desc')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-text-main">{t('coach_gamification.quests.hydration.status')}</span>
                                    </div>
                                    <button className="text-text-muted hover:text-text-main">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 p-3 border border-[#dfe2e2] dark:border-[#2d3333] rounded-lg bg-background-light dark:bg-white/5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                                    <div className="size-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                                        <Utensils size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-text-main">{t('coach_gamification.quests.meal_prep.title')}</p>
                                        <p className="text-[10px] text-text-muted">{t('coach_gamification.quests.meal_prep.desc')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-text-main">{t('coach_gamification.quests.meal_prep.status')}</span>
                                    </div>
                                    <button className="text-text-muted hover:text-text-main">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tooltip/Helper Bar */}
                <div className="mt-8 pt-4 border-t border-[#dfe2e2] dark:border-[#2d3333] flex justify-between items-center text-[#6f7b7a]">
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                            <Info size={14} />
                            {t('coach_gamification.footer.last_saved')}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={14} />
                            {t('coach_gamification.footer.active_participants')}
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <a className="text-xs hover:text-primary flex items-center gap-1" href="#">
                            <Smartphone size={12} />
                            {t('coach_gamification.footer.preview_app')}
                        </a>
                        <a className="text-xs hover:text-primary flex items-center gap-1" href="#">
                            <BookOpen size={12} />
                            {t('coach_gamification.footer.view_docs')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
