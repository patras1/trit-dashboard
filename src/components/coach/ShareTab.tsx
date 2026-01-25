import { Link2, Facebook, Instagram, Twitter, Linkedin, MessageCircle, Copy, QrCode, Download, Share2, Sparkles, Eye } from 'lucide-react';
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

interface ShareTabProps {
    coach: Coach;
}

export const ShareTab = ({ coach }: ShareTabProps) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = `https://trit.app/coach/${coach.id}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="animate-in fade-in duration-300 space-y-6">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-text-main text-4xl font-black leading-tight tracking-tight">Share Your Coach</h1>
                    <p className="text-text-muted text-base font-normal">Generate shareable links, social media posts, and connect your coach to the client app.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Shareable Link & QR Code */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shareable Link Card */}
                    <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Link2 className="text-primary" size={20} />
                            </div>
                            <div>
                                <h3 className="text-text-main text-lg font-bold">Shareable Link</h3>
                                <p className="text-xs text-text-muted">Direct link to your coach profile in the Trit app</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="flex-1 bg-background-light border-none rounded-lg px-4 py-3 text-sm font-mono text-text-main outline-none"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-bold"
                                >
                                    {copied ? (
                                        <>
                                            <span className="text-sm">✓</span>
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={16} />
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#dfe2e2] rounded-lg text-sm font-medium hover:bg-background-light transition-colors">
                                    <QrCode size={16} />
                                    Generate QR Code
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#dfe2e2] rounded-lg text-sm font-medium hover:bg-background-light transition-colors">
                                    <Eye size={16} />
                                    Preview in App
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Sharing */}
                    <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Share2 className="text-purple-600" size={20} />
                                </div>
                                <h3 className="text-text-main text-lg font-bold">Share to Social Media</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877f2] text-white rounded-lg hover:opacity-90 transition-opacity">
                                <Facebook size={18} />
                                Facebook
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-lg hover:opacity-90 transition-opacity">
                                <Instagram size={18} />
                                Instagram
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1da1f2] text-white rounded-lg hover:opacity-90 transition-opacity">
                                <Twitter size={18} />
                                Twitter
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0a66c2] text-white rounded-lg hover:opacity-90 transition-opacity">
                                <Linkedin size={18} />
                                LinkedIn
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25d366] text-white rounded-lg hover:opacity-90 transition-opacity">
                                <MessageCircle size={18} />
                                WhatsApp
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#dfe2e2] text-text-main rounded-lg hover:bg-background-light transition-colors">
                                <Share2 size={18} />
                                More
                            </button>
                        </div>
                    </div>

                    {/* Social Media Post Templates */}
                    <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Sparkles className="text-blue-600" size={20} />
                                </div>
                                <h3 className="text-text-main text-lg font-bold">Post Templates</h3>
                            </div>
                            <button className="text-primary text-sm font-bold hover:underline">Create Custom</button>
                        </div>

                        <div className="space-y-4">
                            {/* Template 1 */}
                            <div className="border border-[#dfe2e2] p-4 rounded-lg hover:bg-background-light transition-colors cursor-pointer group">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-text-main mb-2">🎯 Launch Announcement</h4>
                                        <p className="text-xs text-text-muted leading-relaxed">
                                            "Meet {coach.name}! 🚀 Your new AI nutrition coach ready to help you crush your goals. {coach.descriptor}. Get started today! 💪"
                                        </p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20">
                                            <Copy size={14} />
                                        </button>
                                        <button className="p-1.5 rounded bg-primary text-white hover:bg-primary/90">
                                            <Share2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Template 2 */}
                            <div className="border border-[#dfe2e2] p-4 rounded-lg hover:bg-background-light transition-colors cursor-pointer group">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-text-main mb-2">💡 Feature Highlight</h4>
                                        <p className="text-xs text-text-muted leading-relaxed">
                                            "Get personalized nutrition coaching powered by AI! {coach.name} adapts to YOUR goals, YOUR lifestyle. Try it free! 🔥"
                                        </p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20">
                                            <Copy size={14} />
                                        </button>
                                        <button className="p-1.5 rounded bg-primary text-white hover:bg-primary/90">
                                            <Share2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Template 3 */}
                            <div className="border border-[#dfe2e2] p-4 rounded-lg hover:bg-background-light transition-colors cursor-pointer group">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-text-main mb-2">⭐ Success Story Format</h4>
                                        <p className="text-xs text-text-muted leading-relaxed">
                                            "Struggling to stay consistent? {coach.name} keeps you accountable 24/7. Smart tracking, real-time feedback, zero judgment. Start your journey! 💚"
                                        </p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20">
                                            <Copy size={14} />
                                        </button>
                                        <button className="p-1.5 rounded bg-primary text-white hover:bg-primary/90">
                                            <Share2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Story Templates */}
                    <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-text-main text-lg font-bold">Instagram Story Templates</h3>
                            <button className="text-primary text-sm font-bold hover:underline">View All</button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Story Template 1 */}
                            <div className="relative aspect-[9/16] rounded-lg overflow-hidden border-2 border-[#dfe2e2] cursor-pointer hover:border-primary transition-colors group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 p-4 flex flex-col justify-between">
                                    <div className="text-white text-xs font-bold">Trit</div>
                                    <div className="text-white">
                                        <div className="text-xl font-bold mb-2">{coach.name}</div>
                                        <div className="text-xs opacity-90">Your AI Nutrition Coach</div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Download className="text-white" size={24} />
                                </div>
                            </div>

                            {/* Story Template 2 */}
                            <div className="relative aspect-[9/16] rounded-lg overflow-hidden border-2 border-[#dfe2e2] cursor-pointer hover:border-primary transition-colors group">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 p-4 flex flex-col justify-center items-center text-center">
                                    <div className="text-white text-2xl mb-2">🎯</div>
                                    <div className="text-white font-bold mb-1">New Coach</div>
                                    <div className="text-white text-xs">{coach.name}</div>
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Download className="text-white" size={24} />
                                </div>
                            </div>

                            {/* Story Template 3 */}
                            <div className="relative aspect-[9/16] rounded-lg overflow-hidden border-2 border-[#dfe2e2] cursor-pointer hover:border-primary transition-colors group">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 p-4 flex flex-col justify-end">
                                    <div className="text-white text-sm font-bold mb-1">Join me on Trit!</div>
                                    <div className="text-white text-xs opacity-90">AI-powered nutrition coaching</div>
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Download className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Mobile Preview */}
                <div className="space-y-6">
                    <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm sticky top-8">
                        <h3 className="text-text-main text-lg font-bold mb-4">App Preview</h3>
                        <p className="text-xs text-text-muted mb-4">How your coach appears in the Trit mobile app</p>

                        {/* Mobile Phone Mockup */}
                        <div className="mx-auto max-w-[280px]">
                            <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                                <div className="bg-white rounded-[2rem] overflow-hidden">
                                    {/* Status Bar */}
                                    <div className="bg-background-light px-6 py-2 flex justify-between items-center text-[10px] font-medium text-text-main">
                                        <span>9:41</span>
                                        <div className="flex gap-1 items-center">
                                            <div className="w-4 h-3 border border-text-main rounded-sm"></div>
                                            <div className="w-2 h-3 border border-text-main rounded-sm"></div>
                                        </div>
                                    </div>

                                    {/* Coach Profile Content */}
                                    <div className="p-6 space-y-4">
                                        {/* Avatar */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold mb-3">
                                                {coach.name.charAt(0)}
                                            </div>
                                            <h3 className="text-base font-bold text-text-main">{coach.name}</h3>
                                            <p className="text-xs text-text-muted text-center mt-1">{coach.descriptor}</p>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100">
                                            <div className="text-center">
                                                <div className="text-sm font-bold text-text-main">1.2K</div>
                                                <div className="text-[10px] text-text-muted">Clients</div>
                                            </div>
                                            <div className="text-center border-x border-gray-100">
                                                <div className="text-sm font-bold text-text-main">4.9</div>
                                                <div className="text-[10px] text-text-muted">Rating</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-bold text-text-main">98%</div>
                                                <div className="text-[10px] text-text-muted">Success</div>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <button className="w-full bg-primary text-white py-3 rounded-lg text-sm font-bold">
                                            Start Coaching
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs text-blue-900">
                                <strong>Pro Tip:</strong> Share this profile to grow your client base!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
