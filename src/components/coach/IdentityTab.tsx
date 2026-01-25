import { User, Info, Activity } from 'lucide-react';

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

interface IdentityTabProps {
    coach: Coach;
    onChange: (coach: Coach) => void;
}

export const IdentityTab = ({ coach, onChange }: IdentityTabProps) => {
    return (
        <div className="animate-in fade-in duration-300 max-w-4xl">
            {/* Core Identity Section */}
            <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2">
                    <User size={20} className="text-primary" />
                    <h3 className="text-text-main text-base font-bold">Core Identity</h3>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-text-main">Coach Name</label>
                            <input
                                className="w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none"
                                placeholder="Enter coach name"
                                type="text"
                                value={coach.name}
                                onChange={(e) => onChange({ ...coach, name: e.target.value })}
                            />
                            <p className="text-text-muted text-[11px]">The public name visible to your clients.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-text-main">Descriptor</label>
                            <input
                                className="w-full bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none"
                                placeholder="e.g. AI Nutrition Expert"
                                type="text"
                                value={coach.descriptor}
                                onChange={(e) => onChange({ ...coach, descriptor: e.target.value })}
                            />
                            <p className="text-text-muted text-[11px]">A short tagline describing the coach's persona.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Brand Section */}
            <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2">
                    <Info size={20} className="text-primary" />
                    <h3 className="text-text-main text-base font-bold">Visual Brand</h3>
                </div>
                <div className="p-6 space-y-8">
                    {/* Avatar Selection */}
                    <div className="flex items-start gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <label className="text-sm font-semibold text-text-main w-full">Coach Avatar</label>
                            <div className="size-24 rounded-full border-4 border-primary/10 flex items-center justify-center bg-background-light relative group cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-white text-sm">Upload</span>
                                </div>
                                <User size={48} className="text-primary" />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-2 mt-7">
                            <label className="text-sm font-semibold text-text-main">Avatar Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 bg-background-light border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-text-main outline-none"
                                    placeholder="Paste URL here"
                                    type="text"
                                />
                                <button className="bg-background-light px-3 rounded-lg text-primary hover:bg-primary/10 transition-colors">
                                    <Info size={20} />
                                </button>
                            </div>
                            <p className="text-text-muted text-[11px]">Recommended size: 512x512px. PNG or JPG.</p>
                        </div>
                    </div>

                    {/* Color Config */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-text-main">Theme Color</label>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-primary shadow-inner border border-black/5"></div>
                                <div className="flex flex-col flex-1">
                                    <input
                                        className="bg-background-light border-none rounded-lg px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-primary/50 text-text-main uppercase outline-none"
                                        type="text"
                                        defaultValue="#4B7C77"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <div className="size-6 rounded-full bg-[#4B7C77] cursor-pointer ring-2 ring-primary ring-offset-2"></div>
                                <div className="size-6 rounded-full bg-[#131515] cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="size-6 rounded-full bg-[#2D5A27] cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="size-6 rounded-full bg-[#7C4B4B] cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="size-6 rounded-full bg-[#4B5E7C] cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="size-6 rounded-full bg-white border border-[#dfe2e2] cursor-pointer hover:scale-110 transition-transform flex items-center justify-center">
                                    <span className="text-xs">+</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-text-main">Accent Color</label>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-[#E2AD32] shadow-inner border border-black/5"></div>
                                <div className="flex flex-col flex-1">
                                    <input
                                        className="bg-background-light border-none rounded-lg px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-primary/50 text-text-main uppercase outline-none"
                                        type="text"
                                        defaultValue="#E2AD32"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <div className="size-6 rounded-full bg-[#E2AD32] cursor-pointer ring-2 ring-[#E2AD32] ring-offset-2"></div>
                                <div className="size-6 rounded-full bg-[#F59E0B] cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="size-6 rounded-full bg-[#10B981] cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="size-6 rounded-full bg-[#EF4444] cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="size-6 rounded-full bg-[#3B82F6] cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="size-6 rounded-full bg-white border border-[#dfe2e2] cursor-pointer hover:scale-110 transition-transform flex items-center justify-center">
                                    <span className="text-xs">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold">Live Preview</h4>
                        <p className="text-text-muted text-xs">See how your changes look in the client app.</p>
                    </div>
                </div>
                <button className="bg-white px-4 py-2 rounded-lg text-xs font-bold border border-[#dfe2e2] hover:shadow-sm transition-all">
                    Launch Simulator
                </button>
            </div>
        </div>
    );
};
