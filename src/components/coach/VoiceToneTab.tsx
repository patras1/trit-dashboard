import { MessageSquare, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation();

    return (
        <div className="animate-in fade-in duration-300">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
                <div className="max-w-2xl">
                    <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">{t('coach_voice.title')}</h1>
                    <p className="text-text-muted text-lg leading-relaxed">
                        {t('coach_voice.description')}
                    </p>
                </div>
            </div>

            <div className="space-y-8 max-w-4xl">
                {/* Voice Personalization */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-text-main border-b border-[#dfe2e2] pb-4 mb-6 flex items-center gap-2">
                        <MessageSquare size={20} className="text-primary" />
                        {t('coach_voice.voice_personalization')}
                    </h3>

                    <div className="space-y-6">
                        {/* Base Tone */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">{t('coach_voice.base_tone.label')}</label>
                            <select
                                value={coach.tone}
                                onChange={(e) => onChange({ ...coach, tone: e.target.value })}
                                className={`w-full md:w-1/2 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            >
                                <option value="calm">{t('coach_voice.base_tone.options.calm')}</option>
                                <option value="direct">{t('coach_voice.base_tone.options.direct')}</option>
                                <option value="motivational">{t('coach_voice.base_tone.options.motivational')}</option>
                                <option value="friendly">{t('coach_voice.base_tone.options.friendly')}</option>
                                <option value="professional">{t('coach_voice.base_tone.options.professional')}</option>
                            </select>
                            <p className="text-xs text-text-muted mt-2">{t('coach_voice.base_tone.hint')}</p>
                        </div>

                        {/* Language */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">{t('coach_voice.primary_language.label')}</label>
                            <select
                                value={coach.language}
                                onChange={(e) => onChange({ ...coach, language: e.target.value })}
                                className={`w-full md:w-1/2 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            >
                                <option value="en">{t('coach_voice.primary_language.options.en')}</option>
                                <option value="es">{t('coach_voice.primary_language.options.es')}</option>
                                <option value="fr">{t('coach_voice.primary_language.options.fr')}</option>
                                <option value="de">{t('coach_voice.primary_language.options.de')}</option>
                                <option value="it">{t('coach_voice.primary_language.options.it')}</option>
                                <option value="pt">{t('coach_voice.primary_language.options.pt')}</option>
                            </select>
                            <p className="text-xs text-text-muted mt-2">{t('coach_voice.primary_language.hint')}</p>
                        </div>

                        {/* Response Length Preference */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">{t('coach_voice.response_length.label')}</label>
                            <select
                                className={`w-full md:w-1/2 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                                defaultValue="balanced"
                            >
                                <option value="concise">{t('coach_voice.response_length.options.concise')}</option>
                                <option value="balanced">{t('coach_voice.response_length.options.balanced')}</option>
                                <option value="detailed">{t('coach_voice.response_length.options.detailed')}</option>
                            </select>
                            <p className="text-xs text-text-muted mt-2">{t('coach_voice.response_length.hint')}</p>
                        </div>

                        {/* Emoji Usage */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">{t('coach_voice.emoji_usage.label')}</label>
                            <select
                                className={`w-full md:w-1/2 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                                defaultValue="moderate"
                            >
                                <option value="none">{t('coach_voice.emoji_usage.options.none')}</option>
                                <option value="minimal">{t('coach_voice.emoji_usage.options.minimal')}</option>
                                <option value="moderate">{t('coach_voice.emoji_usage.options.moderate')}</option>
                                <option value="frequent">{t('coach_voice.emoji_usage.options.frequent')}</option>
                            </select>
                            <p className="text-xs text-text-muted mt-2">{t('coach_voice.emoji_usage.hint')}</p>
                        </div>

                        {/* Language Model Info */}
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">{t('coach_voice.language_model.label')}</label>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">GPT-4-Turbo</span>
                                <span className="text-xs text-text-muted">{t('coach_voice.language_model.active')}</span>
                            </div>
                            <p className="text-xs text-text-muted">{t('coach_voice.language_model.hint')}</p>
                        </div>
                    </div>
                </div>

                {/* Advanced Settings (Disabled for now) */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm opacity-75">
                    <div className="flex justify-between items-center mb-6 border-b border-[#dfe2e2] pb-4">
                        <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
                            <Settings size={20} className="text-text-muted" />
                            {t('coach_voice.advanced_settings.title')}
                        </h3>
                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded font-mono">{t('coach_voice.advanced_settings.coming_soon')}</span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">{t('coach_voice.advanced_settings.system_prompt')}</label>
                            <textarea
                                disabled
                                placeholder="You are a tough but fair coach. You prefer short sentences..."
                                className={`w-full bg-background-light border-none rounded-lg p-4 h-32 resize-none text-xs font-mono text-text-muted cursor-not-allowed ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            ></textarea>
                            <p className="text-xs text-text-muted mt-2">{t('coach_voice.advanced_settings.system_prompt_hint')}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">{t('coach_voice.advanced_settings.vocabulary')}</label>
                            <input
                                disabled
                                type="text"
                                placeholder="gains, fuel, power, shred, optimize..."
                                className={`w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm text-text-muted cursor-not-allowed ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            />
                            <p className="text-xs text-text-muted mt-2">{t('coach_voice.advanced_settings.vocabulary_hint')}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-main mb-1">{t('coach_voice.advanced_settings.forbidden')}</label>
                            <input
                                disabled
                                type="text"
                                placeholder="diet, cheat, guilt, bad food..."
                                className={`w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm text-text-muted cursor-not-allowed ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            />
                            <p className="text-xs text-text-muted mt-2">{t('coach_voice.advanced_settings.forbidden_hint')}</p>
                        </div>
                    </div>
                </div>

                {/* Example Messages Preview */}
                <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-text-main mb-4">{t('coach_voice.example_messages.title')}</h3>
                    <p className="text-xs text-text-muted mb-4">{t('coach_voice.example_messages.hint')}</p>

                    <div className="space-y-4">
                        {/* Example 1 */}
                        <div className="bg-background-light p-4 rounded-lg border-l-4 border-primary">
                            <p className="text-xs font-bold text-text-muted mb-1">{t('coach_voice.example_messages.protein_hack')}</p>
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
                            <p className="text-xs font-bold text-text-muted mb-1">{t('coach_voice.example_messages.streak_hack')}</p>
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
