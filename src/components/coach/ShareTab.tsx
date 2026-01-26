import { Link, Copy, Facebook, Instagram, X, MessageCircle, CheckCircle, Share2, MessageSquare } from 'lucide-react';
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
            <div className="flex flex-col gap-8">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-end gap-6 mb-2">
                    <div className="max-w-2xl">
                        <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">{t('coach_share.title')}</h1>
                        <p className="text-text-muted text-lg leading-relaxed">
                            {t('coach_share.description')}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left Column: Tools & Marketing */}
                    <div className="flex-1 flex flex-col gap-8 w-full">

                        {/* Shareable Link Card */}
                        <section className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2 bg-white">
                                <Link className="text-primary" size={20} />
                                <h2 className="text-text-main text-base font-bold">{t('coach_share.link_card.title')}</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row items-center gap-4 bg-background-light p-4 rounded-xl border border-[#dfe2e2]/50">
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-text-main text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">{t('coach_share.link_card.label')}</p>
                                        <p className="text-primary text-sm font-bold truncate font-mono">{shareUrl}</p>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="w-full md:w-auto flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-black uppercase tracking-wider gap-2 hover:bg-primary/90 transition-all shadow-sm"
                                    >
                                        {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                                        <span>{copied ? t('coach_share.link_card.copied') : t('coach_share.link_card.copy_link')}</span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Social Media Grid */}
                        <section className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2 bg-white">
                                <Share2 className="text-primary" size={20} />
                                <h3 className="text-text-main text-base font-bold">{t('coach_share.social.title')}</h3>
                            </div>
                            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: Facebook, color: 'text-[#1877F2]', bg: 'bg-[#1877F2]/10', label: 'Facebook' },
                                    { icon: Instagram, color: 'text-[#E4405F]', bg: 'bg-[#E4405F]/10', label: 'Instagram' },
                                    { icon: X, color: 'text-text-main', bg: 'bg-gray-100', label: 'X (Twitter)' },
                                    { icon: MessageCircle, color: 'text-[#25D366]', bg: 'bg-[#25D366]/10', label: 'WhatsApp' }
                                ].map((social, idx) => (
                                    <button key={idx} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-[#dfe2e2] hover:bg-background-light hover:border-primary/30 transition-all group">
                                        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${social.bg} ${social.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                            <social.icon size={22} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-text-main">{social.label}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Post Templates Section */}
                        <section className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center justify-between bg-white">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={20} className="text-primary" />
                                    <h3 className="text-text-main text-base font-bold">{t('coach_share.templates.title')}</h3>
                                </div>
                                <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">{t('coach_share.templates.customize')}</button>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Template 1 */}
                                <div className="p-6 bg-background-light rounded-xl border border-[#dfe2e2]/50 flex flex-col gap-4 relative group">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-[0.15em] font-black text-primary bg-primary/10 px-3 py-1 rounded-md">{t('coach_share.templates.enthusiast.label')}</span>
                                        <button className="text-text-muted hover:text-primary transition-all p-2 hover:bg-white rounded-lg border border-transparent hover:border-[#dfe2e2]/50">
                                            <Copy size={18} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-text-main leading-relaxed font-semibold italic border-l-2 border-primary/20 pl-4 py-1">
                                        "{t('coach_share.templates.enthusiast.text', { url: shareUrl })}"
                                    </p>
                                </div>
                                {/* Template 2 */}
                                <div className="p-6 bg-background-light rounded-xl border border-[#dfe2e2]/50 flex flex-col gap-4 relative group">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-[0.15em] font-black text-text-muted bg-gray-200 px-3 py-1 rounded-md">{t('coach_share.templates.professional.label')}</span>
                                        <button className="text-text-muted hover:text-primary transition-all p-2 hover:bg-white rounded-lg border border-transparent hover:border-[#dfe2e2]/50">
                                            <Copy size={18} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-text-main leading-relaxed font-semibold italic border-l-2 border-gray-300 pl-4 py-1">
                                        "{t('coach_share.templates.professional.text')}"
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sticky Mobile Mockup */}
                    <div className="w-full lg:w-[400px] lg:sticky lg:top-8 flex flex-col items-center pt-2">
                        <div className="relative w-[320px] h-[640px] bg-[#131515] rounded-[3.5rem] p-3 shadow-2xl border-[10px] border-[#222]">
                            {/* Camera Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#222] rounded-b-2xl z-20"></div>
                            {/* Internal Screen Content */}
                            <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative no-scrollbar overflow-y-auto">
                                {/* Header Image */}
                                <div className="h-36 w-full bg-primary/20 relative" style={{ backgroundImage: 'linear-gradient(135deg, #4a7874 0%, #2d4d4a 100%)' }}>
                                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                                        <div className="size-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-xl flex items-center justify-center text-primary bg-primary/10">
                                            <span className="text-4xl font-black">{coach.name.charAt(0)}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Coach Content */}
                                <div className="mt-16 px-6 flex flex-col items-center text-center gap-5">
                                    <div>
                                        <h4 className="text-xl font-black text-[#131515] tracking-tight">{coach.name}</h4>
                                        <p className="text-[11px] font-bold text-[#6f7b7a] uppercase tracking-wider mt-1">{coach.descriptor}</p>
                                    </div>
                                    <div className="flex gap-8 py-3 border-y border-gray-100 w-full justify-center">
                                        <div className="text-center">
                                            <p className="text-base font-black text-primary">4.9</p>
                                            <p className="text-[9px] text-[#6f7b7a] uppercase font-black tracking-tighter">{t('coach_share.mobile_preview.rating')}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-base font-black text-primary">1.2k</p>
                                            <p className="text-[9px] text-[#6f7b7a] uppercase font-black tracking-tighter">{t('coach_share.mobile_preview.clients')}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-base font-black text-primary">{t('coach_share.mobile_preview.active')}</p>
                                            <p className="text-[9px] text-[#6f7b7a] uppercase font-black tracking-tighter">{t('coach_share.mobile_preview.status')}</p>
                                        </div>
                                    </div>
                                    <div className={`text-left w-full space-y-2 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                        <p className="text-xs font-black text-[#131515] uppercase tracking-widest">{t('coach_share.mobile_preview.about')}</p>
                                        <p className="text-[12px] text-[#6f7b7a] leading-relaxed font-medium line-clamp-3">
                                            {t('coach_share.mobile_preview.about_text')}
                                        </p>
                                    </div>
                                    <div className="w-full space-y-3">
                                        <p className={`text-xs font-black text-[#131515] uppercase tracking-widest text-left ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('coach_share.mobile_preview.latest_plans')}</p>
                                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                            <div className="min-w-[130px] p-2 bg-background-light rounded-xl border border-gray-100 shadow-sm">
                                                <div className="h-20 bg-gray-200 rounded-lg mb-2" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMXlj6CLFsub-fxfwnXXUUSvXdfYoQcflW27cahTZMJGj224yfWHNk_Y871dmSgN2z4b2EcyYNtqopOLY690Vf5JR2ZomDDp_axsFrIJvx-CEIdpX4GHn_w-X3ntXQOsc0CpT_I_MXf3bzBZb1DGY7QtLyh5om6jQBK3L7SgF01EYLGMb_US7sx6zf6hHLCKp3bZG1VpmLit_72Q4QqyRkqIHBqJDBQ2oao3qC7vRONHIh-lRc_5erbbfTCUiwdrFezj_waCVND2g')", backgroundSize: 'cover' }}></div>
                                                <p className="text-[11px] font-black text-[#131515]">Keto Mastery</p>
                                            </div>
                                            <div className="min-w-[130px] p-2 bg-background-light rounded-xl border border-gray-100 shadow-sm">
                                                <div className="h-20 bg-gray-200 rounded-lg mb-2" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBl4SKjxXFPlWAA9BG0tIbmU4qJsV5g3Qr7XdRjFOJAVJL9M4B83Vcix1ftbfwiI0bFu5hFkTchyL4F2JxqQYixKL0y3uU1pWRCh01ZbRV-TC-V35uGlvWkShWs-j1COB0XnYVzAj0_fYWIxJdstyFaFqhWd4gku6RBHibSOnP5oO4LW3Yzm2b2BZGdclnvIaf0dQBXHkizf1qvF0nV-vOKbGMQlb43jIY3KTXfsXQNWIlWtmHvWiQED7mOiSGXFQuDWhj9DIsJ470')", backgroundSize: 'cover' }}></div>
                                                <p className="text-[11px] font-black text-[#131515]">Plant Power</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Sticky CTA Button */}
                                <div className="mt-auto p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
                                    <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all uppercase tracking-widest">
                                        {t('coach_share.mobile_preview.cta')}
                                    </button>
                                    <p className="text-center text-[10px] text-[#6f7b7a] mt-3 font-bold uppercase tracking-widest opacity-60">{t('coach_share.mobile_preview.powered_by')}</p>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-3">
                            <span className="size-2 rounded-full bg-primary"></span>
                            {t('coach_share.mobile_preview.live_preview')}
                            <span className="size-2 rounded-full bg-primary"></span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer / Feedback Element (Floating Toast) */}
            {copied && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-2xl border border-primary/20 z-[100] animate-in fade-in slide-in-from-bottom-4">
                    <CheckCircle className="text-primary" size={20} />
                    <span className="text-sm font-black uppercase tracking-wider text-text-main">{t('coach_share.link_card.toast_copied')}</span>
                </div>
            )}
        </div>
    );
};
