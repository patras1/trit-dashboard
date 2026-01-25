import { Link, Copy, Facebook, Instagram, X, MessageCircle, Eye, CheckCircle } from 'lucide-react';
import { useState } from 'react';
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

interface ShareTabProps {
    coach: Coach;
}

export const ShareTab = ({ coach }: ShareTabProps) => {
    const { t, i18n } = useTranslation();
    const [copied, setCopied] = useState(false);
    const shareUrl = `https://trit.app/coach/${coach.id}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Left Column: Tools & Marketing */}
                <div className="flex-1 flex flex-col gap-8 w-full">
                    {/* PageHeading */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-text-main dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">{t('coach_share.title')}</h1>
                        <p className="text-text-muted dark:text-[#a0aeae] text-base font-normal leading-normal max-w-xl">
                            {t('coach_share.description')}
                        </p>
                    </div>

                    {/* Shareable Link Card */}
                    <div className="bg-white dark:bg-[#1f2424] p-6 rounded-xl shadow-sm border border-[#f2f3f3] dark:border-[#2d3333]">
                        <h2 className="text-text-main dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                            <Link className="text-primary" size={20} />
                            {t('coach_share.link_card.title')}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center gap-4 bg-background-light dark:bg-[#171b1b] p-3 rounded-lg border border-[#e2e8e8] dark:border-[#2d3333]">
                            <div className="flex-1 overflow-hidden">
                                <p className="text-text-main dark:text-white text-sm font-bold truncate">{t('coach_share.link_card.label')}</p>
                                <p className="text-text-muted dark:text-[#a0aeae] text-xs font-mono truncate">{shareUrl}</p>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="w-full md:w-auto flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold gap-2 hover:bg-opacity-90 transition-all"
                            >
                                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                                <span>{copied ? t('coach_share.link_card.copied') : t('coach_share.link_card.copy_link')}</span>
                            </button>
                        </div>
                    </div>

                    {/* Social Media Grid */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-text-main dark:text-white text-lg font-bold px-1">{t('coach_share.social.title')}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-[#1f2424] border border-[#f2f3f3] dark:border-[#2d3333] hover:border-primary transition-colors group">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2]">
                                    <Facebook size={20} />
                                </div>
                                <span className="text-xs font-semibold">Facebook</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-[#1f2424] border border-[#f2f3f3] dark:border-[#2d3333] hover:border-primary transition-colors group">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E4405F]/10 text-[#E4405F]">
                                    <Instagram size={20} />
                                </div>
                                <span className="text-xs font-semibold">Instagram</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-[#1f2424] border border-[#f2f3f3] dark:border-[#2d3333] hover:border-primary transition-colors group">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#000000]/10 dark:bg-white/10 text-[#000000] dark:text-white">
                                    <X size={20} />
                                </div>
                                <span className="text-xs font-semibold">X (Twitter)</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-[#1f2424] border border-[#f2f3f3] dark:border-[#2d3333] hover:border-primary transition-colors group">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                                    <MessageCircle size={20} />
                                </div>
                                <span className="text-xs font-semibold">WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Post Templates Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-text-main dark:text-white text-lg font-bold">{t('coach_share.templates.title')}</h3>
                            <button className="text-xs text-primary font-bold cursor-pointer hover:underline">{t('coach_share.templates.customize')}</button>
                        </div>
                        <div className="space-y-4">
                            {/* Template 1 */}
                            <div className="p-5 bg-white dark:bg-[#1f2424] rounded-xl border border-[#f2f3f3] dark:border-[#2d3333] flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-text-muted bg-background-light dark:bg-[#171b1b] px-2 py-0.5 rounded">{t('coach_share.templates.enthusiast.label')}</span>
                                    <button className="text-primary hover:text-primary/70 transition-colors">
                                        <Copy size={16} />
                                    </button>
                                </div>
                                <p className="text-sm text-text-main dark:text-gray-200 leading-relaxed italic">
                                    {t('coach_share.templates.enthusiast.text', { url: shareUrl })}
                                </p>
                            </div>
                            {/* Template 2 */}
                            <div className="p-5 bg-white dark:bg-[#1f2424] rounded-xl border border-[#f2f3f3] dark:border-[#2d3333] flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-text-muted bg-background-light dark:bg-[#171b1b] px-2 py-0.5 rounded">{t('coach_share.templates.professional.label')}</span>
                                    <button className="text-primary hover:text-primary/70 transition-colors">
                                        <Copy size={16} />
                                    </button>
                                </div>
                                <p className="text-sm text-text-main dark:text-gray-200 leading-relaxed italic">
                                    {t('coach_share.templates.professional.text')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Mobile Mockup */}
                <div className="w-full lg:w-[400px] lg:sticky lg:top-8 flex flex-col items-center">
                    <div className="relative w-[300px] h-[600px] bg-[#131515] rounded-[3rem] p-3 shadow-2xl border-[8px] border-[#222]">
                        {/* Camera Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#222] rounded-b-2xl z-20"></div>
                        {/* Internal Screen Content */}
                        <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden flex flex-col relative no-scrollbar overflow-y-auto">
                            {/* Header Image */}
                            <div className="h-32 w-full bg-primary/20 relative" style={{ backgroundImage: 'linear-gradient(135deg, #4a7874 0%, #2d4d4a 100%)' }}>
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                    <div className="size-20 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg flex items-center justify-center text-primary bg-primary/10">
                                        {/* Fallback avatar if no image - adapting dynamic logic */}
                                        <span className="text-3xl font-bold">{coach.name.charAt(0)}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Coach Content */}
                            <div className="mt-12 px-6 flex flex-col items-center text-center gap-4">
                                <div>
                                    <h4 className="text-lg font-bold text-[#131515]">{coach.name}</h4>
                                    <p className="text-xs text-[#6f7b7a] line-clamp-1">{coach.descriptor}</p>
                                </div>
                                <div className="flex gap-6 py-2 border-y border-gray-100 w-full justify-center">
                                    <div>
                                        <p className="text-sm font-bold text-primary">4.9</p>
                                        <p className="text-[10px] text-[#6f7b7a] uppercase font-bold">{t('coach_share.mobile_preview.rating')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary">1.2k</p>
                                        <p className="text-[10px] text-[#6f7b7a] uppercase font-bold">{t('coach_share.mobile_preview.clients')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary">{t('coach_share.mobile_preview.active')}</p>
                                        <p className="text-[10px] text-[#6f7b7a] uppercase font-bold">{t('coach_share.mobile_preview.status')}</p>
                                    </div>
                                </div>
                                <div className={`text-left w-full space-y-2 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                    <p className="text-xs font-bold text-[#131515]">{t('coach_share.mobile_preview.about')}</p>
                                    <p className="text-[11px] text-[#6f7b7a] leading-relaxed line-clamp-3">
                                        {t('coach_share.mobile_preview.about_text')}
                                    </p>
                                </div>
                                <div className="w-full space-y-2">
                                    <p className={`text-xs font-bold text-[#131515] text-left ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('coach_share.mobile_preview.latest_plans')}</p>
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                        <div className="min-w-[120px] p-2 bg-background-light rounded-lg border border-gray-100">
                                            <div className="h-16 bg-gray-200 rounded-md mb-2" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMXlj6CLFsub-fxfwnXXUUSvXdfYoQcflW27cahTZMJGj224yfWHNk_Y871dmSgN2z4b2EcyYNtqopOLY690Vf5JR2ZomDDp_axsFrIJvx-CEIdpX4GHn_w-X3ntXQOsc0CpT_I_MXf3bzBZb1DGY7QtLyh5om6jQBK3L7SgF01EYLGMb_US7sx6zf6hHLCKp3bZG1VpmLit_72Q4QqyRkqIHBqJDBQ2oao3qC7vRONHIh-lRc_5erbbfTCUiwdrFezj_waCVND2g')", backgroundSize: 'cover' }}></div>
                                            <p className="text-[10px] font-bold text-[#131515]">Keto Mastery</p>
                                        </div>
                                        <div className="min-w-[120px] p-2 bg-background-light rounded-lg border border-gray-100">
                                            <div className="h-16 bg-gray-200 rounded-md mb-2" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBl4SKjxXFPlWAA9BG0tIbmU4qJsV5g3Qr7XdRjFOJAVJL9M4B83Vcix1ftbfwiI0bFu5hFkTchyL4F2JxqQYixKL0y3uU1pWRCh01ZbRV-TC-V35uGlvWkShWs-j1COB0XnYVzAj0_fYWIxJdstyFaFqhWd4gku6RBHibSOnP5oO4LW3Yzm2b2BZGdclnvIaf0dQBXHkizf1qvF0nV-vOKbGMQlb43jIY3KTXfsXQNWIlWtmHvWiQED7mOiSGXFQuDWhj9DIsJ470')", backgroundSize: 'cover' }}></div>
                                            <p className="text-[10px] font-bold text-[#131515]">Plant Power</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Sticky CTA Button */}
                            <div className="mt-auto p-6 bg-gradient-to-t from-white via-white to-transparent pt-10">
                                <button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-md hover:scale-[1.02] transition-transform">
                                    {t('coach_share.mobile_preview.cta')}
                                </button>
                                <p className="text-center text-[10px] text-[#6f7b7a] mt-2 italic">{t('coach_share.mobile_preview.powered_by')}</p>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm font-medium text-text-muted flex items-center gap-2">
                        <Eye className="text-xs" size={16} />
                        {t('coach_share.mobile_preview.live_preview')}
                    </p>
                </div>
            </div>

            {/* Footer / Feedback Element (Floating Toast) */}
            {copied && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white dark:bg-[#1f2424] px-6 py-3 rounded-full shadow-2xl border border-[#f2f3f3] dark:border-[#2d3333] z-[100] animate-bounce">
                    <CheckCircle className="text-primary" size={20} />
                    <span className="text-sm font-bold">{t('coach_share.link_card.toast_copied')}</span>
                </div>
            )}
        </div>
    );
};
