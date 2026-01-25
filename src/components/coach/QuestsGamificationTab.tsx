import { Trophy, Star, Flame, Target, Award, Plus, Settings as SettingsIcon } from 'lucide-react';

export const QuestsGamificationTab = () => {
    return (
        <div className="animate-in fade-in duration-300 space-y-6">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-text-main text-4xl font-black leading-tight tracking-tight">Quests & Gamification</h1>
                    <p className="text-text-muted text-base font-normal">Design engaging challenges, rewards, and achievement systems to motivate your clients.</p>
                </div>
            </div>

            {/* Enable Gamification Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-[#dfe2e2] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-1">
                    <p className="text-text-main text-lg font-bold leading-tight">Enable Gamification</p>
                    <p className="text-text-muted text-sm font-normal">Activate quests, badges, and points for users to increase engagement.</p>
                </div>
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-background-light p-0.5 transition-colors has-[:checked]:justify-end has-[:checked]:bg-primary">
                    <div className="h-full w-[27px] rounded-full bg-white shadow-md"></div>
                    <input className="invisible absolute" type="checkbox" defaultChecked />
                </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Points System */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Star className="text-primary" size={20} />
                        </div>
                        <h3 className="text-text-main text-lg font-bold">Points System</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Log Meal</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={10}
                                    className="w-24 bg-background-light border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                                />
                                <span className="text-xs text-text-muted">points</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Hit Protein Goal</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={25}
                                    className="w-24 bg-background-light border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                                />
                                <span className="text-xs text-text-muted">points</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Complete Workout</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={50}
                                    className="w-24 bg-background-light border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                                />
                                <span className="text-xs text-text-muted">points</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Daily Streak Bonus</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={100}
                                    className="w-24 bg-background-light border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                                />
                                <span className="text-xs text-text-muted">points</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Streak Settings */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Flame className="text-orange-500" size={20} />
                        </div>
                        <h3 className="text-text-main text-lg font-bold">Streak Rules</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Streak Requirement</label>
                            <select className="w-full bg-background-light border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none">
                                <option>Log at least 1 meal</option>
                                <option>Hit macro targets</option>
                                <option>Complete all meals</option>
                                <option>Custom criteria</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Grace Period</label>
                            <select className="w-full bg-background-light border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none">
                                <option>None (Streak breaks immediately)</option>
                                <option>1 day (1 miss allowed)</option>
                                <option>2 days (2 misses allowed)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Milestone Rewards</label>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-text-muted">7 days</span>
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded font-bold">+500 pts</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-text-muted">30 days</span>
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded font-bold">+2000 pts</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-text-muted">100 days</span>
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded font-bold">+10000 pts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Settings */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Trophy className="text-yellow-600" size={20} />
                        </div>
                        <h3 className="text-text-main text-lg font-bold">Leaderboards</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Enable Leaderboards</label>
                            <label className="relative inline-flex h-[27px] w-[47px] cursor-pointer items-center rounded-full bg-background-light p-0.5 transition-colors has-[:checked]:justify-end has-[:checked]:bg-primary">
                                <div className="h-full w-[23px] rounded-full bg-white shadow-md"></div>
                                <input className="invisible absolute" type="checkbox" defaultChecked />
                            </label>
                            <p className="text-xs text-text-muted mt-2">Allow users to compete on leaderboards</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Ranking Metric</label>
                            <select className="w-full bg-background-light border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none">
                                <option>Total Points</option>
                                <option>Current Streak</option>
                                <option>Quests Completed</option>
                                <option>Weekly Activity</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-2">Visibility</label>
                            <select className="w-full bg-background-light border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none">
                                <option>Global (All users)</option>
                                <option>Friends Only</option>
                                <option>Program Members</option>
                                <option>Private (Hidden)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievement Badges */}
            <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Award className="text-purple-600" size={20} />
                        </div>
                        <h3 className="text-text-main text-lg font-bold">Achievement Badges</h3>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                        <Plus size={16} />
                        Create Badge
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Badge 1 */}
                    <div className="border border-[#dfe2e2] p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                                <Flame className="text-white" size={28} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-text-main">Fire Starter</h4>
                                <p className="text-xs text-text-muted mt-1">Reach a 7-day streak</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-primary">+500 pts</span>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <SettingsIcon size={14} className="text-text-muted" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Badge 2 */}
                    <div className="border border-[#dfe2e2] p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                                <Target className="text-white" size={28} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-text-main">Macro Master</h4>
                                <p className="text-xs text-text-muted mt-1">Hit macros 10 days straight</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-primary">+800 pts</span>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <SettingsIcon size={14} className="text-text-muted" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Badge 3 */}
                    <div className="border border-[#dfe2e2] p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                                <Trophy className="text-white" size={28} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-text-main">Champion</h4>
                                <p className="text-xs text-text-muted mt-1">Complete 50 quests</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-primary">+1500 pts</span>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <SettingsIcon size={14} className="text-text-muted" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Badge 4 */}
                    <div className="border border-[#dfe2e2] p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                                <Star className="text-white" size={28} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-text-main">Rising Star</h4>
                                <p className="text-xs text-text-muted mt-1">Earn 10,000 total points</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-primary">+2000 pts</span>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <SettingsIcon size={14} className="text-text-muted" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Quests */}
            <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-text-main text-lg font-bold">Active Quests</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                        <Plus size={16} />
                        Create Quest
                    </button>
                </div>

                <div className="space-y-3">
                    {/* Quest 1 */}
                    <div className="border border-[#dfe2e2] p-4 rounded-lg hover:bg-background-light transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Target className="text-primary" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-text-main">Protein Power Week</h4>
                                    <p className="text-xs text-text-muted mt-1">Hit your protein goal for 7 consecutive days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded">+1000 pts</span>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Quest 2 */}
                    <div className="border border-[#dfe2e2] p-4 rounded-lg hover:bg-background-light transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Flame className="text-orange-500" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-text-main">Daily Tracker</h4>
                                    <p className="text-xs text-text-muted mt-1">Log all meals for 14 days straight</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded">+1500 pts</span>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Quest 3 */}
                    <div className="border border-[#dfe2e2] p-4 rounded-lg hover:bg-background-light transition-colors cursor-pointer opacity-60">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Trophy className="text-gray-400" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-text-main">Hydration Hero</h4>
                                    <p className="text-xs text-text-muted mt-1">Drink 8 glasses of water daily for 30 days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded">+2000 pts</span>
                                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded">DRAFT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
