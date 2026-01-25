import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clientService, coachService } from '../lib/api';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronLeft, Calendar, Ruler, Weight, User } from 'lucide-react';

export const ClientDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [client, setClient] = useState<any>(null);
    const [coach, setCoach] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchClientData(id);
    }, [id]);

    const fetchClientData = async (clientId: string) => {
        try {
            const clientData = await clientService.get(clientId);
            setClient(clientData);

            if (clientData.assigned_coach_id) {
                const coaches = await coachService.list();
                const assignedCoach = coaches.find((c: any) => c.id === clientData.assigned_coach_id);
                setCoach(assignedCoach);
            }
        } catch (error) {
            console.error('Failed to load client details', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">{t('common.loading')}</div>;
    if (!client) return <div className="p-8 text-center">Client not found</div>;

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light">
            <header className="border-b border-[#dfe2e2] bg-white px-8 py-3 shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/clients')} className="text-text-muted hover:text-primary transition-colors">
                        <span className="text-sm font-medium">{t('clients.title')}</span>
                    </button>
                    {i18n.dir() === 'rtl' ? <ChevronLeft size={16} className="text-text-muted" /> : <ChevronRight size={16} className="text-text-muted" />}
                    <span className="text-text-main text-sm font-bold">{client.full_name}</span>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium">Status</p>
                            <p className="text-lg font-bold text-text-main capitalize">{client.status}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-full bg-red-50 text-red-600">
                            <Weight size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium">Current Weight</p>
                            <p className="text-lg font-bold text-text-main">
                                {client.recent_measurements && client.recent_measurements.length > 0
                                    ? client.recent_measurements[0].weight_kg
                                    : client.starting_weight_kg} kg
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-full bg-green-50 text-green-600">
                            <Ruler size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium">Height</p>
                            <p className="text-lg font-bold text-text-main">{client.height_cm} cm</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium">Joined</p>
                            <p className="text-lg font-bold text-text-main">
                                {new Date(client.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Profile Info */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
                        <h3 className="font-bold text-lg text-text-main">Profile Overview</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-text-muted block mb-1">Email</label>
                                <p className="text-sm font-medium">{client.email}</p>
                            </div>
                            <div>
                                <label className="text-xs text-text-muted block mb-1">Phone</label>
                                <p className="text-sm font-medium">{client.phone || '-'}</p>
                            </div>
                            <div>
                                <label className="text-xs text-text-muted block mb-1">Assigned Coach</label>
                                <p className="text-sm font-medium">{coach?.name || client.assigned_coach_id}</p>
                            </div>
                            <div>
                                <label className="text-xs text-text-muted block mb-1">Target Weight</label>
                                <p className="text-sm font-medium">{client.target_weight_kg} kg</p>
                            </div>
                            <div>
                                <label className="text-xs text-text-muted block mb-1">Activity Level</label>
                                <p className="text-sm font-medium capitalize">{client.activity_level.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Progress / Measurements History */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="font-bold text-lg text-text-main mb-4">Recent Progress</h3>

                        {client.recent_measurements && client.recent_measurements.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Weight (kg)</th>
                                            <th className="px-4 py-3">Body Fat %</th>
                                            <th className="px-4 py-3">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {client.recent_measurements.map((m: any) => (
                                            <tr key={m.id}>
                                                <td className="px-4 py-3">{new Date(m.date).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 font-medium text-text-main">{m.weight_kg}</td>
                                                <td className="px-4 py-3">{m.body_fat_percent || '-'}%</td>
                                                <td className="px-4 py-3 text-text-muted truncate max-w-xs">{m.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-text-muted">No measurements recorded yet.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
