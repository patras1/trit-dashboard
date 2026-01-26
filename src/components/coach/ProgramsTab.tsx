import { Calendar, Play, Plus, MoreVertical, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateProgramModal } from './CreateProgramModal';
import { coachProgramService } from '../../lib/api';

interface ProgramsTabProps {
    coachId: string;
}

export const ProgramsTab = ({ coachId }: ProgramsTabProps) => {
    const { t, i18n } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [programs, setPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [programsEnabled, setProgramsEnabled] = useState(true);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    useEffect(() => {
        if (coachId) {
            fetchPrograms();
        }
    }, [coachId]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveMenuId(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const fetchPrograms = async () => {
        setLoading(true);
        try {
            const data = await coachProgramService.list(coachId);
            const mapped = data.map((p: any) => ({
                id: p.id,
                title: p.title,
                desc: p.description,
                days: p.duration,
                videos: p.videos,
                gradient: p.gradient,
                phases: p.phases || [],
                activePhase: p.active_phase
            }));
            setPrograms(mapped);
        } catch (error) {
            console.error('Failed to fetch programs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProgram = async (newProgramData: any) => {
        try {
            const programToSave = {
                title: newProgramData.name,
                desc: newProgramData.description,
                days: newProgramData.duration,
                videos: newProgramData.videos,
                gradient: newProgramData.gradient,
                phases: newProgramData.phases,
                activePhase: 0
            };

            const saved = await coachProgramService.create(coachId, programToSave);

            const newProgram = {
                id: saved.id,
                title: saved.title,
                desc: saved.description,
                days: saved.duration,
                videos: saved.videos,
                gradient: saved.gradient,
                phases: saved.phases || [],
                activePhase: saved.active_phase
            };

            setPrograms([...programs, newProgram]);
        } catch (error) {
            console.error('Failed to save program:', error);
        }
    };

    const handleDeleteProgram = async (programId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this program?')) {
            try {
                await coachProgramService.delete(programId);
                setPrograms(programs.filter(p => p.id !== programId));
            } catch (error) {
                console.error('Failed to delete program:', error);
            }
        }
        setActiveMenuId(null);
    };

    const toggleMenu = (programId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === programId ? null : programId);
    };

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col gap-8">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-end gap-6 mb-2">
                    <div className="max-w-2xl">
                        <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">{t('coach_programs.title')}</h1>
                        <p className="text-text-muted text-lg leading-relaxed">
                            {t('coach_programs.description')}
                        </p>
                    </div>
                </div>

                {/* Master Toggle */}
                <div className={`rounded-xl border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 ${programsEnabled ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 border-[#dfe2e2]'}`}>
                    <div className="flex flex-col gap-1">
                        <p className="text-text-main text-lg font-bold">{t('coach_programs.enable_programs')}</p>
                        <p className="text-text-muted text-sm font-medium">{t('coach_programs.enable_hint')}</p>
                    </div>
                    <label className={`relative flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-all duration-300 ${programsEnabled ? 'bg-primary justify-end' : 'bg-[#dfe2e2] justify-start'}`}>
                        <div className="h-6 w-6 rounded-full bg-white shadow-sm"></div>
                        <input
                            checked={programsEnabled}
                            onChange={(e) => setProgramsEnabled(e.target.checked)}
                            className="hidden"
                            type="checkbox"
                        />
                    </label>
                </div>

                <div className={`space-y-6 transition-all duration-500 ${programsEnabled ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-text-main text-xl font-black tracking-tight">{t('coach_programs.your_programs')}</h2>
                        <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">{t('coach_programs.manage_all') || 'MANAGE ALL'}</button>
                    </div>

                    {/* Programs Grid */}
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Add New Program Card */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#dfe2e2] bg-[#f8f9f9]/50 text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all min-h-[300px] group"
                            >
                                <div className="size-16 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                                    <Plus size={40} strokeWidth={1.5} />
                                </div>
                                <span className="text-sm font-bold">{t('coach_programs.add_new')}</span>
                            </button>

                            {programs.map((program) => (
                                <div key={program.id} className="flex flex-col rounded-2xl border border-[#dfe2e2] bg-white overflow-hidden group hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
                                    <div className={`h-36 bg-gradient-to-br ${program.gradient} relative overflow-hidden`}>
                                        <div className={`absolute top-4 ${i18n.dir() === 'rtl' ? 'left-4' : 'right-4'} z-10`}>
                                            <div className="relative">
                                                <button
                                                    onClick={(e) => toggleMenu(program.id, e)}
                                                    className="text-white bg-black/20 hover:bg-black/40 p-1.5 rounded-lg backdrop-blur-md transition-colors"
                                                >
                                                    <MoreVertical size={20} />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {activeMenuId === program.id && (
                                                    <div className={`absolute top-full mt-2 ${i18n.dir() === 'rtl' ? 'left-0' : 'right-0'} w-48 bg-white rounded-lg shadow-xl border border-[#dfe2e2] py-1 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200`}>
                                                        <button
                                                            onClick={(e) => handleDeleteProgram(program.id, e)}
                                                            className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                            {t('coach_programs.delete')}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        <div className="space-y-1.5">
                                            <h3 className="text-text-main text-lg font-black tracking-tight leading-tight">{program.title}</h3>
                                            <p className="text-text-muted text-[11px] font-medium leading-relaxed line-clamp-2">{program.desc}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1.5 text-[10px] font-black text-primary uppercase tracking-wider">
                                                <Calendar size={13} />
                                                {program.days}
                                            </div>
                                            <div className="flex items-center gap-1.5 rounded-md bg-background-light px-2.5 py-1.5 text-[10px] font-black text-text-muted uppercase tracking-wider border border-[#dfe2e2]/50">
                                                <Play size={13} />
                                                {program.videos}
                                            </div>
                                        </div>
                                        <div className="space-y-3 pt-2">
                                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] opacity-60">{t('coach_programs.card_1.structure')}</p>
                                            <div className="flex items-center gap-1.5">
                                                {program.phases.map((_: string, idx: number) => (
                                                    <div key={idx} className={`h-1.5 flex-1 rounded-full ${idx <= program.activePhase ? 'bg-primary' : 'bg-primary/20'}`}></div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase tracking-tight">
                                                {program.phases.map((phase: string, idx: number) => (
                                                    <span key={idx} className={idx === program.activePhase ? 'text-primary' : ''}>{phase}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Program Modal */}
            <CreateProgramModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProgram}
            />
        </div>
    );
};
