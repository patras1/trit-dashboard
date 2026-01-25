import { MessageSquare, Sparkles, ThumbsUp, ThumbsDown, Copy, History, Share2, Plus } from 'lucide-react';

export const SimulateTab = () => {
    return (
        <div className="flex flex-col h-full overflow-hidden -m-8">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-center gap-3 p-8 bg-background-light">
                <div className="flex flex-col gap-1">
                    <h1 className="text-text-main text-3xl font-bold leading-tight tracking-tight">Test & Preview Simulation</h1>
                    <p className="text-text-muted text-sm font-normal">Configure scenarios and preview the AI coach's response in real-time.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#dfe2e2] rounded-lg text-sm font-medium hover:bg-white transition-colors">
                        <History size={16} />
                        History
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#dfe2e2] rounded-lg text-sm font-medium hover:bg-white transition-colors">
                        <Share2 size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Simulation Container (Split Layout) */}
            <div className="flex flex-1 gap-6 px-8 pb-8 overflow-hidden bg-background-light">
                {/* Left Column: Context Configurator */}
                <div className="w-[400px] flex flex-col bg-white rounded-xl border border-[#dfe2e2] overflow-hidden shadow-sm">
                    <div className="p-6 flex-1 overflow-y-auto space-y-6">
                        <div>
                            <h3 className="text-text-main text-lg font-bold mb-4">Simulation Context</h3>
                            {/* Scenario Selector */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">Select Scenario</label>
                                <select className="w-full rounded-lg border border-[#dfe2e2] bg-white text-text-main focus:ring-primary focus:border-primary py-3 px-4 text-sm outline-none">
                                    <option value="missed">Missed Workout Support</option>
                                    <option value="protein">High Protein Day Achieved</option>
                                    <option value="binge">Emotional Eating Response</option>
                                    <option value="holiday">Holiday Travel Planning</option>
                                    <option value="plateau">Weight Loss Plateau Advice</option>
                                </select>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* User State Summary */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-semibold text-text-main uppercase tracking-wider">Current User Profile</h4>
                                <button className="text-primary text-xs font-bold hover:underline">Edit JSON</button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-background-light rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Daily Protein</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-xl font-bold text-text-main">142g</span>
                                        <span className="text-[10px] text-green-600 font-bold mb-1">+12%</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-background-light rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Streak</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-xl font-bold text-text-main">12 Days</span>
                                        <span className="text-orange-500 text-sm mb-1">🔥</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-background-light rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Goal Type</p>
                                    <span className="text-sm font-bold text-text-main">Hypertrophy</span>
                                </div>
                                <div className="p-4 bg-background-light rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Mood Score</p>
                                    <span className="text-sm font-bold text-text-main">Neutral (3/5)</span>
                                </div>
                            </div>
                            <div className="p-4 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-background-light transition-colors">
                                <Plus size={16} className="text-gray-400" />
                                <span className="text-xs font-medium text-gray-500">Add Data Field</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="p-6 border-t border-[#dfe2e2] bg-white">
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]">
                            <Sparkles size={20} />
                            Generate Response
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
                                <h3 className="text-sm font-bold text-text-main">Coach Preview</h3>
                                <p className="text-[10px] text-text-muted flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Live Preview Mode
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wide">Encouraging Tone</span>
                            <span className="px-2 py-1 bg-gray-100 text-text-muted text-[10px] font-bold rounded uppercase tracking-wide">v2.4-stable</span>
                        </div>
                    </div>

                    {/* Chat Message Area */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-background-light/30">
                        {/* User Input Mockup */}
                        <div className="flex justify-end">
                            <div className="max-w-[70%] bg-white border border-[#dfe2e2] p-4 rounded-2xl rounded-tr-none shadow-sm">
                                <p className="text-sm text-text-main leading-relaxed">
                                    "I missed my gym session today and I'm feeling pretty guilty about it. I also went a bit over on my carbs. What should I do for the rest of the day?"
                                </p>
                                <p className="text-[10px] text-gray-400 mt-2 text-right">Today, 10:45 AM</p>
                            </div>
                        </div>

                        {/* Coach Response */}
                        <div className="flex justify-start">
                            <div className="max-w-[85%]">
                                <div className="bg-primary text-white p-6 rounded-2xl rounded-tl-none shadow-lg space-y-4">
                                    <p className="text-sm leading-relaxed font-medium">
                                        Hey! First of all, take a deep breath. One missed session doesn't define your progress. You've hit your protein goals for 12 days straight—that's incredible consistency that doesn't just disappear because of one day.
                                    </p>
                                    <p className="text-sm leading-relaxed font-medium">
                                        For the rest of today, don't try to "starve" to make up for the carbs. Just focus on high-quality protein and hydration. We'll get back to the plan tomorrow. Remember, this is a marathon, not a sprint! 🏃♂️
                                    </p>
                                    <p className="text-sm leading-relaxed font-medium">
                                        Would you like me to adjust your workout schedule for the rest of the week to fit that session in?
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-3">
                                    <p className="text-[10px] text-text-muted font-medium">AI Coach • Just now</p>
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
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest text-center">End of Simulation</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input (Disabled in Preview) */}
                    <div className="p-6 border-t border-gray-100 bg-white">
                        <div className="relative">
                            <input
                                className="w-full pl-4 pr-12 py-3 rounded-xl border border-[#dfe2e2] bg-background-light text-sm focus:ring-primary focus:border-primary opacity-60 cursor-not-allowed outline-none"
                                disabled
                                placeholder="Type a follow-up user message to continue the test..."
                                type="text"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" disabled>
                                <MessageSquare size={18} />
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-text-muted mt-3 italic">
                            Input is disabled in 'Scenario Simulation' mode. Click 'Generate' to restart with new context.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
