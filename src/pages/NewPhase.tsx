import { useState, useEffect } from 'react';
import { clientService } from '../lib/api';
import { Save, Target, Utensils, Info, X, ClipboardList } from 'lucide-react';

interface NewPhaseModalProps {
    clientId: string;
    clientName: string;
    onClose: () => void;
    onSuccess: () => void;
}

export const NewPhaseModal = ({ clientId, clientName, onClose, onSuccess }: NewPhaseModalProps) => {
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        phase_name: '',
        priority: 'Fat Loss',
        target_weight_kg: '',
        expected_weekly_change_kg: '0.5',
        start_date: new Date().toISOString().split('T')[0],
        calories_target: '2500',
        protein_grams: '150',
        carbs_grams: '250',
        fat_grams: '70',
        training_day_rules: 'Breakfast: \nMid-morning Snack: \nLunch: \nMid-afternoon Snack: \nDinner: \nNight Snack: ',
        is_active: true
    });

    useEffect(() => {
        if (clientId) {
            clientService.get(clientId).then(data => {
                setFormData(prev => ({
                    ...prev,
                    target_weight_kg: data.target_weight_kg?.toString() || ''
                }));
                setLoading(false);
            });
        }
    }, [clientId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 1. Create the Goal
            await clientService.createGoal(clientId, {
                phase_name: formData.phase_name,
                priority: formData.priority,
                target_weight_kg: parseFloat(formData.target_weight_kg),
                expected_weekly_change_kg: parseFloat(formData.expected_weekly_change_kg),
                start_date: formData.start_date,
                status: 'active'
            });

            // 2. Create the Prescription
            await clientService.createPrescription(clientId, {
                phase_name: formData.phase_name,
                start_date: formData.start_date,
                calories_target: parseInt(formData.calories_target),
                protein_grams: parseInt(formData.protein_grams),
                carbs_grams: parseInt(formData.carbs_grams),
                fat_grams: parseInt(formData.fat_grams),
                training_day_rules: formData.training_day_rules,
                is_active: true
            });

            onSuccess();
        } catch (error) {
            console.error('Failed to create new phase', error);
            alert('Error creating new phase. Please check the console.');
        }
    };

    if (loading) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-50 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 md:p-8 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-black text-text-main tracking-tight">Design New Phase</h2>
                        <p className="text-text-muted text-sm font-medium">Setting metabolic targets for {clientName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="p-2.5 text-gray-400 hover:text-text-main hover:bg-gray-100 rounded-xl transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Column 1: Strategic Goals */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-lg text-text-main mb-6 flex items-center gap-2">
                                    <Target size={20} className="text-primary" />
                                    Strategy & Lifecycle
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-1 block">Phase Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g., Paris Competition Cut"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all font-medium bg-gray-50/50"
                                            value={formData.phase_name}
                                            onChange={e => setFormData({ ...formData, phase_name: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-1 block">Priority</label>
                                            <select
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all font-medium appearance-none bg-gray-50/50"
                                                value={formData.priority}
                                                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                                            >
                                                <option>Fat Loss</option>
                                                <option>Metabolic Health</option>
                                                <option>Performance</option>
                                                <option>Muscle Gain</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-1 block">Start Date</label>
                                            <input
                                                type="date"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all font-medium bg-gray-50/50"
                                                value={formData.start_date}
                                                onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-1 block">Target Weight (kg)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all font-medium bg-gray-50/50"
                                                value={formData.target_weight_kg}
                                                onChange={e => setFormData({ ...formData, target_weight_kg: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-1 block">Weekly Change</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all font-medium bg-gray-50/50"
                                                value={formData.expected_weekly_change_kg}
                                                onChange={e => setFormData({ ...formData, expected_weekly_change_kg: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                                <div className="flex gap-3">
                                    <Info className="text-blue-600 shrink-0" size={20} />
                                    <p className="text-sm text-blue-800 leading-relaxed font-medium">
                                        Deploying this will set the phase as <strong>Active</strong> and archive current prescriptions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Metabolic Targets */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-lg text-text-main mb-6 flex items-center gap-2">
                                    <Utensils size={20} className="text-primary" />
                                    Metabolic Targets
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-text-muted">Daily Calories</label>
                                            <span className="text-2xl font-black text-primary">{formData.calories_target} <span className="text-xs text-text-muted ml-0.5">kcal</span></span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1200"
                                            max="5000"
                                            step="50"
                                            className="w-full h-2.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                            value={formData.calories_target}
                                            onChange={e => setFormData({ ...formData, calories_target: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1 block">Prot. (g)</label>
                                            <input
                                                type="number"
                                                className="w-full bg-transparent text-lg font-black text-gray-900 text-center outline-none"
                                                value={formData.protein_grams}
                                                onChange={e => setFormData({ ...formData, protein_grams: e.target.value })}
                                            />
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1 block">Carb. (g)</label>
                                            <input
                                                type="number"
                                                className="w-full bg-transparent text-lg font-black text-gray-900 text-center outline-none"
                                                value={formData.carbs_grams}
                                                onChange={e => setFormData({ ...formData, carbs_grams: e.target.value })}
                                            />
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1 block">Fat (g)</label>
                                            <input
                                                type="number"
                                                className="w-full bg-transparent text-lg font-black text-gray-900 text-center outline-none"
                                                value={formData.fat_grams}
                                                onChange={e => setFormData({ ...formData, fat_grams: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full Width Bottom: Instruction & Menu */}
                        <div className="md:col-span-2">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-lg text-text-main mb-6 flex items-center gap-2">
                                    <ClipboardList size={20} className="text-primary" />
                                    Phase Instructions & Detailed Menu
                                </h3>
                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-text-muted mb-2 block">Meal Plan & Guidelines</label>
                                    <textarea
                                        rows={8}
                                        placeholder="Enter the detailed plan here..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all font-medium leading-relaxed bg-gray-50/50"
                                        value={formData.training_day_rules}
                                        onChange={e => setFormData({ ...formData, training_day_rules: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="p-6 md:p-8 bg-white border-t border-gray-100 flex justify-end gap-3 sticky bottom-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-text-muted hover:bg-gray-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all"
                    >
                        <Save size={20} />
                        Deploy Phase
                    </button>
                </div>
            </div>
        </div>
    );
};
