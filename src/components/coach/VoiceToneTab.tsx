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
                <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2 bg-white">
                        <MessageSquare size={20} className="text-primary" />
                        <h3 className="text-text-main text-base font-bold">{t('coach_voice.voice_personalization')}</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Base Tone */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">{t('coach_voice.base_tone.label')}</label>
                                <select
                                    value={coach.tone}
                                    onChange={(e) => onChange({ ...coach, tone: e.target.value })}
                                    className={`w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                                >
                                    <option value="calm">{t('coach_voice.base_tone.options.calm')}</option>
                                    <option value="direct">{t('coach_voice.base_tone.options.direct')}</option>
                                    <option value="motivational">{t('coach_voice.base_tone.options.motivational')}</option>
                                    <option value="friendly">{t('coach_voice.base_tone.options.friendly')}</option>
                                    <option value="professional">{t('coach_voice.base_tone.options.professional')}</option>
                                </select>
                                <p className="text-text-muted text-[11px]">{t('coach_voice.base_tone.hint')}</p>
                            </div>

                            {/* Language */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">{t('coach_voice.primary_language.label')}</label>
                                <select
                                    value={coach.language}
                                    onChange={(e) => onChange({ ...coach, language: e.target.value })}
                                    className={`w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                                >
                                    <option value="en">{t('coach_voice.primary_language.options.en')}</option>
                                    <option value="es">{t('coach_voice.primary_language.options.es')}</option>
                                    <option value="fr">{t('coach_voice.primary_language.options.fr')}</option>
                                    <option value="de">{t('coach_voice.primary_language.options.de')}</option>
                                    <option value="it">{t('coach_voice.primary_language.options.it')}</option>
                                    <option value="pt">{t('coach_voice.primary_language.options.pt')}</option>
                                </select>
                                <p className="text-text-muted text-[11px]">{t('coach_voice.primary_language.hint')}</p>
                            </div>

                            {/* Response Length Preference */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">{t('coach_voice.response_length.label')}</label>
                                <select
                                    className={`w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                                    defaultValue="balanced"
                                >
                                    <option value="concise">{t('coach_voice.response_length.options.concise')}</option>
                                    <option value="balanced">{t('coach_voice.response_length.options.balanced')}</option>
                                    <option value="detailed">{t('coach_voice.response_length.options.detailed')}</option>
                                </select>
                                <p className="text-text-muted text-[11px]">{t('coach_voice.response_length.hint')}</p>
                            </div>

                            {/* Emoji Usage */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main">{t('coach_voice.emoji_usage.label')}</label>
                                <select
                                    className={`w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                                    defaultValue="moderate"
                                >
                                    <option value="none">{t('coach_voice.emoji_usage.options.none')}</option>
                                    <option value="minimal">{t('coach_voice.emoji_usage.options.minimal')}</option>
                                    <option value="moderate">{t('coach_voice.emoji_usage.options.moderate')}</option>
                                    <option value="frequent">{t('coach_voice.emoji_usage.options.frequent')}</option>
                                </select>
                                <p className="text-text-muted text-[11px]">{t('coach_voice.emoji_usage.hint')}</p>
                            </div>
                        </div>

                        {/* Language Model Info */}
                        <div className="pt-4 border-t border-[#dfe2e2]">
                            <label className="text-sm font-semibold text-text-main block mb-2">{t('coach_voice.language_model.label')}</label>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold">GPT-4-Turbo</span>
                                <span className="text-xs text-text-muted font-medium">{t('coach_voice.language_model.active')}</span>
                            </div>
                            <p className="text-text-muted text-[11px]">{t('coach_voice.language_model.hint')}</p>
                        </div>
                    </div>
                </div>

                {/* Advanced Settings (Disabled for now) */}
                <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden opacity-75">
                    <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center justify-between bg-white">
                        <div className="flex items-center gap-2">
                            <Settings size={20} className="text-text-muted" />
                            <h3 className="text-text-main text-base font-bold">{t('coach_voice.advanced_settings.title')}</h3>
                        </div>
                        <span className="bg-gray-100/80 text-gray-500 text-[10px] px-2 py-1 rounded font-mono font-bold uppercase tracking-wider">{t('coach_voice.advanced_settings.coming_soon')}</span>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-2">{t('coach_voice.advanced_settings.system_prompt')}</label>
                            <textarea
                                disabled
                                placeholder="You are a tough but fair coach. You prefer short sentences..."
                                className={`w-full bg-background-light border-none rounded-lg p-4 h-32 resize-none text-xs font-mono text-text-muted cursor-not-allowed ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                            ></textarea>
                            <p className="text-text-muted text-[11px] mt-2">{t('coach_voice.advanced_settings.system_prompt_hint')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">{t('coach_voice.advanced_settings.vocabulary')}</label>
                                <input
                                    disabled
                                    type="text"
                                    placeholder="gains, fuel, power, shred, optimize..."
                                    className={`w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm text-text-muted cursor-not-allowed ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                                />
                                <p className="text-text-muted text-[11px] mt-2">{t('coach_voice.advanced_settings.vocabulary_hint')}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">{t('coach_voice.advanced_settings.forbidden')}</label>
                                <input
                                    disabled
                                    type="text"
                                    placeholder="diet, cheat, guilt, bad food..."
                                    className={`w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm text-text-muted cursor-not-allowed ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                                />
                                <p className="text-text-muted text-[11px] mt-2">{t('coach_voice.advanced_settings.forbidden_hint')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Example Messages Preview */}
                <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2 bg-white">
                        <MessageSquare size={20} className="text-primary" />
                        <h3 className="text-text-main text-base font-bold">{t('coach_voice.example_messages.title')}</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-text-muted text-xs mb-6 font-medium bg-gray-50 p-3 rounded-lg border border-[#dfe2e2]/50">{t('coach_voice.example_messages.hint')}</p>

                        <div className="space-y-4">
                            {/* Example 1 */}
                            <div className="bg-background-light p-4 rounded-xl border-l-4 border-primary">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">{t('coach_voice.example_messages.protein_hack')}</p>
                                <p className="text-sm text-text-main leading-relaxed font-medium">
                                    {coach.tone === 'motivational' && "No worries! Tomorrow's a fresh start. Let's crush that protein goal together! 💪"}
                                    {coach.tone === 'direct' && "You missed your protein target today. Plan your meals better tomorrow."}
                                    {coach.tone === 'calm' && "It's okay - one day won't derail your progress. Let's refocus for tomorrow."}
                                    {coach.tone === 'friendly' && "Hey, happens to everyone! Let's make sure tomorrow we hit that goal. You got this!"}
                                    {coach.tone === 'professional' && "Your protein intake was below target today. I recommend prioritizing protein-rich foods in your next meal plan."}
                                </p>
                            </div>

                            {/* Example 2 */}
                            <div className="bg-background-light p-4 rounded-xl border-l-4 border-primary">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">{t('coach_voice.example_messages.streak_hack')}</p>
                                <p className="text-sm text-text-main leading-relaxed font-medium">
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
        </div>
    );
};
