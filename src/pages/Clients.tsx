import { useState, useEffect } from 'react';
import { clientService } from '../lib/api';
import { Users, Search, Plus, Trash2, LayoutGrid, List } from 'lucide-react';
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
    const [viewType, setViewType] = useState<'grid' | 'table'>('grid');

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

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6" dir={i18n.dir()}>

                {/* Controls Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-2 rounded-xl border border-gray-100 backdrop-blur-sm">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder={t('clients.search_placeholder')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={`w-full ${i18n.dir() === 'rtl' ? 'pl-4 pr-10 text-right' : 'pl-10 pr-4 text-left'} py-2 rounded-lg border border-gray-200 bg-white/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm`}
                            />
                            <Search
                                className={`absolute ${i18n.dir() === 'rtl' ? 'right-3' : 'left-3'} top-2.5 text-gray-400`}
                                size={16}
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="hidden sm:flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                            <button
                                onClick={() => setViewType('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewType === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                                title={t('clients.view_grid')}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewType('table')}
                                className={`p-1.5 rounded-md transition-all ${viewType === 'table' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                                title={t('clients.view_table')}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none min-w-[140px]"
                        >
                            <option value="all">{t('clients.all_statuses')}</option>
                            <option value="active">{t('clients.status_active')}</option>
                            <option value="paused">{t('clients.status_paused')}</option>
                            <option value="completed">{t('clients.status_completed')}</option>
                        </select>

                        <button
                            onClick={() => navigate('/clients/new')}
                            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors text-sm font-bold shadow-sm"
                        >
                            <Plus size={18} />
                            <span className="hidden md:inline">{t('clients.add_client')}</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                {viewType === 'grid' ? (
                    /* Clients Grid */
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
                                                <h3 className="text-lg font-black text-text-main leading-tight group-hover:text-primary transition-colors text-start">
                                                    {client.full_name}
                                                </h3>
                                                <p className="text-xs text-text-muted font-medium text-start">{client.email}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {t(`clients.status_${client.status}`)}
                                            </span>
                                        </div>

                                        {/* Adherence Dots */}
                                        <div className="flex items-center gap-1 mb-6 relative z-10">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-2 h-2 rounded-full ${i <= adherenceDots ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.3)]' : 'bg-gray-100'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-bold text-text-muted mx-2 uppercase tracking-tighter">
                                                {adherenceDots >= 4 ? t('clients.adherence_stable') : adherenceDots >= 3 ? t('clients.adherence_caution') : t('clients.adherence_risk')}
                                            </span>
                                        </div>

                                        {/* Weights Row */}
                                        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                                            <div className="text-start">
                                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">{t('clients.current_weight')}</p>
                                                <p className="text-xl font-black text-text-main">
                                                    {currentWeight.toFixed(1)}
                                                    <span className="text-xs ml-0.5 text-text-muted">kg</span>
                                                </p>
                                            </div>
                                            <div className="text-start">
                                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">{t('clients.total_progress')}</p>
                                                <p className={`text-xl font-black ${isLosing ? 'text-green-600' : 'text-blue-600'}`}>
                                                    {isLosing ? '↓' : '↑'} {Math.abs(weightDiff).toFixed(1)}
                                                    <span className="text-xs ml-0.5 opacity-70">kg</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Target Progress Bar */}
                                        <div className="mb-6 relative z-10">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{t('clients.goal_progress')}</span>
                                                <span className="text-[10px] font-black text-primary bg-primary/10 px-1.5 rounded">{targetProgress.toFixed(0)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-primary h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                                                    style={{ width: `${targetProgress}%`, float: i18n.dir() === 'rtl' ? 'right' : 'left' }}
                                                />
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
                                            <div className="flex flex-col">
                                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1 text-start">{t('clients.last_active')}</p>
                                                <p className={`text-xs font-black ${daysSinceActive > 7 ? 'text-red-500' : 'text-text-main'} text-start`}>
                                                    {daysSinceActive === 0 ? t('clients.today') :
                                                        daysSinceActive === 1 ? t('clients.yesterday') :
                                                            t('clients.days_ago', { count: daysSinceActive })}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClient(client.id, client.full_name);
                                                }}
                                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title={t('common.delete')}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        {/* Clipped background icon */}
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                                            <div className={`absolute ${i18n.dir() === 'rtl' ? '-left-2' : '-right-2'} top-1/2 -translate-y-1/2 opacity-[0.03] rotate-12 group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500`}>
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
                ) : (
                    <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm" dir={i18n.dir()}>
                                <thead className="bg-gray-50/80 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-text-muted uppercase tracking-wider text-[10px] text-start">{t('clients.table.name')}</th>
                                        <th className="px-6 py-4 font-bold text-text-muted uppercase tracking-wider text-[10px] text-start">{t('clients.adherence_signal')}</th>
                                        <th className="px-6 py-4 font-bold text-text-muted uppercase tracking-wider text-[10px] text-start">{t('clients.total_progress')}</th>
                                        <th className="px-6 py-4 font-bold text-text-muted uppercase tracking-wider text-[10px] text-start">{t('clients.goal_progress')}</th>
                                        <th className="px-6 py-4 font-bold text-text-muted uppercase tracking-wider text-[10px] text-start">{t('clients.last_active')}</th>
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
                                                <tr
                                                    key={client.id}
                                                    className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                                                    onClick={() => navigate(`/clients/${client.id}`)}
                                                >
                                                    <td className="px-6 py-4 text-start">
                                                        <div className="flex flex-col">
                                                            <p className="font-black text-text-main group-hover:text-primary transition-colors text-start">{client.full_name}</p>
                                                            <p className="text-[11px] text-text-muted font-medium text-start">{client.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-start">
                                                        <div className="flex items-center gap-1">
                                                            {[1, 2, 3, 4, 5].map((i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-1.5 h-1.5 rounded-full ${i <= adherenceDots ? 'bg-green-500' : 'bg-gray-200'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-start">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-black text-text-main">{currentWeight.toFixed(1)}kg</span>
                                                            <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${isLosing ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                                                {isLosing ? '↓' : '↑'} {Math.abs(weightDiff).toFixed(1)}kg
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-start">
                                                        <div className="w-full max-w-[120px]">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-[10px] font-black text-primary">{targetProgress.toFixed(0)}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                                                <div
                                                                    className="bg-primary h-full transition-all duration-500"
                                                                    style={{ width: `${targetProgress}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-start">
                                                        <div className="flex flex-col">
                                                            <span className={`text-xs font-black ${daysSinceActive > 7 ? 'text-red-500' : 'text-text-main'}`}>
                                                                {daysSinceActive === 0 ? t('clients.today') :
                                                                    daysSinceActive === 1 ? t('clients.yesterday') :
                                                                        t('clients.days_ago', { count: daysSinceActive })}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-4 ${i18n.dir() === 'rtl' ? 'text-left' : 'text-right'}`}>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteClient(client.id, client.full_name);
                                                            }}
                                                            className="p-1.5 text-gray-300 hover:text-red-50 hover:text-red-500 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                                            title={t('common.delete')}
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-text-muted font-medium">
                                                {t('clients.no_clients_found')}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
