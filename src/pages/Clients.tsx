import { useState, useEffect } from 'react';
import { clientService, coachService } from '../lib/api';
import { Users, Search, Plus, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Client {
    id: string;
    full_name: string;
    email: string;
    status: 'active' | 'paused' | 'completed';
    assigned_coach_id: string;
    created_at: string;
    recent_measurements?: any[];
}

interface Coach {
    id: string;
    name: string;
}

export const ClientsPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCoachId, setSelectedCoachId] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterClients();
    }, [search, selectedCoachId, statusFilter, clients]);

    const fetchData = async () => {
        try {
            const [clientsData, coachesData] = await Promise.all([
                clientService.list(),
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
            result = result.filter(c =>
                c.full_name.toLowerCase().includes(lowerSearch) ||
                c.email.toLowerCase().includes(lowerSearch)
            );
        }

        // Coach filter
        if (selectedCoachId) {
            result = result.filter(c => c.assigned_coach_id === selectedCoachId);
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(c => c.status === statusFilter);
        }

        setFilteredClients(result);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'paused': return 'bg-yellow-100 text-yellow-700';
            case 'completed': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
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
                                    <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('clients.table.name')}</th>
                                    <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('clients.table.status')}</th>
                                    <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('clients.table.coach')}</th>
                                    <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('clients.table.joined')}</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredClients.length > 0 ? (
                                    filteredClients.map((client) => {
                                        const coach = coaches.find(c => c.id === client.assigned_coach_id);
                                        return (
                                            <tr
                                                key={client.id}
                                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                                                onClick={() => navigate(`/clients/${client.id}`)}
                                            >
                                                <td className={`px-6 py-4 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                    <div>
                                                        <p className="font-bold text-text-main">{client.full_name}</p>
                                                        <p className="text-xs text-text-muted">{client.email}</p>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-4 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                                                        {t(`clients.status_${client.status}`) || client.status}
                                                    </span>
                                                </td>
                                                <td className={`px-6 py-4 text-text-muted ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                    {coach?.name || '-'}
                                                </td>
                                                <td className={`px-6 py-4 text-text-muted ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                    {new Date(client.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
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
