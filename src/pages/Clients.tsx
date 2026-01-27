import { useState, useEffect } from 'react';
import { clientService, coachService } from '../lib/api';
import { Users, Search, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Client {
    id: string;
    full_name: string;
    email: string;
    status: 'active' | 'paused' | 'completed';
    assigned_coach_id: string;
    created_at: string;
    starting_weight_kg: number;
    target_weight_kg: number;
    recent_measurements?: any[];
    psych_checkins?: any[];
}

interface Coach {
    id: string;
    name: string;
}

export const ClientsPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCoachId, setSelectedCoachId] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    useEffect(() => {
        filterClients();
    }, [search, selectedCoachId, statusFilter, clients]);

    const fetchData = async () => {
        try {
            const [clientsData, coachesData] = await Promise.all([
                clientService.list(user?.id),
                coachService.list()
            ]);
            setClients(clientsData);
            setCoaches(coachesData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterClients = () => {
        let result = clients;

        // Search filter
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter((c: Client) =>
                c.full_name.toLowerCase().includes(lowerSearch) ||
                c.email.toLowerCase().includes(lowerSearch)
            );
        }

        // Coach filter
        if (selectedCoachId) {
            result = result.filter((c: Client) => c.assigned_coach_id === selectedCoachId);
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter((c: Client) => c.status === statusFilter);
        }

        setFilteredClients(result);
    };

    const handleDeleteClient = async (clientId: string, clientName: string) => {
        if (!confirm(`Are you sure you want to permanently delete ${clientName}? This will also delete all their medical records, measurements, and nutrition plans.`)) {
            return;
        }

        try {
            await clientService.delete(clientId);
            await fetchData(); // Refresh list
        } catch (error) {
            console.error('Failed to delete client:', error);
            alert('Error deleting client');
        }
    };



    if (loading) return <div className="p-8 text-center text-primary">{t('common.loading')}</div>;

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light">
            {/* Header */}
            <header className="border-b border-[#dfe2e2] bg-white px-8 py-3 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="text-primary">
                        <Users size={24} />
                    </div>
                    <h2 className="text-text-main text-lg font-bold">{t('clients.title')}</h2>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

                {/* Controls Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder={t('clients.search_placeholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full ${i18n.dir() === 'rtl' ? 'pl-4 pr-10' : 'pl-10 pr-4'} py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                        />
                        <Search
                            className={`absolute ${i18n.dir() === 'rtl' ? 'right-3' : 'left-3'} top-3 text-gray-400`}
                            size={18}
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            value={selectedCoachId}
                            onChange={(e) => setSelectedCoachId(e.target.value)}
                            className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            disabled={!!user?.id}
                        >
                            <option value="">{t('clients.all_coaches')}</option>
                            {coaches.map(coach => (
                                <option key={coach.id} value={coach.id}>{coach.name}</option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        >
                            <option value="all">{t('clients.all_statuses')}</option>
                            <option value="active">{t('clients.status_active')}</option>
                            <option value="paused">{t('clients.status_paused')}</option>
                            <option value="completed">{t('clients.status_completed')}</option>
                        </select>

                        <button
                            onClick={() => navigate('/clients/new')}
                            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
                        >
                            <Plus size={18} />
                            <span className="hidden md:inline">{t('clients.add_client')}</span>
                        </button>


                    </div>
                </div>

                {/* Clients Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>Client</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Adherence Signal</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Progress (∆ Weight)</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Target Progress</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Last Active</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredClients.length > 0 ? (
                                    filteredClients.map((client) => {
                                        const currentWeight = client.recent_measurements?.[0]?.weight_kg || client.starting_weight_kg;
                                        const weightDiff = client.starting_weight_kg - currentWeight;
                                        const isLosing = weightDiff > 0;

                                        // Target Progress Calculation
                                        let targetProgress = 0;
                                        if (client.starting_weight_kg && client.target_weight_kg) {
                                            const totalNeeded = client.starting_weight_kg - client.target_weight_kg;
                                            if (totalNeeded !== 0) {
                                                targetProgress = Math.min(100, Math.max(0, (weightDiff / totalNeeded) * 100));
                                            }
                                        }

                                        // Adherence Logic
                                        const latestCheckin = client.psych_checkins?.[0];
                                        let adherenceStatus = 'good'; // green
                                        if (latestCheckin) {
                                            if (latestCheckin.stress_level === 'high' || latestCheckin.evening_hunger) adherenceStatus = 'warning'; // orange
                                            if (latestCheckin.adherence_difficulty === 'very_hard') adherenceStatus = 'risk'; // red
                                        }

                                        const lastActiveDate = client.recent_measurements?.[0]?.date || client.created_at;
                                        const daysSinceActive = Math.floor((new Date().getTime() - new Date(lastActiveDate).getTime()) / (1000 * 3600 * 24));

                                        return (
                                            <tr
                                                key={client.id}
                                                className="hover:bg-gray-50 transition-colors cursor-pointer group"
                                                onClick={() => navigate(`/clients/${client.id}`)}
                                            >
                                                <td className={`px-6 py-4 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-text-main">{client.full_name}</p>
                                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                                {client.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-text-muted">{client.email}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className={`w-2 h-2 rounded-full ${adherenceStatus === 'good' ? 'bg-green-500' :
                                                            adherenceStatus === 'warning' ? 'bg-orange-500 animate-pulse' : 'bg-red-500'
                                                            }`} />
                                                        <span className="text-xs font-medium">
                                                            {adherenceStatus === 'good' ? 'Stable' :
                                                                adherenceStatus === 'warning' ? 'Alert Flagged' : 'High Risk'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-black text-text-main">{currentWeight.toFixed(1)}kg</span>
                                                        <span className={`text-xs font-bold ${isLosing ? 'text-green-600' : 'text-blue-600'}`}>
                                                            {isLosing ? '↓' : '↑'} {Math.abs(weightDiff).toFixed(1)}kg
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="w-full max-w-[120px]">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-[10px] font-bold text-text-muted">{targetProgress.toFixed(0)}%</span>
                                                            <span className="text-[10px] font-bold text-text-muted">{client.target_weight_kg}kg</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                            <div
                                                                className="bg-primary h-full transition-all duration-500"
                                                                style={{ width: `${targetProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className={`text-xs font-bold ${daysSinceActive > 7 ? 'text-red-500' : 'text-text-main'}`}>
                                                            {daysSinceActive === 0 ? 'Today' :
                                                                daysSinceActive === 1 ? 'Yesterday' :
                                                                    `${daysSinceActive} days ago`}
                                                        </span>
                                                        <span className="text-[10px] text-text-muted">{new Date(lastActiveDate).toLocaleDateString()}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClient(client.id, client.full_name);
                                                        }}
                                                        className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                        title="Delete Client"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                                            {t('clients.no_clients_found')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
