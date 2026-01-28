import { useState, useEffect } from 'react';
import { clientService } from '../lib/api';
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


export const ClientsPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    useEffect(() => {
        filterClients();
    }, [search, statusFilter, clients]);

    const fetchData = async () => {
        try {
            const clientsData = await clientService.list(user?.id);
            setClients(clientsData);
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

                {/* Clients Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
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
                            let adherenceDots = 5;
                            if (latestCheckin) {
                                if (latestCheckin.motivation_status === 'medium') adherenceDots -= 1;
                                if (latestCheckin.motivation_status === 'low') adherenceDots -= 2;
                                if (latestCheckin.evening_hunger || latestCheckin.stress_level === 'high') adherenceDots -= 1;
                                adherenceDots = Math.max(1, adherenceDots);
                            }

                            const lastActiveDate = client.recent_measurements?.[0]?.date || client.created_at;
                            const daysSinceActive = Math.floor((new Date().getTime() - new Date(lastActiveDate).getTime()) / (1000 * 3600 * 24));

                            return (
                                <div
                                    key={client.id}
                                    className="bg-white rounded-xl border border-[#dfe2e2] p-5 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                                    onClick={() => navigate(`/clients/${client.id}`)}
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-black text-text-main leading-tight group-hover:text-primary transition-colors">
                                                {client.full_name}
                                            </h3>
                                            <p className="text-xs text-text-muted font-medium">{client.email}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {client.status}
                                        </span>
                                    </div>

                                    {/* Adherence Dots */}
                                    <div className="flex items-center gap-1 mb-6 relative z-10">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className={`w-2 h-2 rounded-full ${i <= adherenceDots ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.3)]' : 'bg-gray-100'}`}
                                            />
                                        ))}
                                        <span className="text-[10px] font-bold text-text-muted ml-2 uppercase tracking-tighter">
                                            {adherenceDots >= 4 ? 'Stable' : adherenceDots >= 3 ? 'Caution' : 'Risk'}
                                        </span>
                                    </div>

                                    {/* Weights Row */}
                                    <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                                        <div>
                                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Current Weight</p>
                                            <p className="text-xl font-black text-text-main">
                                                {currentWeight.toFixed(1)}
                                                <span className="text-xs ml-0.5 text-text-muted">kg</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Total Progress</p>
                                            <p className={`text-xl font-black ${isLosing ? 'text-green-600' : 'text-blue-600'}`}>
                                                {isLosing ? '↓' : '↑'} {Math.abs(weightDiff).toFixed(1)}
                                                <span className="text-xs ml-0.5 opacity-70">kg</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Target Progress Bar */}
                                    <div className="mb-6 relative z-10">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Goal Progress</span>
                                            <span className="text-[10px] font-black text-primary bg-primary/10 px-1.5 rounded">{targetProgress.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-primary h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                                                style={{ width: `${targetProgress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
                                        <div className="flex flex-col">
                                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">Last Active</p>
                                            <p className={`text-xs font-black ${daysSinceActive > 7 ? 'text-red-500' : 'text-text-main'}`}>
                                                {daysSinceActive === 0 ? 'Today' :
                                                    daysSinceActive === 1 ? 'Yesterday' :
                                                        `${daysSinceActive} days ago`}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClient(client.id, client.full_name);
                                            }}
                                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete Client"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Clipped background icon */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-[0.03] rotate-12 group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500">
                                            <Users size={120} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <Users size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-text-muted font-medium">{t('clients.no_clients_found')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
