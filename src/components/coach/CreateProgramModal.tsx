import { useState } from 'react';
import { X, Plus, Trash2, Calendar, Play, Layout, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CreateProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (program: any) => void;
}

export const CreateProgramModal = ({ isOpen, onClose, onSave }: CreateProgramModalProps) => {
    const { t, i18n } = useTranslation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('30');
    const [durationType, setDurationType] = useState('DAYS');
    const [videos, setVideos] = useState('0');
    const [phases, setPhases] = useState<string[]>(['']);
    const [selectedGradient, setSelectedGradient] = useState('from-[#4b7c77] to-[#a8c1bf]');

    if (!isOpen) return null;

    const handleAddPhase = () => setPhases([...phases, '']);
    const handleRemovePhase = (index: number) => setPhases(phases.filter((_, i) => i !== index));
    const handlePhaseChange = (index: number, value: string) => {
        const newPhases = [...phases];
        newPhases[index] = value;
        setPhases(newPhases);
    };

    const gradients = [
        { id: 1, class: 'from-[#4b7c77] to-[#a8c1bf]' },
        { id: 2, class: 'from-[#2d4f4b] to-[#4b7c77]' },
        { id: 3, class: 'from-[#d4a373] to-[#4b7c77]' },
        { id: 4, class: 'from-[#131515] to-[#2d4f4b]' },
        { id: 5, class: 'from-[#ef4444] to-[#f87171]' },
        { id: 6, class: 'from-[#3b82f6] to-[#60a5fa]' },
    ];

    const handleSave = () => {
        onSave({
            name,
            description,
            duration: `${duration} ${durationType}`,
            videos: `${videos} VIDEOS`,
            gradient: selectedGradient,
            phases: phases.filter(p => p.trim() !== ''),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Body */}
            <div className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                {/* Header with Background Gradient */}
                <div className={`h-32 bg-gradient-to-r ${selectedGradient} relative flex items-end p-8`}>
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-black/10 text-white hover:bg-black/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="size-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xl">
                            <Sparkles size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">{t('coach_programs.create_modal.title')}</h2>
                    </div>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                    <div className="space-y-8">
                        {/* Section 1: Basic Info */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Layout size={18} className="text-primary" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">{t('coach_programs.create_modal.basic_info')}</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-text-main mb-2">{t('coach_programs.create_modal.program_title')}</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t('coach_programs.create_modal.program_title_placeholder')}
                                        className="w-full bg-background-light border-none rounded-xl px-5 py-4 text-sm font-semibold text-text-main focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-text-main mb-2">{t('coach_programs.create_modal.description')}</label>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder={t('coach_programs.create_modal.description_placeholder')}
                                        className="w-full bg-background-light border-none rounded-xl px-5 py-4 text-sm font-semibold text-text-main focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Structure & Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar size={18} className="text-primary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">{t('coach_programs.create_modal.duration')}</h3>
                                </div>
                                <div className="flex gap-3">
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-20 bg-background-light border-none rounded-xl px-4 py-4 text-sm font-black text-primary text-center focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                    <select
                                        value={durationType}
                                        onChange={(e) => setDurationType(e.target.value)}
                                        className="flex-1 bg-background-light border-none rounded-xl px-4 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                                    >
                                        <option value="DAYS">{t('coach_programs.create_modal.days')}</option>
                                        <option value="WEEKS">{t('coach_programs.create_modal.weeks')}</option>
                                        <option value="MONTHS">{t('coach_programs.create_modal.months')}</option>
                                    </select>
                                </div>
                            </section>
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Play size={18} className="text-primary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">{t('coach_programs.create_modal.educational_content')}</h3>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        value={videos}
                                        onChange={(e) => setVideos(e.target.value)}
                                        placeholder="0"
                                        className="w-full bg-background-light border-none rounded-xl px-5 py-4 text-sm font-black text-primary text-center focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                    <p className="text-[10px] font-bold text-text-muted mt-2 uppercase tracking-widest text-center">{t('coach_programs.create_modal.video_lessons')}</p>
                                </div>
                            </section>
                        </div>

                        {/* Section 3: Phases */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={18} className="text-primary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">{t('coach_programs.create_modal.program_phases')}</h3>
                                </div>
                                <button
                                    onClick={handleAddPhase}
                                    className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1"
                                >
                                    <Plus size={14} />
                                    {t('coach_programs.create_modal.add_phase')}
                                </button>
                            </div>
                            <div className="space-y-3">
                                {phases.map((phase, idx) => (
                                    <div key={idx} className="flex gap-3 group">
                                        <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                                            {idx + 1}
                                        </div>
                                        <input
                                            type="text"
                                            value={phase}
                                            onChange={(e) => handlePhaseChange(idx, e.target.value)}
                                            placeholder={t('coach_programs.create_modal.phase_name_placeholder', { index: idx + 1 })}
                                            className="flex-1 bg-background-light border-none rounded-xl px-5 py-3 text-sm font-bold text-text-main focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                        />
                                        {phases.length > 1 && (
                                            <button
                                                onClick={() => handleRemovePhase(idx)}
                                                className="size-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shrink-0"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 4: Visuals */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <ImageIcon size={18} className="text-primary" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-text-muted">{t('coach_programs.create_modal.visual_identity')}</h3>
                            </div>
                            <div className="grid grid-cols-6 gap-3">
                                {gradients.map((grad) => (
                                    <button
                                        key={grad.id}
                                        onClick={() => setSelectedGradient(grad.class)}
                                        className={`h-12 rounded-xl bg-gradient-to-br ${grad.class} transition-all relative ${selectedGradient === grad.class ? 'ring-2 ring-primary ring-offset-2 scale-110 z-10' : 'hover:scale-105'}`}
                                    >
                                        {selectedGradient === grad.class && <div className="absolute inset-0 flex items-center justify-center"><div className="size-2 rounded-full bg-white shadow-sm"></div></div>}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-[#dfe2e2] bg-background-light/30 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-8 py-4 rounded-2xl bg-white border border-[#dfe2e2] text-sm font-black uppercase tracking-widest text-text-main hover:bg-gray-50 transition-all"
                    >
                        {t('coach_programs.create_modal.cancel')}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!name}
                        className="flex-[2] px-8 py-4 rounded-2xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                    >
                        {t('coach_programs.create_modal.create')}
                    </button>
                </div>
            </div>
        </div>
    );
};
