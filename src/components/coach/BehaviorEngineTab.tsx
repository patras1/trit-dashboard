import { Info, HelpCircle } from 'lucide-react';
import { useState } from 'react';

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
                    <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">Behavior Engine</h1>
                    <p className="text-text-muted text-lg leading-relaxed">
                        Fine-tune the AI coach's personality traits and behavioral logic. These values directly influence natural language generation and decision-making thresholds.
                    </p>
                </div>
                <button className="bg-white border border-[#f2f3f3] text-text-main px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <HelpCircle size={16} />
                    View Documentation
                </button>
            </div>

            {/* Section: Personality Matrix */}
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-text-main text-xl font-bold">Personality Matrix</h2>
                    <Info size={16} className="text-text-muted cursor-help" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Slider Card: Strictness */}
                    <div className="bg-white border border-[#f2f3f3] p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-bold text-text-main">Strictness</label>
                            <span className="bg-primary/10 text-primary text-xs font-mono font-bold px-2 py-1 rounded">
                                {coach.strictness.toFixed(2)}
                            </span>
                        </div>
                        <input
                            className="w-full h-1.5 bg-[#f2f3f3] rounded-lg appearance-none cursor-pointer accent-primary"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={coach.strictness}
                            onChange={(e) => handleSliderChange('strictness', parseFloat(e.target.value))}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Lenient</span>
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Rigid</span>
                        </div>
                    </div>

                    {/* Slider Card: Protein Priority */}
                    <div className="bg-white border border-[#f2f3f3] p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-bold text-text-main">Protein Priority</label>
                            <span className="bg-primary/10 text-primary text-xs font-mono font-bold px-2 py-1 rounded">
                                {coach.proteinPriority.toFixed(2)}
                            </span>
                        </div>
                        <input
                            className="w-full h-1.5 bg-[#f2f3f3] rounded-lg appearance-none cursor-pointer accent-primary"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={coach.proteinPriority}
                            onChange={(e) => handleSliderChange('proteinPriority', parseFloat(e.target.value))}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Standard</span>
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Aggressive</span>
                        </div>
                    </div>

                    {/* Slider Card: Hydration Emphasis */}
                    <div className="bg-white border border-[#f2f3f3] p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-bold text-text-main">Hydration Emphasis</label>
                            <span className="bg-primary/10 text-primary text-xs font-mono font-bold px-2 py-1 rounded">
                                {coach.hydrationEmphasis.toFixed(2)}
                            </span>
                        </div>
                        <input
                            className="w-full h-1.5 bg-[#f2f3f3] rounded-lg appearance-none cursor-pointer accent-primary"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={coach.hydrationEmphasis}
                            onChange={(e) => handleSliderChange('hydrationEmphasis', parseFloat(e.target.value))}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Minimal</span>
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Frequent</span>
                        </div>
                    </div>

                    {/* Slider Card: Encouragement */}
                    <div className="bg-white border border-[#f2f3f3] p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-bold text-text-main">Encouragement</label>
                            <span className="bg-primary/10 text-primary text-xs font-mono font-bold px-2 py-1 rounded">
                                {encouragement.toFixed(2)}
                            </span>
                        </div>
                        <input
                            className="w-full h-1.5 bg-[#f2f3f3] rounded-lg appearance-none cursor-pointer accent-primary"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={encouragement}
                            onChange={(e) => setEncouragement(parseFloat(e.target.value))}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Stoic</span>
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Hyper</span>
                        </div>
                    </div>

                    {/* Slider Card: Technicality */}
                    <div className="bg-white border border-[#f2f3f3] p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-bold text-text-main">Technicality</label>
                            <span className="bg-primary/10 text-primary text-xs font-mono font-bold px-2 py-1 rounded">
                                {technicality.toFixed(2)}
                            </span>
                        </div>
                        <input
                            className="w-full h-1.5 bg-[#f2f3f3] rounded-lg appearance-none cursor-pointer accent-primary"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={technicality}
                            onChange={(e) => setTechnicality(parseFloat(e.target.value))}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Simple</span>
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Scientific</span>
                        </div>
                    </div>

                    {/* Slider Card: Directness */}
                    <div className="bg-white border border-[#f2f3f3] p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-bold text-text-main">Directness</label>
                            <span className="bg-primary/10 text-primary text-xs font-mono font-bold px-2 py-1 rounded">
                                {directness.toFixed(2)}
                            </span>
                        </div>
                        <input
                            className="w-full h-1.5 bg-[#f2f3f3] rounded-lg appearance-none cursor-pointer accent-primary"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={directness}
                            onChange={(e) => setDirectness(parseFloat(e.target.value))}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Nuanced</span>
                            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Blunt</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Behavioral Triggers */}
            <section className="mb-12">
                <h2 className="text-text-main text-xl font-bold mb-6">Behavioral Triggers</h2>
                <div className="bg-white border border-[#f2f3f3] rounded-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#f2f3f3]">
                        {/* Trigger 1 */}
                        <div className="p-6">
                            <label className="block text-sm font-bold text-text-main mb-2">Notification Frequency</label>
                            <p className="text-xs text-text-muted mb-4">How often should the coach ping the user for updates?</p>
                            <select
                                className="w-full bg-background-light border-none rounded-lg text-sm py-2 px-3 focus:ring-2 focus:ring-primary/50 text-text-main font-medium outline-none"
                                value={notificationFreq}
                                onChange={(e) => setNotificationFreq(e.target.value)}
                            >
                                <option value="low">Low (1-2 per day)</option>
                                <option value="medium">Medium (3-4 per day)</option>
                                <option value="high">High (6+ per day)</option>
                                <option value="realtime">Real-time (Contextual)</option>
                            </select>
                        </div>

                        {/* Trigger 2 */}
                        <div className="p-6">
                            <label className="block text-sm font-bold text-text-main mb-2">Forgiveness Factor</label>
                            <p className="text-xs text-text-muted mb-4">Tolerance level for missed targets or logging lapses.</p>
                            <select
                                className="w-full bg-background-light border-none rounded-lg text-sm py-2 px-3 focus:ring-2 focus:ring-primary/50 text-text-main font-medium outline-none"
                                value={forgivenessFactor}
                                onChange={(e) => setForgivenessFactor(e.target.value)}
                            >
                                <option value="strict">Strict (Immediate Warning)</option>
                                <option value="balanced">Balanced (Grace Period)</option>
                                <option value="lenient">Lenient (Delayed Intervention)</option>
                            </select>
                        </div>

                        {/* Trigger 3 */}
                        <div className="p-6">
                            <label className="block text-sm font-bold text-text-main mb-2">Check-in Style</label>
                            <p className="text-xs text-text-muted mb-4">Tone used during mandatory daily reflections.</p>
                            <select
                                className="w-full bg-background-light border-none rounded-lg text-sm py-2 px-3 focus:ring-2 focus:ring-primary/50 text-text-main font-medium outline-none"
                                value={checkinStyle}
                                onChange={(e) => setCheckinStyle(e.target.value)}
                            >
                                <option value="aggressive">Aggressive (Metric-first)</option>
                                <option value="supportive">Supportive (Feeling-first)</option>
                                <option value="passive">Passive (Observation-only)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[#f2f3f3]">
                <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#f2f3f3] text-text-main text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Reset Defaults
                </button>
                <button className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md">
                    Update Engine Logic
                </button>
            </div>
        </div>
    );
};
