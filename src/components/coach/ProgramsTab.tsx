import { Calendar, Play, Plus, MoreVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ProgramsTab = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="animate-in fade-in duration-300 space-y-6">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-text-main text-4xl font-black leading-tight tracking-tight">{t('coach_programs.title')}</h1>
                    <p className="text-text-muted text-base font-normal">{t('coach_programs.description')}</p>
                </div>
            </div>

            {/* Action Panel (Toggle) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-[#dfe2e2] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-1">
                    <p className="text-text-main text-lg font-bold leading-tight">{t('coach_programs.enable_programs')}</p>
                    <p className="text-text-muted text-sm font-normal">{t('coach_programs.enable_hint')}</p>
                </div>
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-background-light p-0.5 transition-colors has-[:checked]:justify-end has-[:checked]:bg-primary">
                    <div className="h-full w-[27px] rounded-full bg-white shadow-md"></div>
                    <input className="invisible absolute" type="checkbox" defaultChecked />
                </label>
            </div>

            <div className="pt-4">
                <h2 className="text-text-main text-xl font-bold leading-tight mb-4">{t('coach_programs.your_programs')}</h2>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Add New Program Card */}
                    <button className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#dfe2e2] bg-transparent p-8 text-text-muted hover:border-primary hover:text-primary transition-all min-h-[280px] group">
                        <div className="size-12 rounded-full bg-background-light group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                            <Plus size={24} />
                        </div>
                        <span className="text-base font-bold">{t('coach_programs.add_new')}</span>
                    </button>

                    {/* Program Card 1: Rapid Reset Protocol */}
                    <div className="flex flex-col rounded-xl border border-[#dfe2e2] bg-white overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
                        <div className="h-32 bg-primary/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4b7c77] to-[#a8c1bf] opacity-90"></div>
                            <div className={`absolute top-3 ${i18n.dir() === 'rtl' ? 'left-3' : 'right-3'}`}>
                                <button className="text-white bg-black/20 hover:bg-black/40 p-1 rounded-lg backdrop-blur-sm transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-text-main text-lg font-bold">{t('coach_programs.card_1.title')}</h3>
                                <p className="text-text-muted text-xs">{t('coach_programs.card_1.desc')}</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                                    <Calendar size={12} />
                                    30 DAYS
                                </div>
                                <div className="flex items-center gap-1 rounded bg-background-light px-2 py-1 text-[10px] font-bold text-text-muted">
                                    <Play size={12} />
                                    12 VIDEOS
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{t('coach_programs.card_1.structure')}</p>
                                <div className="flex items-center gap-1">
                                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                                    <div className="h-1.5 flex-1 rounded-full bg-primary/30"></div>
                                    <div className="h-1.5 flex-1 rounded-full bg-primary/30"></div>
                                </div>
                                <div className="flex justify-between text-[11px] text-text-muted">
                                    <span>{t('coach_programs.card_1.phases.0')}</span>
                                    <span>{t('coach_programs.card_1.phases.1')}</span>
                                    <span>{t('coach_programs.card_1.phases.2')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Card 2: Endurance Fueling */}
                    <div className="flex flex-col rounded-xl border border-[#dfe2e2] bg-white overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
                        <div className="h-32 bg-primary/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2d4f4b] to-[#4b7c77] opacity-90"></div>
                            <div className={`absolute top-3 ${i18n.dir() === 'rtl' ? 'left-3' : 'right-3'}`}>
                                <button className="text-white bg-black/20 hover:bg-black/40 p-1 rounded-lg backdrop-blur-sm transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-text-main text-lg font-bold">{t('coach_programs.card_2.title')}</h3>
                                <p className="text-text-muted text-xs">{t('coach_programs.card_2.desc')}</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                                    <Calendar size={12} />
                                    12 WEEKS
                                </div>
                                <div className="flex items-center gap-1 rounded bg-background-light px-2 py-1 text-[10px] font-bold text-text-muted">
                                    <Play size={12} />
                                    8 VIDEOS
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{t('coach_programs.card_2.structure')}</p>
                                <div className="flex items-center gap-1">
                                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                                    <div className="h-1.5 flex-1 rounded-full bg-primary/30"></div>
                                    <div className="h-1.5 flex-1 rounded-full bg-primary/30"></div>
                                </div>
                                <div className="flex justify-between text-[11px] text-text-muted">
                                    <span>{t('coach_programs.card_2.phases.0')}</span>
                                    <span>{t('coach_programs.card_2.phases.1')}</span>
                                    <span>{t('coach_programs.card_2.phases.2')}</span>
                                    <span>{t('coach_programs.card_2.phases.3')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Card 3: Gut Health Intensive */}
                    <div className="flex flex-col rounded-xl border border-[#dfe2e2] bg-white overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
                        <div className="h-32 bg-primary/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#d4a373] to-[#4b7c77] opacity-90"></div>
                            <div className={`absolute top-3 ${i18n.dir() === 'rtl' ? 'left-3' : 'right-3'}`}>
                                <button className="text-white bg-black/20 hover:bg-black/40 p-1 rounded-lg backdrop-blur-sm transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-text-main text-lg font-bold">{t('coach_programs.card_3.title')}</h3>
                                <p className="text-text-muted text-xs">{t('coach_programs.card_3.desc')}</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                                    <Calendar size={12} />
                                    21 DAYS
                                </div>
                                <div className="flex items-center gap-1 rounded bg-background-light px-2 py-1 text-[10px] font-bold text-text-muted">
                                    <Play size={12} />
                                    5 VIDEOS
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{t('coach_programs.card_3.structure')}</p>
                                <div className="flex items-center gap-1">
                                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                                </div>
                                <div className="flex justify-between text-[11px] text-text-muted">
                                    <span>{t('coach_programs.card_3.phases.0')}</span>
                                    <span>{t('coach_programs.card_3.phases.1')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
