import { Star, Flame, Trophy, Award, Target, Plus, Settings, MoreVertical, Droplets, Utensils, Zap, Info, Users, Smartphone, BookOpen } from 'lucide-react';

export const QuestsGamificationTab = () => {
    return (
        <div className="animate-in fade-in duration-300">
            {/* Page Heading is handled by the parent layout, but we keep the main content structure */}

            <div className="flex flex-col gap-8">
                {/* Page Heading handled by parent, but including context here as per design flow */}
                <div className="flex flex-wrap justify-between items-end gap-3 mb-2">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-text-main dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Quests & Gamification</h1>
                        <p className="text-text-muted text-base font-normal leading-normal">Manage points, streaks, and quest content for your clients.</p>
                    </div>
                </div>

                {/* Master Toggle */}
                <div className="@container">
                    <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 @[480px]:flex-row @[480px]:items-center">
                        <div className="flex flex-col gap-1">
                            <p className="text-text-main dark:text-white text-lg font-bold leading-tight">Enable Gamification</p>
                            <p className="text-text-muted text-base font-normal leading-normal">Global master switch for all gamification features across the user mobile app.</p>
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
                            <h2 className="text-text-main dark:text-white text-[22px] font-bold leading-tight">Configuration Logic</h2>
                        </div>

                        {/* Points System */}
                        <div className="rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-background-dark p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Star className="text-primary fill-current" size={24} />
                                <h3 className="text-lg font-bold text-text-main">Points System</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-background-light dark:bg-white/5 rounded-lg">
                                    <span className="text-sm font-medium text-text-main">Log a Meal</span>
                                    <div className="flex items-center gap-2">
                                        <input className="w-16 h-8 rounded border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-[#171b1b] text-center text-sm focus:ring-primary focus:border-primary outline-none" type="number" defaultValue="10" />
                                        <span className="text-xs font-bold text-primary">PTS</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-background-light dark:bg-white/5 rounded-lg">
                                    <span className="text-sm font-medium text-text-main">Hit Protein Goal</span>
                                    <div className="flex items-center gap-2">
                                        <input className="w-16 h-8 rounded border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-[#171b1b] text-center text-sm focus:ring-primary focus:border-primary outline-none" type="number" defaultValue="25" />
                                        <span className="text-xs font-bold text-primary">PTS</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-background-light dark:bg-white/5 rounded-lg">
                                    <span className="text-sm font-medium text-text-main">Drink 2L Water</span>
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
                                <h3 className="text-lg font-bold text-text-main">Streak Rules</h3>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-2">Validation Interval</label>
                                    <select className="w-full rounded-lg border border-[#dfe2e2] dark:border-[#2d3333] bg-[#f2f3f3] dark:bg-white/5 px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                                        <option>Daily Check-in</option>
                                        <option>Weekly Compliance</option>
                                        <option>Bi-Weekly Audit</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-2">Grace Period</label>
                                    <select className="w-full rounded-lg border border-[#dfe2e2] dark:border-[#2d3333] bg-[#f2f3f3] dark:bg-white/5 px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                                        <option>0 days (No leeway)</option>
                                        <option>1 day allowance</option>
                                        <option>2 days allowance</option>
                                        <option>3 days allowance</option>
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
                                <h2 className="text-text-main dark:text-white text-[22px] font-bold leading-tight">Content Management</h2>
                            </div>
                            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                <Plus size={16} />
                                New Content
                            </button>
                        </div>

                        {/* Achievement Badges */}
                        <div className="rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-background-dark p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-text-main">Achievement Badges</h3>
                                <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Manage All</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] flex flex-col items-center text-center gap-2 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors group">
                                    <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <Flame size={24} className="fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main opacity-90">Fire Starter</p>
                                        <p className="text-[10px] text-text-muted">7-day streak</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] flex flex-col items-center text-center gap-2 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors group">
                                    <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Award size={24} className="fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main opacity-90">Macro Master</p>
                                        <p className="text-[10px] text-text-muted">Perfect week</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] flex flex-col items-center text-center gap-2 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors group">
                                    <div className="size-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                        <Zap size={24} className="fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main opacity-90">Early Bird</p>
                                        <p className="text-[10px] text-text-muted">Log before 8 AM</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border-2 border-dashed border-[#dfe2e2] dark:border-[#2d3333] flex flex-col items-center justify-center text-center gap-2 text-text-muted hover:text-primary hover:border-primary cursor-pointer transition-all">
                                    <Plus size={24} />
                                    <p className="text-xs font-medium">Add Badge</p>
                                </div>
                            </div>
                        </div>

                        {/* Active Quests */}
                        <div className="rounded-xl border border-[#dfe2e2] dark:border-[#2d3333] bg-white dark:bg-background-dark p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-text-main">Active Quests</h3>
                                <button className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors">New Quest</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-3 border border-[#dfe2e2] dark:border-[#2d3333] rounded-lg hover:bg-background-light transition-colors cursor-pointer">
                                    <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                        <Target size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-text-main">Protein Power Week</p>
                                        <p className="text-[10px] text-text-muted">Ends in 3 days</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-text-main">Live</span>
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
                                        <p className="text-sm font-bold text-text-main">Hydration Hero</p>
                                        <p className="text-[10px] text-text-muted">Continuous</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-text-main">Live</span>
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
                                        <p className="text-sm font-bold text-text-main">Meal Prep Master</p>
                                        <p className="text-[10px] text-text-muted">Scheduling phase</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-text-main">Draft</span>
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
                            Last saved 2 minutes ago
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={14} />
                            124 active participants
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <a className="text-xs hover:text-primary flex items-center gap-1" href="#">
                            <Smartphone size={12} />
                            Preview Mobile App
                        </a>
                        <a className="text-xs hover:text-primary flex items-center gap-1" href="#">
                            <BookOpen size={12} />
                            View Documentation
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
