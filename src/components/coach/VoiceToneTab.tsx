import { MessageSquare, Settings } from 'lucide-react';

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

interface VoiceToneTabProps {
    coach: Coach;
    onChange: (coach: Coach) => void;
}

export const VoiceToneTab = ({ coach, onChange }: VoiceToneTabProps) => {
    return (
        <div className="animate-in fade-in duration-300">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
                <div className="max-w-2xl">
                    <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">Voice & Tone</h1>
                    <p className="text-text-muted text-lg leading-relaxed">
                        Configure the linguistic style and communication patterns of the AI coach.
                    </p>
                </div>
            </div>

            <div className="space-y-8 max-w-4xl">
                {/* Voice Personalization */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-text-main border-b border-[#dfe2e2] pb-4 mb-6 flex items-center gap-2">
                        <MessageSquare size={20} className="text-primary" />
                        Voice Personalization
                    </h3>

                    <div className="space-y-6">
                        {/* Base Tone */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">Base Tone</label>
                            <select
                                value={coach.tone}
                                onChange={(e) => onChange({ ...coach, tone: e.target.value })}
                                className="w-full md:w-1/2 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none"
                            >
                                <option value="calm">Calm & Reassuring</option>
                                <option value="direct">Direct & No-Nonsense</option>
                                <option value="motivational">High Energy & Motivational</option>
                                <option value="friendly">Friendly & Conversational</option>
                                <option value="professional">Professional & Formal</option>
                            </select>
                            <p className="text-xs text-text-muted mt-2">Sets the fundamental communication style for generated messages.</p>
                        </div>

                        {/* Language */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">Primary Language</label>
                            <select
                                value={coach.language}
                                onChange={(e) => onChange({ ...coach, language: e.target.value })}
                                className="w-full md:w-1/2 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                                <option value="pt">Portuguese</option>
                            </select>
                            <p className="text-xs text-text-muted mt-2">Default language for all coach communications.</p>
                        </div>

                        {/* Response Length Preference */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">Response Length</label>
                            <select
                                className="w-full md:w-1/2 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none"
                                defaultValue="balanced"
                            >
                                <option value="concise">Concise (1-2 sentences)</option>
                                <option value="balanced">Balanced (2-4 sentences)</option>
                                <option value="detailed">Detailed (Paragraph form)</option>
                            </select>
                            <p className="text-xs text-text-muted mt-2">Average length of coach responses to user queries.</p>
                        </div>

                        {/* Emoji Usage */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">Emoji Usage</label>
                            <select
                                className="w-full md:w-1/2 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none"
                                defaultValue="moderate"
                            >
                                <option value="none">None (Text only)</option>
                                <option value="minimal">Minimal (Occasional)</option>
                                <option value="moderate">Moderate (Balanced)</option>
                                <option value="frequent">Frequent (Every message)</option>
                            </select>
                            <p className="text-xs text-text-muted mt-2">How often the coach uses emojis in messages.</p>
                        </div>

                        {/* Language Model Info */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">Language Model</label>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">GPT-4-Turbo</span>
                                <span className="text-xs text-text-muted">Currently active</span>
                            </div>
                            <p className="text-xs text-text-muted">The AI model powering this coach's responses.</p>
                        </div>
                    </div>
                </div>

                {/* Advanced Settings (Disabled for now) */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm opacity-75">
                    <div className="flex justify-between items-center mb-6 border-b border-[#dfe2e2] pb-4">
                        <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
                            <Settings size={20} className="text-text-muted" />
                            Advanced Prompt Engineering
                        </h3>
                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded font-mono">Coming Soon</span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">System Prompt Template</label>
                            <textarea
                                disabled
                                placeholder="You are a tough but fair coach. You prefer short sentences..."
                                className="w-full bg-background-light border-none rounded-lg p-4 h-32 resize-none text-xs font-mono text-text-muted cursor-not-allowed"
                            ></textarea>
                            <p className="text-xs text-text-muted mt-2">Custom system prompt for advanced users (v2.0)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">Vocabulary Preferences</label>
                            <input
                                disabled
                                type="text"
                                placeholder="gains, fuel, power, shred, optimize..."
                                className="w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm text-text-muted cursor-not-allowed"
                            />
                            <p className="text-xs text-text-muted mt-2">Preferred terms and phrases for this coach (v2.0)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">Forbidden Words</label>
                            <input
                                disabled
                                type="text"
                                placeholder="diet, cheat, guilt, bad food..."
                                className="w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm text-text-muted cursor-not-allowed"
                            />
                            <p className="text-xs text-text-muted mt-2">Words the coach should avoid using (v2.0)</p>
                        </div>
                    </div>
                </div>

                {/* Example Messages Preview */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-text-main mb-4">Example Messages</h3>
                    <p className="text-xs text-text-muted mb-4">Preview how this coach might respond with current settings</p>

                    <div className="space-y-4">
                        {/* Example 1 */}
                        <div className="bg-background-light p-4 rounded-lg border-l-4 border-primary">
                            <p className="text-xs font-bold text-text-muted mb-1">Scenario: User missed protein goal</p>
                            <p className="text-sm text-text-main leading-relaxed">
                                {coach.tone === 'motivational' && "No worries! Tomorrow's a fresh start. Let's crush that protein goal together! 💪"}
                                {coach.tone === 'direct' && "You missed your protein target today. Plan your meals better tomorrow."}
                                {coach.tone === 'calm' && "It's okay - one day won't derail your progress. Let's refocus for tomorrow."}
                                {coach.tone === 'friendly' && "Hey, happens to everyone! Let's make sure tomorrow we hit that goal. You got this!"}
                                {coach.tone === 'professional' && "Your protein intake was below target today. I recommend prioritizing protein-rich foods in your next meal plan."}
                            </p>
                        </div>

                        {/* Example 2 */}
                        <div className="bg-background-light p-4 rounded-lg border-l-4 border-primary">
                            <p className="text-xs font-bold text-text-muted mb-1">Scenario: User achieved weekly streak</p>
                            <p className="text-sm text-text-main leading-relaxed">
                                {coach.tone === 'motivational' && "INCREDIBLE! 7 days of consistency! This is how champions are built! 🔥🎉"}
                                {coach.tone === 'direct' && "Well done. You've completed 7 consecutive days. Keep it up."}
                                {coach.tone === 'calm' && "Great work this week. You're building a strong foundation with this consistency."}
                                {coach.tone === 'friendly' && "Wow, a full week! I'm so proud of you! Keep this momentum going! 🌟"}
                                {coach.tone === 'professional' && "Congratulations on maintaining a 7-day tracking streak. Consistency is key to achieving your nutritional objectives."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
