import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { clientService, coachService } from '../lib/api';

import { useAuth } from '../contexts/AuthContext';

export const AddClient = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [coaches, setCoaches] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        birth_date: '',
        gender: 'male',
        height_cm: '',
        starting_weight_kg: '',
        target_weight_kg: '',
        activity_level: 'moderate',
        assigned_coach_id: '',
        status: 'active'
    });

    useEffect(() => {
        loadCoaches();
    }, [user]);

    const loadCoaches = async () => {
        try {
            const data = await coachService.list();
            setCoaches(data);

            // Default to logged-in user if they correspond to a coach
            if (user) {
                const myCoachProfile = data.find(c => c.id === user.id);
                if (myCoachProfile) {
                    setFormData(prev => ({ ...prev, assigned_coach_id: user.id }));
                    return;
                }
            }

            if (data.length > 0 && !formData.assigned_coach_id) {
                setFormData(prev => ({ ...prev, assigned_coach_id: data[0].id }));
            }
        } catch (error) {
            console.error('Failed to load coaches', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Sanitize numeric and date fields
            const submissionData = {
                ...formData,
                birth_date: formData.birth_date === '' ? null : formData.birth_date,
                height_cm: formData.height_cm === '' ? null : parseFloat(formData.height_cm),
                starting_weight_kg: formData.starting_weight_kg === '' ? null : parseFloat(formData.starting_weight_kg),
                target_weight_kg: formData.target_weight_kg === '' ? null : parseFloat(formData.target_weight_kg),
            };
            await clientService.create(submissionData);
            navigate('/clients');
        } catch (error) {
            console.error('Failed to create client', error);
            alert('Error creating client');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light">
            <header className="border-b border-[#dfe2e2] bg-white px-8 py-3 shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/clients')} className="text-text-muted hover:text-primary transition-colors">
                        <span className="text-sm font-medium">{t('clients.title')}</span>
                    </button>
                    {i18n.dir() === 'rtl' ? <ChevronLeft size={16} className="text-text-muted" /> : <ChevronRight size={16} className="text-text-muted" />}
                    <span className="text-text-main text-sm font-bold">{t('clients.add_client')}</span>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
                    <h2 className="text-xl font-bold text-text-main mb-6">{t('clients.add_client')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">{t('clients.table.name')}</label>
                            <input
                                required
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>

                        {/* Coach */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">{t('clients.table.coach')}</label>
                            <select
                                name="assigned_coach_id"
                                value={formData.assigned_coach_id}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            >
                                {coaches.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 my-4" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Gender */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Height */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">Height (cm)</label>
                            <input
                                type="number"
                                name="height_cm"
                                value={formData.height_cm}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>

                        {/* Birth Date */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">Birth Date</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Start Weight */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">Starting Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="starting_weight_kg"
                                value={formData.starting_weight_kg}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>

                        {/* Target Weight */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text-main">Target Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="target_weight_kg"
                                value={formData.target_weight_kg}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50"
                        >
                            <Save size={18} />
                            <span>{loading ? t('common.loading') : t('common.save')}</span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};
