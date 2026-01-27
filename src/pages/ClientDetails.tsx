import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clientService } from '../lib/api';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronLeft, Calendar, Ruler, Weight, User, Plus, X, Trash2, Pencil, Activity, Thermometer, Pill, FileText, HeartPulse, Target, BookOpen, Brain, Dumbbell, TrendingDown, TrendingUp, History as HistoryIcon, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NewPhaseModal } from './NewPhase';

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const ClientDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [client, setClient] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // overview, medical, plan, consultations
    const [showEditModal, setShowEditModal] = useState(false);
    const [editClient, setEditClient] = useState<any>({});

    // Medical State
    const [medicalConditions, setMedicalConditions] = useState<any[]>([]);
    const [medications, setMedications] = useState<any[]>([]);
    const [bloodTests, setBloodTests] = useState<any[]>([]);
    const [showAddCondition, setShowAddCondition] = useState(false);
    const [showAddMedication, setShowAddMedication] = useState(false);
    const [showAddBloodTest, setShowAddBloodTest] = useState(false);
    const [selectedBloodTest, setSelectedBloodTest] = useState<any>(null);

    // Strategy State
    const [goals, setGoals] = useState<any[]>([]);
    const [prescriptions, setPrescriptions] = useState<any[]>([]);
    const [protocols, setProtocols] = useState<any[]>([]);
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | null>(null);
    const [showAddProtocol, setShowAddProtocol] = useState(false);
    const [showAddPhase, setShowAddPhase] = useState(false);
    const [newProtocol, setNewProtocol] = useState({
        name: '',
        type: 'nutrition',
        details: '',
        start_date: new Date().toISOString().split('T')[0]
    });

    // Tracking & Consultations State
    const [sessionNotes, setSessionNotes] = useState<any[]>([]);
    const [psychCheckins, setPsychCheckins] = useState<any[]>([]);
    const [activityLogs, setActivityLogs] = useState<any[]>([]);
    const [metabolicProfiles, setMetabolicProfiles] = useState<any[]>([]);

    const [showAddSession, setShowAddSession] = useState(false);
    const [showAddPsychCheckin, setShowAddPsychCheckin] = useState(false);
    const [showAddActivityLog, setShowAddActivityLog] = useState(false);
    const [showAddMetabolic, setShowAddMetabolic] = useState(false);

    const [newMetabolic, setNewMetabolic] = useState({
        date: new Date().toISOString().split('T')[0],
        rmr_value: '',
        rmr_method: 'Mifflin-St Jeor',
        tdee_range: '',
        calorie_deficit_target: '',
        kcal_per_km_assumption: '60',
        is_active: true
    });

    const [showAddMeasurement, setShowAddMeasurement] = useState(false);
    const [newMeasurement, setNewMeasurement] = useState({
        weight_kg: '',
        body_fat_percent: '',
        waist_circ_cm: '',
        navel_circ_cm: '',
        sleep_hours: '',
        sleep_quality: '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
    });

    // New Session Form State
    const [newSession, setNewSession] = useState({
        date: new Date().toISOString().split('T')[0],
        observations: '',
        changes_made: '',
        reason_for_change: '',
        constants: '',
        next_checkpoint: ''
    });

    // Medical Form State
    const [newCondition, setNewCondition] = useState({
        condition_name: '',
        diagnosed_date: new Date().toISOString().split('T')[0],
        status: 'active',
        notes: ''
    });
    const [newMedication, setNewMedication] = useState({
        name: '',
        dosage: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        reason: '',
        is_supplement: false,
        notes: ''
    });
    const [newBloodTest, setNewBloodTest] = useState({
        date: new Date().toISOString().split('T')[0],
        glucose: '',
        hba1c: '',
        alt: '',
        ast: '',
        ferritin: '',
        hemoglobin: '',
        vitamin_b12: '',
        vitamin_d: '',
        folate: '',
        ldl: '',
        hdl: '',
        clinician_notes: ''
    });

    const [newPsychCheckin, setNewPsychCheckin] = useState({
        date: new Date().toISOString().split('T')[0],
        motivation_status: 'medium',
        psychological_hunger_scale: '',
        stress_level: '',
    });

    const [newActivityLog, setNewActivityLog] = useState({
        start_date: new Date().toISOString().split('T')[0],
        activity_type: '',
        sessions_per_week: '',
        distance_km_week: '',
        strength_training: false,
        strength_split: '',
        is_current: true
    });



    const handleAddCondition = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await clientService.addMedicalCondition(id, newCondition);
            setShowAddCondition(false);
            setNewCondition({ condition_name: '', diagnosed_date: new Date().toISOString().split('T')[0], status: 'active', notes: '' });
            fetchMedicalData(id);
        } catch (error) {
            console.error('Failed to add condition', error);
        }
    };

    const handleAddMedication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await clientService.addMedication(id, newMedication);
            setShowAddMedication(false);
            setNewMedication({ name: '', dosage: '', start_date: new Date().toISOString().split('T')[0], end_date: '', reason: '', is_supplement: false, notes: '' });
            fetchMedicalData(id);
        } catch (error) {
            console.error('Failed to add medication', error);
        }
    };

    const handleAddBloodTest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            // Sanitize numeric fields - convert empty strings to null
            const sanitizedData = {
                ...newBloodTest,
                glucose: newBloodTest.glucose ? parseFloat(newBloodTest.glucose) : null,
                hba1c: newBloodTest.hba1c ? parseFloat(newBloodTest.hba1c) : null,
                alt: newBloodTest.alt ? parseFloat(newBloodTest.alt) : null,
                ast: newBloodTest.ast ? parseFloat(newBloodTest.ast) : null,
                ferritin: newBloodTest.ferritin ? parseFloat(newBloodTest.ferritin) : null,
                hemoglobin: newBloodTest.hemoglobin ? parseFloat(newBloodTest.hemoglobin) : null,
                vitamin_b12: newBloodTest.vitamin_b12 ? parseFloat(newBloodTest.vitamin_b12) : null,
                vitamin_d: newBloodTest.vitamin_d ? parseFloat(newBloodTest.vitamin_d) : null,
                folate: newBloodTest.folate ? parseFloat(newBloodTest.folate) : null,
                ldl: newBloodTest.ldl ? parseFloat(newBloodTest.ldl) : null,
                hdl: newBloodTest.hdl ? parseFloat(newBloodTest.hdl) : null
            };

            await clientService.addBloodTest(id, sanitizedData);
            setShowAddBloodTest(false);
            setNewBloodTest({
                date: new Date().toISOString().split('T')[0],
                glucose: '', hba1c: '', alt: '', ast: '', ferritin: '',
                hemoglobin: '', vitamin_b12: '', vitamin_d: '', folate: '',
                ldl: '', hdl: '', clinician_notes: ''
            });
            fetchMedicalData(id);
        } catch (error) {
            console.error('Failed to add blood test', error);
        }
    };


    useEffect(() => {
        if (id) fetchClientData(id);
    }, [id]);

    const handleAddMeasurement = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            await clientService.addMeasurement(id, {
                ...newMeasurement,
                weight_kg: parseFloat(newMeasurement.weight_kg),
                body_fat_percent: newMeasurement.body_fat_percent ? parseFloat(newMeasurement.body_fat_percent) : null,
                waist_circ_cm: newMeasurement.waist_circ_cm ? parseFloat(newMeasurement.waist_circ_cm) : null,
                navel_circ_cm: newMeasurement.navel_circ_cm ? parseFloat(newMeasurement.navel_circ_cm) : null,
                sleep_hours: newMeasurement.sleep_hours ? parseFloat(newMeasurement.sleep_hours) : null,
                sleep_quality: newMeasurement.sleep_quality ? parseInt(newMeasurement.sleep_quality) : null
            });
            setShowAddMeasurement(false);
            setNewMeasurement({
                weight_kg: '',
                body_fat_percent: '',
                waist_circ_cm: '',
                navel_circ_cm: '',
                sleep_hours: '',
                sleep_quality: '',
                notes: '',
                date: new Date().toISOString().split('T')[0]
            });
            fetchClientData(id); // Refresh data
        } catch (error) {
            console.error('Failed to add measurement', error);
            alert('Error adding measurement');
        }
    };

    const handleDeleteClient = async () => {
        if (!id || !client) return;
        if (!confirm(`Are you sure you want to permanently delete ${client.full_name}? This will also delete all their medical records, measurements, and nutrition plans.`)) {
            return;
        }

        try {
            await clientService.delete(id);
            navigate('/clients');
        } catch (error) {
            console.error('Failed to delete client:', error);
            alert('Error deleting client');
        }
    };

    const handleUpdateClient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            const updated = await clientService.update(id, editClient);
            setClient(updated);
            setShowEditModal(false);
        } catch (error) {
            console.error('Failed to update client:', error);
            alert('Error updating client');
        }
    };

    const handleAddPsychCheckin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await clientService.addPsychCheckin(id, {
                id: uuidv4(),
                ...newPsychCheckin,
                psychological_hunger_scale: newPsychCheckin.psychological_hunger_scale ? parseFloat(newPsychCheckin.psychological_hunger_scale) : 0
            });
            setShowAddPsychCheckin(false);
            setNewPsychCheckin({
                date: new Date().toISOString().split('T')[0],
                motivation_status: 'medium',
                psychological_hunger_scale: '',
                stress_level: '',
            });
            fetchTrackingData(id);
        } catch (error) {
            console.error('Failed to add psych checkin', error);
        }
    };

    const handleAddActivityLog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await clientService.addActivityLog(id, {
                id: uuidv4(),
                ...newActivityLog,
                sessions_per_week: newActivityLog.sessions_per_week ? parseInt(newActivityLog.sessions_per_week) : 0,
                distance_km_week: newActivityLog.distance_km_week ? parseFloat(newActivityLog.distance_km_week) : null
            });
            setShowAddActivityLog(false);
            setNewActivityLog({
                start_date: new Date().toISOString().split('T')[0],
                activity_type: '',
                sessions_per_week: '',
                distance_km_week: '',
                strength_training: false,
                strength_split: '',
                is_current: true
            });
            fetchTrackingData(id);
        } catch (error) {
            console.error('Failed to add activity log', error);
        }
    };

    const handleAddMetabolic = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await clientService.addMetabolicProfile(id, {
                id: uuidv4(),
                ...newMetabolic,
                rmr_value: newMetabolic.rmr_value ? parseInt(newMetabolic.rmr_value) : null,
                calorie_deficit_target: newMetabolic.calorie_deficit_target ? parseInt(newMetabolic.calorie_deficit_target) : null,
                kcal_per_km_assumption: newMetabolic.kcal_per_km_assumption ? parseInt(newMetabolic.kcal_per_km_assumption) : 60
            });
            setShowAddMetabolic(false);
            fetchTrackingData(id);
        } catch (error) {
            console.error('Failed to add metabolic profile', error);
        }
    };

    const handleDeletePsychCheckin = async (checkinId: string) => {
        if (!confirm('Delete this check-in?')) return;
        try {
            await clientService.deletePsychCheckin(checkinId);
            if (id) fetchTrackingData(id);
        } catch (error) {
            console.error('Failed to delete check-in', error);
        }
    };

    const handleDeleteActivityLog = async (logId: string) => {
        if (!confirm('Delete this activity log?')) return;
        try {
            await clientService.deleteActivityLog(logId);
            if (id) fetchTrackingData(id);
        } catch (error) {
            console.error('Failed to delete activity log', error);
        }
    };

    const handleDeleteMeasurement = async (measurementId: string) => {
        if (!confirm('Are you sure you want to delete this entry?')) return;

        try {
            await clientService.deleteMeasurement(measurementId);
            if (id) fetchClientData(id);
        } catch (error) {
            console.error('Failed to delete measurement', error);
            alert('Error deleting measurement');
        }
    };



    // Fetch client data and diary entries
    const fetchClientData = async (clientId: string) => {
        try {
            const clientData = await clientService.get(clientId);
            setClient(clientData);
            if (clientData.assigned_coach_id) {
                // const coaches = await coachService.list();
                // const assignedCoach = coaches.find((c: any) => c.id === clientData.assigned_coach_id);
                // setCoach(assignedCoach);
            }

        } catch (error) {
            console.error('Failed to load client details', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'medical' && id) {
            fetchMedicalData(id);
        } else if (activeTab === 'plan' && id) {
            fetchStrategyData(id);
        } else if (activeTab === 'consultations' && id) {
            fetchTrackingData(id);
        } else if (activeTab === 'overview' && id) {
            fetchStrategyData(id);
            fetchTrackingData(id);
        }
    }, [activeTab, id]);

    const fetchTrackingData = async (clientId: string) => {
        try {
            const [sessions, psych, activity, metabolic] = await Promise.all([
                clientService.getSessionNotes(clientId),
                clientService.getPsychCheckins(clientId),
                clientService.getActivityLogs(clientId),
                clientService.getMetabolicProfiles(clientId)
            ]);
            setSessionNotes(sessions);
            setPsychCheckins(psych);
            setActivityLogs(activity);
            setMetabolicProfiles(metabolic);
        } catch (error) {
            console.error('Failed to load tracking data', error);
        }
    };

    const handleAddSession = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await clientService.addSessionNote(id, newSession);
            setShowAddSession(false);
            setNewSession({ date: new Date().toISOString().split('T')[0], observations: '', changes_made: '', reason_for_change: '', constants: '', next_checkpoint: '' });
            fetchTrackingData(id);
        } catch (error) {
            console.error('Failed to add session note', error);
        }
    };

    const handleGoalStatusChange = async (goalId: string, status: string) => {
        if (!confirm(`Are you sure you want to mark this phase as ${status}?`)) return;
        try {
            await clientService.updateGoal(goalId, { status: status });
            if (id) fetchStrategyData(id);
        } catch (error) {
            console.error('Failed to update goal status', error);
            alert('Error updating phase status');
        }
    };

    const handleAddProtocol = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await clientService.addProtocol(id!, newProtocol);
            setShowAddProtocol(false);
            setNewProtocol({ name: '', type: 'nutrition', details: '', start_date: new Date().toISOString().split('T')[0] });
            fetchStrategyData(id!);
        } catch (error) {
            console.error('Failed to add protocol', error);
            alert('Error adding protocol');
        }
    };

    const handleUpdateProtocolStatus = async (protocolId: string, status: string) => {
        try {
            await clientService.updateProtocol(protocolId, { status: status });
            fetchStrategyData(id!);
        } catch (error) {
            console.error('Failed to update protocol status', error);
        }
    };

    const fetchMedicalData = async (clientId: string) => {
        try {
            const [conditions, meds, bloods] = await Promise.all([
                clientService.getMedicalConditions(clientId),
                clientService.getMedications(clientId),
                clientService.getBloodTests(clientId)
            ]);
            setMedicalConditions(conditions);
            setMedications(meds);
            setBloodTests(bloods);
        } catch (error) {
            console.error('Failed to load medical data', error);
        }
    };



    const fetchStrategyData = async (clientId: string) => {
        try {
            const [goalsData, prescriptionsData, protocolsData] = await Promise.all([
                clientService.getGoals(clientId),
                clientService.getPrescriptions(clientId),
                clientService.getProtocols(clientId)
            ]);
            setGoals(goalsData);
            setPrescriptions(prescriptionsData);
            setProtocols(protocolsData);

            // Set active prescription as default selected
            const active = prescriptionsData.find((p: any) => p.is_active);
            if (active && !selectedPrescriptionId) {
                setSelectedPrescriptionId(active.id);
            }
        } catch (error) {
            console.error('Failed to fetch strategy data', error);
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
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setEditClient({
                                full_name: client.full_name,
                                email: client.email,
                                birth_date: client.birth_date ? new Date(client.birth_date).toISOString().split('T')[0] : '',
                                gender: client.gender || '',
                                sex: client.sex || '',
                                height_cm: client.height_cm,
                                target_weight_kg: client.target_weight_kg,
                                activity_level: client.activity_level || '',
                                status: client.status || 'active'
                            });
                            setShowEditModal(true);
                        }}
                        className="flex items-center gap-2 text-gray-400 hover:text-primary px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        <Pencil size={16} />
                        Edit Profile
                    </button>
                    <button
                        onClick={handleDeleteClient}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                    >
                        <Trash2 size={16} />
                        Delete Client
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-[#dfe2e2] flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium">Status</p>
                            <p className="text-lg font-bold text-text-main capitalize">{client.status}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#dfe2e2] flex items-center gap-4">
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

                    <div className="bg-white p-4 rounded-xl border border-[#dfe2e2] flex items-center gap-4">
                        <div className="p-3 rounded-full bg-green-50 text-green-600">
                            <Ruler size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium">Height</p>
                            <p className="text-lg font-bold text-text-main">{client.height_cm} cm</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#dfe2e2] flex items-center gap-4">
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

                {/* Middle Stats - Primary KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Total Loss/Gain Card */}
                    <div className="bg-white p-5 rounded-xl border border-[#dfe2e2]">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">
                            {client?.recent_measurements?.[0]?.weight_kg >= client.starting_weight_kg ? 'Total Gain' : 'Total Loss'}
                        </p>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-black text-text-main flex items-baseline gap-1">
                                {client?.starting_weight_kg && client?.recent_measurements?.[0]?.weight_kg
                                    ? Math.abs(client.starting_weight_kg - client.recent_measurements[0].weight_kg).toFixed(1)
                                    : '0'}
                                <span className="text-xs font-bold text-text-muted">kg</span>
                            </p>
                            <div className={`p-2 rounded-xl scale-110 ${client.starting_weight_kg - (client.recent_measurements?.[0]?.weight_kg || client.starting_weight_kg) > 0 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                {client.starting_weight_kg - (client.recent_measurements?.[0]?.weight_kg || client.starting_weight_kg) > 0 ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
                            </div>
                        </div>
                        <p className="text-xs text-green-600 font-medium mt-1">
                            {client?.starting_weight_kg && client?.recent_measurements?.[0]?.weight_kg
                                ? Math.abs((client.starting_weight_kg - client.recent_measurements[0].weight_kg) / (Math.max(1, (new Date().getTime() - new Date(client.created_at).getTime()) / (1000 * 60 * 60 * 24 * 7)))).toFixed(1) + ' kg/wk avg'
                                : '0 kg/wk avg'
                            }
                        </p>
                    </div>

                    {/* Active Phase Card */}
                    <div className="bg-white p-5 rounded-xl border border-[#dfe2e2]">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Active Phase</p>
                        <p className="text-xl font-black text-text-main truncate mb-1">
                            {goals.find((g: any) => g.status === 'active')?.phase_name || 'General'}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${goals.find((g: any) => g.status === 'active') ? 'bg-primary shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-gray-300'}`}></span>
                            <p className="text-xs text-text-muted font-bold truncate">
                                {goals.find((g: any) => g.status === 'active')?.priority || 'Maintenance'}
                            </p>
                        </div>
                    </div>

                    {/* Last Contact Card */}
                    <div className="bg-white p-5 rounded-xl border border-[#dfe2e2]">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Last Contact</p>
                        <p className={`text-2xl font-black ${!sessionNotes.length || (new Date().getTime() - new Date(sessionNotes[0].date).getTime()) / (1000 * 60 * 60 * 24) > 14
                            ? 'text-red-500'
                            : 'text-text-main'
                            }`}>
                            {sessionNotes.length
                                ? Math.floor((new Date().getTime() - new Date(sessionNotes[0].date).getTime()) / (1000 * 60 * 60 * 24)) + 'd ago'
                                : 'Never'}
                        </p>
                        <p className="text-xs text-text-muted font-bold mt-1">
                            {sessionNotes.length > 0 && Math.floor((new Date().getTime() - new Date(sessionNotes[0].date).getTime()) / (1000 * 60 * 60 * 24)) > 14 ? 'Check-in Overdue' : 'On Track'}
                        </p>
                    </div>

                    {/* Adherence Signal Card (Dynamic) */}
                    <div className="bg-white p-5 rounded-xl border border-[#dfe2e2] flex items-center justify-between relative group">
                        <div className="z-10">
                            <div className="flex items-center gap-1 mb-1">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Adherence Signal</p>
                                <div className="relative group/info">
                                    <div className="cursor-help text-text-muted hover:text-primary transition-colors">
                                        <Info size={12} />
                                    </div>
                                    <div className="absolute top-full right-0 mt-2 w-72 p-4 bg-[#1e293b] text-white rounded-xl shadow-2xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-200 z-[100] pointer-events-none border border-slate-700">
                                        <p className="text-[11px] font-bold text-teal-400 uppercase tracking-wider mb-2">How it's Calculated</p>
                                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                                            The signal starts at <span className="text-white font-bold">5 dots</span> and subtracts points based on "friction" in the latest check-in:
                                        </p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between items-center text-[11px]">
                                                <span className="text-slate-400">Motivation (Med/Low)</span>
                                                <span className="text-red-400 font-bold">-1 / -2</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[11px]">
                                                <span className="text-slate-400">Hunger (4-5/5)</span>
                                                <span className="text-red-400 font-bold">-1 / -2</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[11px]">
                                                <span className="text-slate-400">High Stress</span>
                                                <span className="text-red-400 font-bold">-1</span>
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-slate-700 mt-2">
                                            <p className="text-[10px] italic text-slate-400 leading-snug">
                                                Recent check-in shows <span className="text-teal-400 font-bold">{psychCheckins[0]?.motivation_status || 'N/A'}</span> motivation. Friction dots are removed to highlight adherence risk.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5" title={psychCheckins.length ? `Latest Check-in:\nMotivation: ${psychCheckins[0].motivation_status}\nHunger: ${psychCheckins[0].psychological_hunger_scale}/5\nStress: ${psychCheckins[0].stress_level}` : 'No check-in data'}>
                                {(() => {
                                    const latest = psychCheckins[0];
                                    if (!latest) return [1, 2, 3, 4, 5].map(i => <div key={i} className="w-3 h-3 rounded-full bg-gray-100" />);

                                    let score = 5;
                                    if (latest.motivation_status === 'medium') score -= 1;
                                    if (latest.motivation_status === 'low') score -= 2;
                                    if (latest.psychological_hunger_scale >= 4) score -= 1;
                                    if (latest.psychological_hunger_scale >= 5) score -= 1;
                                    if (latest.stress_level === 'high') score -= 1;
                                    score = Math.max(1, score);

                                    return [1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className={`w-3 h-3 rounded-full ${i <= score ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-gray-200'}`} />
                                    ));
                                })()}
                            </div>
                        </div>
                        {/* Clipped background icon */}
                        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-10 rotate-12">
                                <Activity size={60} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Overview', icon: User },
                        { id: 'medical', label: 'Medical & Health', icon: HeartPulse },
                        { id: 'plan', label: 'Nutrition Plan', icon: FileText },
                        { id: 'consultations', label: 'Consultations', icon: BookOpen },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-text-muted hover:text-text-main'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (<>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Metabolic & Strategy Profile */}
                        <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Activity size={20} className="text-primary" />
                                    <h3 className="text-text-main text-base font-bold">Metabolic Profile</h3>
                                </div>
                                <button
                                    onClick={() => setShowAddMetabolic(true)}
                                    className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                                    title="Edit Metabolic Settings"
                                >
                                    <Pencil size={16} />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs text-text-muted block mb-1">Target Calories</label>
                                            <p className="text-lg font-bold text-primary">{prescriptions.find(p => p.is_active)?.calories_target || 'N/A'}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <label className="text-xs text-text-muted block mb-1">Target Change/Wk</label>
                                            <p className="text-lg font-bold text-gray-800">{goals.find(g => g.status === 'active')?.expected_weekly_change_kg || 0.5} kg</p>
                                        </div>
                                    </div>

                                    {metabolicProfiles.length > 0 && (
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <label className="text-[10px] text-text-muted font-bold uppercase block mb-0.5">RMR ({metabolicProfiles[0].rmr_method})</label>
                                                <p className="text-sm font-black text-text-main">{metabolicProfiles[0].rmr_value} kcal</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-text-muted font-bold uppercase block mb-0.5">Deficit Target</label>
                                                <p className="text-sm font-black text-text-main">{metabolicProfiles[0].calorie_deficit_target} kcal</p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-[10px] text-text-muted font-bold uppercase block mb-0.5">Est. TDEE Range</label>
                                                <p className="text-sm font-black text-text-main">{metabolicProfiles[0].tdee_range || 'N/A'}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="border-t border-gray-100 pt-4">
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Current Protocol</label>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Protein</span>
                                                <span className="font-medium">{prescriptions.find(p => p.is_active)?.protein_grams || '-'}g</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Steps/Cardio</span>
                                                <span className="font-medium">{activityLogs.find(a => a.is_current)?.distance_km_week ? `${activityLogs.find(a => a.is_current).distance_km_week}km/wk` : client.activity_level}</span>
                                            </div>
                                            {prescriptions.find(p => p.is_active)?.is_intermittent_fasting && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Fasting</span>
                                                    <span className="font-medium text-purple-600">{prescriptions.find(p => p.is_active).fasting_protocol}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Red Flags (Latest)</label>
                                        {!psychCheckins.length ? (
                                            <p className="text-sm text-text-muted italic">No recent check-ins.</p>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {psychCheckins[0]?.evening_hunger && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md font-bold">Evening Hunger</span>}
                                                {psychCheckins[0]?.stress_level === 'high' && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md font-bold">High Stress</span>}
                                                {psychCheckins[0]?.adherence_difficulty && <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md font-bold">Diff: {psychCheckins[0].adherence_difficulty}</span>}
                                                {!psychCheckins[0]?.evening_hunger && psychCheckins[0]?.stress_level !== 'high' && <span className="text-sm text-green-600 font-medium">No alerts flagged.</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Progress / Measurements History */}
                        <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center justify-between">
                                <h3 className="text-text-main text-base font-bold">Recent Progress</h3>
                                <button
                                    onClick={() => setShowAddMeasurement(true)}
                                    className="flex items-center gap-1.5 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <Plus size={16} />
                                    <span>Add Progress</span>
                                </button>
                            </div>

                            {client.recent_measurements && client.recent_measurements.length > 0 ? (
                                <div className="max-h-[300px] overflow-y-auto pr-2">
                                    <table className="w-full text-sm text-left border-separate border-spacing-0">
                                        <thead className="bg-gray-50 text-gray-500 font-medium sticky top-0 z-10 shadow-sm">
                                            <tr>
                                                <th className="px-4 py-3">Date</th>
                                                <th className="px-4 py-3">Weight (kg)</th>
                                                <th className="px-4 py-3">Body Fat %</th>
                                                <th className="px-4 py-3">Notes</th>
                                                <th className="px-4 py-3 w-10"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {client.recent_measurements.map((m: any) => (
                                                <tr key={m.id} className="group">
                                                    <td className="px-4 py-3">{new Date(m.date).toLocaleDateString()}</td>
                                                    <td className="px-4 py-3 font-medium text-text-main">{m.weight_kg}</td>
                                                    <td className="px-4 py-3">{m.body_fat_percent || '-'}%</td>
                                                    <td className="px-4 py-3 text-text-muted truncate max-w-xs">{m.notes}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button
                                                            onClick={() => handleDeleteMeasurement(m.id)}
                                                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                                                            title="Delete entry"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
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

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Weight Progress Chart */}
                        <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#dfe2e2]">
                                <h3 className="text-text-main text-base font-bold">Weight Progress</h3>
                            </div>
                            <div className="p-6">
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={[...(client.recent_measurements || [])].reverse()}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis
                                                dataKey="date"
                                                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                stroke="#9CA3AF"
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#9CA3AF"
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                                axisLine={false}
                                                domain={['auto', 'auto']}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="weight_kg"
                                                stroke="#0D9488"
                                                strokeWidth={3}
                                                dot={{ fill: '#0D9488', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                                activeDot={{ r: 6, strokeWidth: 0 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Body Fat Progress Chart */}
                        <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#dfe2e2]">
                                <h3 className="text-text-main text-base font-bold">Body Fat % Progress</h3>
                            </div>
                            <div className="p-6">
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={[...(client.recent_measurements || [])].reverse()}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis
                                                dataKey="date"
                                                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                stroke="#9CA3AF"
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#9CA3AF"
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                                axisLine={false}
                                                domain={['auto', 'auto']}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="body_fat_percent"
                                                stroke="#7C3AED"
                                                strokeWidth={3}
                                                dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                                activeDot={{ r: 6, strokeWidth: 0 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}

                {activeTab === 'medical' && (
                    <div className="space-y-6">
                        {/* Medical Conditions */}
                        <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-[#dfe2e2]">
                                <h3 className="text-text-main text-base font-bold flex items-center gap-2">
                                    <Activity size={20} className="text-primary" />
                                    Medical Conditions
                                </h3>
                                <button
                                    onClick={() => setShowAddCondition(true)}
                                    className="flex items-center gap-1.5 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <Plus size={16} />
                                    Add Condition
                                </button>
                            </div>
                            {medicalConditions.length === 0 ? (
                                <div className="text-center p-8 text-text-muted">No medical conditions recorded.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-3">Diagnosed</th>
                                            <th className="px-4 py-3">Condition</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">Notes</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {medicalConditions.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">{new Date(item.diagnosed_date).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 font-medium text-text-main">{item.condition_name}</td>
                                                <td className="px-4 py-3 capitalize">{item.status}</td>
                                                <td className="px-4 py-3 text-text-muted">{item.notes}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button onClick={() => { if (confirm('Delete?')) clientService.deleteMedicalCondition(item.id).then(() => fetchMedicalData(id!)) }} className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Medications */}
                        <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-[#dfe2e2]">
                                <h3 className="text-text-main text-base font-bold flex items-center gap-2">
                                    <Pill size={20} className="text-primary" />
                                    Medications
                                </h3>
                                <button
                                    onClick={() => setShowAddMedication(true)}
                                    className="flex items-center gap-1.5 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <Plus size={16} />
                                    Add Medication
                                </button>
                            </div>
                            {medications.length === 0 ? (
                                <div className="text-center p-8 text-text-muted">No medications recorded.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-3">Start Date</th>
                                            <th className="px-4 py-3">Medication</th>
                                            <th className="px-4 py-3">Dosage</th>
                                            <th className="px-4 py-3">Reason</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {medications.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">{new Date(item.start_date).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 font-medium text-text-main">{item.name}</td>
                                                <td className="px-4 py-3">{item.dosage}</td>
                                                <td className="px-4 py-3 text-text-muted">{item.reason}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button onClick={() => { if (confirm('Delete?')) clientService.deleteMedication(item.id).then(() => fetchMedicalData(id!)) }} className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Blood Tests */}
                        <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-[#dfe2e2]">
                                <h3 className="text-text-main text-base font-bold flex items-center gap-2">
                                    <Thermometer size={20} className="text-primary" />
                                    Blood Tests
                                </h3>
                                <button
                                    onClick={() => setShowAddBloodTest(true)}
                                    className="flex items-center gap-1.5 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <Plus size={16} />
                                    Add Blood Test
                                </button>
                            </div>
                            {bloodTests.length === 0 ? (
                                <div className="text-center p-8 text-text-muted">No blood tests recorded.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Glucose</th>
                                            <th className="px-4 py-3">HbA1c</th>
                                            <th className="px-4 py-3">Lipids (LDL/HDL)</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {bloodTests.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item: any, index: number, arr: any[]) => {
                                            const prev = arr[index + 1];
                                            const getTrend = (curr: any, prev: any) => {
                                                if (!curr || !prev) return null;
                                                const diff = parseFloat(curr) - parseFloat(prev);
                                                if (Math.abs(diff) < 0.1) return <span className="text-gray-400">→</span>;
                                                return diff > 0
                                                    ? <span className="text-red-500 text-xs">↑ {diff.toFixed(1)}</span>
                                                    : <span className="text-green-500 text-xs">↓ {Math.abs(diff).toFixed(1)}</span>;
                                            };

                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-blue-50 cursor-pointer transition-colors"
                                                    onClick={() => setSelectedBloodTest(item)}
                                                >
                                                    <td className="px-4 py-3 font-medium text-text-main">{new Date(item.date).toLocaleDateString()}</td>
                                                    <td className="px-4 py-3">
                                                        {item.glucose || '-'}
                                                        <div className="ml-1 inline">{getTrend(item.glucose, prev?.glucose)}</div>
                                                    </td>
                                                    <td className="px-4 py-3 font-bold text-primary">
                                                        {item.hba1c || '-'}%
                                                        <div className="ml-1 inline">{getTrend(item.hba1c, prev?.hba1c)}</div>
                                                    </td>
                                                    <td className="px-4 py-3">{item.ldl || '-'}/{item.hdl || '-'}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <ChevronRight size={16} className="text-gray-300" />
                                                            <button onClick={(e) => { e.stopPropagation(); if (confirm('Delete?')) clientService.deleteBloodTest(item.id).then(() => fetchMedicalData(id!)) }} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}



                {activeTab === 'plan' && (
                    <div className="space-y-6">
                        {/* Current Active Protocols */}
                        {/* Top Section: Protocols & Phase Manager */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Current Active Protocols */}
                            <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                                <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2">
                                    <Activity size={20} className="text-primary" />
                                    <h3 className="text-text-main text-base font-bold">Active Protocols</h3>
                                </div>
                                <div className="p-6 space-y-3">
                                    {protocols.filter((p: any) => p.status === 'active').length === 0 ? (
                                        <p className="text-text-muted text-sm italic">No active protocols.</p>
                                    ) : (
                                        protocols.filter((p: any) => p.status === 'active').map((p: any) => (
                                            <div key={p.id} className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3">
                                                <div>
                                                    <p className="font-bold text-sm text-blue-900">{p.name}</p>
                                                    <p className="text-xs text-blue-700">{p.details || 'No details specified.'}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] uppercase font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded">Active</span>
                                                    <button onClick={() => handleUpdateProtocolStatus(p.id, 'paused')} className="text-xs text-gray-500 hover:text-gray-700 underline">Pause</button>
                                                    <button onClick={() => handleUpdateProtocolStatus(p.id, 'completed')} className="text-xs text-gray-500 hover:text-gray-700 underline">End</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <button
                                        onClick={() => setShowAddProtocol(true)}
                                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-bold text-text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Add Specific Protocol
                                    </button>
                                </div>
                            </div>

                            {/* Phase Manager (Goals) */}
                            <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                                <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center gap-2">
                                    <Target size={20} className="text-primary" />
                                    <h3 className="text-text-main text-base font-bold">Phase Manager</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {goals.map((goal: any) => (
                                        <div key={goal.id} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${goal.status === 'active' ? 'bg-green-100 text-green-700' :
                                                        goal.status === 'completed' ? 'bg-gray-100 text-gray-500' :
                                                            goal.status === 'aborted' ? 'bg-red-100 text-red-500' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {goal.status}
                                                    </span>
                                                    <p className="font-bold text-sm text-gray-800">{goal.phase_name || goal.priority}</p>
                                                </div>
                                                <p className="text-xs text-gray-500">Target: {goal.target_weight_kg}kg ({goal.target_body_fat_percent}%)</p>
                                                <p className="text-xs text-text-muted mt-0.5">{new Date(goal.start_date).toLocaleDateString()} - {goal.end_date ? new Date(goal.end_date).toLocaleDateString() : '...'}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {goal.status === 'active' && (
                                                    <>
                                                        <button onClick={() => handleGoalStatusChange(goal.id, 'completed')} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded border border-gray-300 transition-colors">Complete</button>
                                                        <button onClick={() => handleGoalStatusChange(goal.id, 'aborted')} className="text-xs bg-white hover:bg-red-50 text-red-600 px-2 py-1 rounded border border-red-200 transition-colors">Abort</button>
                                                    </>
                                                )}
                                                {(goal.status === 'pending' || !goal.status) && (
                                                    <button onClick={() => handleGoalStatusChange(goal.id, 'active')} className="text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1 rounded transition-colors">Start Phase</button>
                                                )}
                                                {goal.status === 'aborted' && (
                                                    <button onClick={() => handleGoalStatusChange(goal.id, 'active')} className="text-xs text-primary hover:underline">Restart</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {goals.length === 0 && <p className="text-sm text-text-muted text-center py-4">No phases defined.</p>}
                                </div>
                            </div>
                        </div>

                        {/* Plan Change Log - New Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Plan Change Log - New Section */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden h-full">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
                                            <HistoryIcon size={20} className="text-primary" />
                                            Plan Change Log
                                        </h3>
                                        <button
                                            onClick={() => setShowAddPhase(true)}
                                            className="flex items-center gap-1.5 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-primary/20 shadow-sm"
                                        >
                                            <Plus size={14} />
                                            New
                                        </button>
                                    </div>
                                    <div className="relative border-l-2 border-primary/20 ml-3 pl-6 space-y-6">
                                        {prescriptions.slice().sort((a: any, b: any) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()).map((plan: any, index: number, arr: any[]) => {
                                            const nextPlan = arr[index + 1];
                                            const kcalDiff = nextPlan ? plan.calories_target - nextPlan.calories_target : 0;
                                            const isSelected = selectedPrescriptionId === plan.id;

                                            return (
                                                <div
                                                    key={plan.id}
                                                    className={`relative cursor-pointer transition-all ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                                                    onClick={() => setSelectedPrescriptionId(plan.id)}
                                                >
                                                    {/* Date indicator dot */}
                                                    <div className={`absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-white border-4 ${isSelected ? 'border-primary shadow-md' : 'border-gray-200'} z-10 transition-colors`} />

                                                    <div className={`flex flex-col gap-2 p-3 rounded-xl border-2 transition-all ${isSelected ? 'bg-primary/5 border-primary shadow-sm' : 'bg-transparent border-transparent hover:bg-gray-50'}`}>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <p className={`font-bold text-sm ${isSelected ? 'text-primary' : 'text-text-main'}`}>{new Date(plan.start_date).toLocaleDateString()}</p>
                                                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase mt-1 inline-block ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>{plan.phase_name}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xs font-bold text-gray-800">{plan.calories_target} kcal</p>
                                                                {kcalDiff !== 0 && (
                                                                    <p className={`text-[10px] font-bold ${kcalDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                        {kcalDiff > 0 ? '+' : ''}{kcalDiff}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Selected Prescription Details */}
                            <div className="lg:col-span-2">
                                {prescriptions.filter((p: any) => p.id === selectedPrescriptionId).map((plan: any) => (
                                    <div key={plan.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-primary shadow-xl p-8 relative overflow-hidden animate-in slide-in-from-bottom-4 duration-500 h-full">
                                        {/* Decor */}
                                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                            <Activity size={200} />
                                        </div>

                                        <div className="flex justify-between items-start mb-8 relative z-10">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-black text-2xl text-text-main tracking-tight">{plan.phase_name || 'Nutrition Plan'}</h4>
                                                    {plan.is_active ? (
                                                        <span className="bg-green-500 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">Current Active Plan</span>
                                                    ) : (
                                                        <span className="bg-gray-400 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">Historical Phase</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-text-muted">
                                                    <Calendar size={14} />
                                                    <p className="text-xs font-medium">
                                                        Started {new Date(plan.start_date).toLocaleDateString()} • {plan.end_date ? `Ends ${new Date(plan.end_date).toLocaleDateString()}` : 'Ongoing Priority'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="inline-block bg-primary text-white px-4 py-2 rounded-xl shadow-lg shadow-primary/20">
                                                    <p className="text-3xl font-black leading-none">{plan.calories_target}</p>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Daily kcal</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6 mb-10 relative z-10">
                                            <div className="bg-white/60 backdrop-blur-sm border border-blue-100 p-5 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-transform">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Protein</p>
                                                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                                </div>
                                                <p className="font-black text-2xl text-gray-900 tracking-tighter">{plan.protein_grams}<span className="text-sm font-normal text-text-muted ml-0.5">g</span></p>
                                                <p className="text-[10px] text-text-muted mt-1">{Math.round((plan.protein_grams * 4 / plan.calories_target) * 100)}% of total</p>
                                            </div>
                                            <div className="bg-white/60 backdrop-blur-sm border border-green-100 p-5 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-transform">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Carbs</p>
                                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                                </div>
                                                <p className="font-black text-2xl text-gray-900 tracking-tighter">{plan.carbs_grams}<span className="text-sm font-normal text-text-muted ml-0.5">g</span></p>
                                                <p className="text-[10px] text-text-muted mt-1">{Math.round((plan.carbs_grams * 4 / plan.calories_target) * 100)}% of total</p>
                                            </div>
                                            <div className="bg-white/60 backdrop-blur-sm border border-yellow-100 p-5 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-transform">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-[10px] text-yellow-600 font-black uppercase tracking-widest">Fats</p>
                                                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                                </div>
                                                <p className="font-black text-2xl text-gray-900 tracking-tighter">{plan.fat_grams}<span className="text-sm font-normal text-text-muted ml-0.5">g</span></p>
                                                <p className="text-[10px] text-text-muted mt-1">{Math.round((plan.fat_grams * 9 / plan.calories_target) * 100)}% of total</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 bg-white/40 p-6 rounded-2xl border border-white relative z-10">
                                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">Detailed Menu & Rules</h5>
                                            <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap font-medium" dir="rtl">
                                                {plan.training_day_rules}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Phase Manager (Goals) */}

                    </div>
                )}

                {/* Add Protocol Modal */}
                {
                    showAddProtocol && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Add New Protocol</h3>
                                    <button onClick={() => setShowAddProtocol(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleAddProtocol} className="space-y-4">
                                    <div><label className="block text-sm font-medium text-gray-700">Protocol Name</label><input type="text" required placeholder="e.g. IF 16:8, Refeed Day" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newProtocol.name} onChange={e => setNewProtocol({ ...newProtocol, name: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Type</label>
                                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newProtocol.type} onChange={e => setNewProtocol({ ...newProtocol, type: e.target.value })}>
                                            <option value="nutrition">Nutrition</option>
                                            <option value="training">Training</option>
                                            <option value="lifestyle">Lifestyle</option>
                                            <option value="supplement">Supplement</option>
                                        </select>
                                    </div>
                                    <div><label className="block text-sm font-medium text-gray-700">Details / Rules</label><textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" rows={3} placeholder="e.g. Fast from 8pm to 12pm daily." value={newProtocol.details} onChange={e => setNewProtocol({ ...newProtocol, details: e.target.value })}></textarea></div>

                                    <div className="flex justify-end gap-2 pt-4"><button type="button" onClick={() => setShowAddProtocol(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-hover">Save Protocol</button></div>
                                </form>
                            </div>
                        </div>
                    )
                }

                {/* Add Measurement Modal */}
                {
                    showAddMeasurement && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                    <h3 className="font-bold text-text-main">Add Progress Entry</h3>
                                    <button onClick={() => setShowAddMeasurement(false)} className="text-text-muted hover:text-text-main">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleAddMeasurement} className="p-4 space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-text-muted">Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={newMeasurement.date}
                                            onChange={e => setNewMeasurement({ ...newMeasurement, date: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-text-muted">Weight (kg)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                required
                                                value={newMeasurement.weight_kg}
                                                onChange={e => setNewMeasurement({ ...newMeasurement, weight_kg: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-text-muted">Body Fat %</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={newMeasurement.body_fat_percent}
                                                onChange={e => setNewMeasurement({ ...newMeasurement, body_fat_percent: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-text-muted">Notes</label>
                                        <textarea
                                            rows={3}
                                            value={newMeasurement.notes}
                                            onChange={e => setNewMeasurement({ ...newMeasurement, notes: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                                            placeholder="Optional progress notes..."
                                        />
                                    </div>

                                    <div className="pt-2 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddMeasurement(false)}
                                            className="px-4 py-2 text-sm font-medium text-text-muted hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
                                        >
                                            Save Entry
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }

                {/* Add Condition Modal */}
                {
                    showAddCondition && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Add Medical Condition</h3>
                                    <button onClick={() => setShowAddCondition(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleAddCondition} className="space-y-4">
                                    <div><label className="block text-sm font-medium text-gray-700">Condition</label><input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newCondition.condition_name} onChange={e => setNewCondition({ ...newCondition, condition_name: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Date Diagnosed</label><input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newCondition.diagnosed_date} onChange={e => setNewCondition({ ...newCondition, diagnosed_date: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Status</label><select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newCondition.status} onChange={e => setNewCondition({ ...newCondition, status: e.target.value })}><option value="active">Active</option><option value="managed">Managed</option><option value="resolved">Resolved</option></select></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Notes</label><textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" rows={3} value={newCondition.notes} onChange={e => setNewCondition({ ...newCondition, notes: e.target.value })}></textarea></div>
                                    <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowAddCondition(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-hover">Save</button></div>
                                </form>
                            </div>
                        </div>
                    )
                }

                {/* Add Medication Modal */}
                {
                    showAddMedication && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Add Medication</h3>
                                    <button onClick={() => setShowAddMedication(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleAddMedication} className="space-y-4">
                                    <div><label className="block text-sm font-medium text-gray-700">Medication Name</label><input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMedication.name} onChange={e => setNewMedication({ ...newMedication, name: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Dosage</label><input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMedication.dosage} onChange={e => setNewMedication({ ...newMedication, dosage: e.target.value })} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Start Date</label><input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMedication.start_date} onChange={e => setNewMedication({ ...newMedication, start_date: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">End Date (Optional)</label><input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMedication.end_date} onChange={e => setNewMedication({ ...newMedication, end_date: e.target.value })} /></div>
                                    </div>
                                    <div><label className="block text-sm font-medium text-gray-700">Reason</label><input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMedication.reason} onChange={e => setNewMedication({ ...newMedication, reason: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Notes</label><textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" rows={2} value={newMedication.notes} onChange={e => setNewMedication({ ...newMedication, notes: e.target.value })}></textarea></div>
                                    <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowAddMedication(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-hover">Save</button></div>
                                </form>
                            </div>
                        </div>
                    )
                }

                {/* Add Blood Test Modal */}
                {
                    showAddBloodTest && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Add Blood Test</h3>
                                    <button onClick={() => setShowAddBloodTest(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleAddBloodTest} className="space-y-4">
                                    <div><label className="block text-sm font-medium text-gray-700">Date</label><input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.date} onChange={e => setNewBloodTest({ ...newBloodTest, date: e.target.value })} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Hemoglobin</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.hemoglobin} onChange={e => setNewBloodTest({ ...newBloodTest, hemoglobin: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Ferritin</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.ferritin} onChange={e => setNewBloodTest({ ...newBloodTest, ferritin: e.target.value })} /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Vitamin B12</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.vitamin_b12} onChange={e => setNewBloodTest({ ...newBloodTest, vitamin_b12: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Vitamin D</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.vitamin_d} onChange={e => setNewBloodTest({ ...newBloodTest, vitamin_d: e.target.value })} /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Folate</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.folate} onChange={e => setNewBloodTest({ ...newBloodTest, folate: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Glucose</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.glucose} onChange={e => setNewBloodTest({ ...newBloodTest, glucose: e.target.value })} /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700">LDL</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.ldl} onChange={e => setNewBloodTest({ ...newBloodTest, ldl: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">HDL</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newBloodTest.hdl} onChange={e => setNewBloodTest({ ...newBloodTest, hdl: e.target.value })} /></div>
                                    </div>
                                    <div><label className="block text-sm font-medium text-gray-700">Clinician Notes / Interpretation</label><textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" rows={3} value={newBloodTest.clinician_notes} onChange={e => setNewBloodTest({ ...newBloodTest, clinician_notes: e.target.value })}></textarea></div>
                                    <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowAddBloodTest(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-hover">Save</button></div>
                                </form>
                            </div>
                        </div>
                    )
                }



                {/* Consultations Tab Content */}
                {
                    activeTab === 'consultations' && (
                        <div className="space-y-6">
                            {/* Status Check-ins Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* Behavior & Adherence */}
                                <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                                    <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Brain size={20} className="text-secondary" />
                                            <h3 className="text-text-main text-base font-bold">Behavior & Adherence</h3>
                                        </div>
                                        <button
                                            onClick={() => setShowAddPsychCheckin(true)}
                                            className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                                            title="Add Check-in"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        {psychCheckins.length === 0 ? (
                                            <p className="text-text-muted text-sm">No behavior checks logged.</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {psychCheckins.slice(0, 3).map((check: any) => (
                                                    <div key={check.id} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs font-medium text-gray-500">{new Date(check.date).toLocaleDateString()}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${check.motivation_status === 'high' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                    Mot: {check.motivation_status}
                                                                </span>
                                                                <button onClick={() => handleDeletePsychCheckin(check.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                                            <div>
                                                                <span className="text-xs text-gray-400 block">Hunger (1-5)</span>
                                                                <span className="font-bold">{check.psychological_hunger_scale}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-xs text-text-muted block">Stress</span>
                                                                <span>{check.stress_level}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Activity Tracking */}
                                <div className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                                    <div className="px-6 py-4 border-b border-[#dfe2e2] flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Dumbbell size={20} className="text-blue-500" />
                                            <h3 className="text-text-main text-base font-bold">Activity & Training</h3>
                                        </div>
                                        <button
                                            onClick={() => setShowAddActivityLog(true)}
                                            className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                                            title="Add Activity"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        {activityLogs.length === 0 ? (
                                            <p className="text-text-muted text-sm">No activity logs active.</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {activityLogs.slice(0, 5).map((log: any) => (
                                                    <div key={log.id} className="bg-blue-50/50 p-4 rounded-lg">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <p className="font-bold text-gray-800">{log.activity_type}</p>
                                                                <p className="text-xs text-gray-500">Started {new Date(log.start_date).toLocaleDateString()}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {log.is_current && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">CURRENT</span>}
                                                                <button onClick={() => handleDeleteActivityLog(log.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                                            <div className="text-center bg-white p-2 rounded border border-blue-100">
                                                                <span className="block text-xl font-bold text-blue-600">{log.sessions_per_week}</span>
                                                                <span className="text-[10px] text-gray-500 uppercase">Sessions/Wk</span>
                                                            </div>
                                                            <div className="text-center bg-white p-2 rounded border border-blue-100">
                                                                <span className="block text-xl font-bold text-blue-600">{log.distance_km_week || '--'}</span>
                                                                <span className="text-[10px] text-gray-500 uppercase">km/Week</span>
                                                            </div>
                                                        </div>
                                                        {log.strength_training && (
                                                            <div className="mt-3 pt-3 border-t border-blue-100 text-sm">
                                                                <span className="font-bold text-gray-700 block mb-1">Strength Program</span>
                                                                <span>{log.strength_split}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#dfe2e2]">
                                <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
                                    <BookOpen size={20} className="text-primary" />
                                    Session Decisions Log
                                </h3>
                                <button
                                    onClick={() => setShowAddSession(true)}
                                    className="flex items-center gap-1.5 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <Plus size={16} />
                                    Start Session
                                </button>
                            </div>
                            {
                                sessionNotes.map((note: any) => (
                                    <div key={note.id} className="bg-white rounded-xl border border-[#dfe2e2] overflow-hidden">
                                        <div className="px-6 py-4 border-b border-[#dfe2e2] flex justify-between items-center">
                                            <h4 className="font-bold text-lg text-text-main">Consultation Notes</h4>
                                            <div className="text-sm text-text-muted">{new Date(note.date).toLocaleDateString()}</div>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase">Observations</p>
                                                <p className="text-gray-800">{note.observations}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                                    <p className="text-xs font-bold text-orange-600 uppercase mb-1">What Changed</p>
                                                    <p className="text-sm text-gray-800">{note.changes_made || 'No changes.'}</p>
                                                    {note.reason_for_change && (
                                                        <p className="text-xs text-text-muted mt-2 italic">"{note.reason_for_change}"</p>
                                                    )}
                                                </div>
                                                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                                    <p className="text-xs font-bold text-green-600 uppercase mb-1">What Stayed Same</p>
                                                    <p className="text-sm text-gray-800">{note.constants || '--'}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase">Next Checkpoint</p>
                                                <p className="text-sm text-primary font-medium">{note.next_checkpoint}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div >
                    )
                }

                {/* Add Session Modal */}
                {
                    showAddSession && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">New Consultation Log</h3>
                                    <button onClick={() => setShowAddSession(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleAddSession} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Date</label><input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newSession.date} onChange={e => setNewSession({ ...newSession, date: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Next Checkpoint</label><input type="text" placeholder="e.g. 2 weeks" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newSession.next_checkpoint} onChange={e => setNewSession({ ...newSession, next_checkpoint: e.target.value })} /></div>
                                    </div>
                                    <div><label className="block text-sm font-medium text-gray-700">Key Observations</label><textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" rows={3} placeholder="Client mood, compliance, physical changes..." value={newSession.observations} onChange={e => setNewSession({ ...newSession, observations: e.target.value })}></textarea></div>

                                    <div className="border-t pt-4">
                                        <h4 className="font-bold text-sm mb-2">Decisions</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-sm font-medium text-gray-700">What Changed?</label><textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" rows={2} placeholder="Adjusted calories..." value={newSession.changes_made} onChange={e => setNewSession({ ...newSession, changes_made: e.target.value })}></textarea></div>
                                            <div><label className="block text-sm font-medium text-gray-700">Why?</label><textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" rows={2} placeholder="Weight stalled for 2 weeks..." value={newSession.reason_for_change} onChange={e => setNewSession({ ...newSession, reason_for_change: e.target.value })}></textarea></div>
                                        </div>
                                        <div className="mt-2"><label className="block text-sm font-medium text-gray-700">What Stayed the Same?</label><input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" placeholder="Training split, supplements..." value={newSession.constants} onChange={e => setNewSession({ ...newSession, constants: e.target.value })} /></div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4 border-t"><button type="button" onClick={() => setShowAddSession(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-hover">Save Session Log</button></div>
                                </form>
                            </div>
                        </div>
                    )
                }
                {/* Add Phase Modal */}
                {
                    showAddPhase && id && (
                        <NewPhaseModal
                            clientId={id}
                            clientName={client?.full_name || 'Client'}
                            onClose={() => setShowAddPhase(false)}
                            onSuccess={() => {
                                setShowAddPhase(false);
                                fetchStrategyData(id);
                            }}
                        />
                    )
                }
                {/* Blood Test Details Modal */}
                {
                    selectedBloodTest && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                                            <Thermometer size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-text-main">Blood Analysis Results</h2>
                                            <p className="text-text-muted text-sm">{new Date(selectedBloodTest.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedBloodTest(null)} className="p-2 text-gray-400 hover:text-text-main hover:bg-gray-100 rounded-xl transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Hemoglobin (Hb)', key: 'hemoglobin', unit: 'g/dL', range: '14.0 - 18.0', min: 14.0, max: 18.0 },
                                            { label: 'Ferritin', key: 'ferritin', unit: 'ng/mL', range: '30 - 350', min: 30, max: 350 },
                                            { label: 'B12', key: 'vitamin_b12', unit: 'pg/mL', range: '211 - 911', min: 211, max: 911 },
                                            { label: 'Vitamin D', key: 'vitamin_d', unit: 'ng/mL', range: '30 - 100', min: 30, max: 100 },
                                            { label: 'Folate', key: 'folate', unit: 'ng/mL', range: '4.6 - 18.7', min: 4.6, max: 18.7 },
                                            { label: 'Glucose (Fasting)', key: 'glucose', unit: 'mg/dL', range: '70 - 100', min: 70, max: 100 },
                                            { label: 'HbA1c', key: 'hba1c', unit: '%', range: '4.0 - 5.7', min: 4.0, max: 5.7 },
                                            { label: 'LDL Cholesterol', key: 'ldl', unit: 'mg/dL', range: '0 - 100', min: 0, max: 100 },
                                            { label: 'HDL Cholesterol', key: 'hdl', unit: 'mg/dL', range: '40 - 100', min: 40, max: 100 },
                                        ].map((marker) => {
                                            const value = selectedBloodTest[marker.key];
                                            if (value === undefined || value === null) return null;

                                            const isLow = marker.min !== undefined && value < marker.min;
                                            const isHigh = marker.max !== undefined && value > marker.max;
                                            const statusColor = isLow || isHigh ? 'text-red-500' : 'text-green-600';
                                            const bgColor = isLow || isHigh ? 'bg-red-50/50 border-red-100' : 'bg-white border-gray-100';

                                            return (
                                                <div key={marker.key} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${bgColor}`}>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <p className="text-xs font-black uppercase tracking-widest text-text-muted">{marker.label}</p>
                                                            {(isLow || isHigh) && (
                                                                <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full tracking-tighter uppercase">
                                                                    {isLow ? 'LOW' : 'HIGH'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] font-bold text-text-muted">
                                                            Normal Range: <span className="text-text-main">{marker.range}</span> {marker.unit}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-xl font-black ${statusColor}`}>
                                                            {value}{marker.unit === '%' ? '%' : ''}
                                                        </p>
                                                        <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter">{marker.unit}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {selectedBloodTest.clinician_notes && (
                                        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Clinician Interpretation</h4>
                                            <p className="text-sm font-medium text-blue-900 leading-relaxed italic">
                                                "{selectedBloodTest.clinician_notes}"
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                                    <button
                                        onClick={() => setSelectedBloodTest(null)}
                                        className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* Edit Profile Modal */}
                {
                    showEditModal && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <Pencil size={20} className="text-primary" />
                                        Edit Patient Profile
                                    </h3>
                                    <button onClick={() => setShowEditModal(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleUpdateClient} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-text-main mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                value={editClient.full_name}
                                                onChange={e => setEditClient({ ...editClient, full_name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-main mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-muted"
                                                value={editClient.email}
                                                onChange={e => setEditClient({ ...editClient, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-main mb-1">Birth Date</label>
                                            <input
                                                type="date"
                                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                value={editClient.birth_date}
                                                onChange={e => setEditClient({ ...editClient, birth_date: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-main mb-1">Status</label>
                                            <select
                                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                value={editClient.status}
                                                onChange={e => setEditClient({ ...editClient, status: e.target.value })}
                                            >
                                                <option value="active">Active</option>
                                                <option value="paused">Paused</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-main mb-1">Sex (At Birth)</label>
                                            <select
                                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                value={editClient.sex}
                                                onChange={e => setEditClient({ ...editClient, sex: e.target.value })}
                                            >
                                                <option value="">Select Sex</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-main mb-1">Gender Identity</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                value={editClient.gender}
                                                onChange={e => setEditClient({ ...editClient, gender: e.target.value })}
                                                placeholder="e.g. Male, Female, Non-binary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-main mb-1">Height (cm)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                value={editClient.height_cm}
                                                onChange={e => setEditClient({ ...editClient, height_cm: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-main mb-1">Target Weight (kg)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                value={editClient.target_weight_kg}
                                                onChange={e => setEditClient({ ...editClient, target_weight_kg: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => setShowEditModal(false)}
                                            className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors shadow-sm"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }

                {/* Add Psych Check-in Modal */}
                {
                    showAddPsychCheckin && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Add Behavior Check-in</h3>
                                    <button onClick={() => setShowAddPsychCheckin(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleAddPsychCheckin} className="space-y-4">
                                    <div><label className="block text-sm font-medium text-gray-700">Date</label><input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newPsychCheckin.date} onChange={e => setNewPsychCheckin({ ...newPsychCheckin, date: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Motivation</label>
                                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newPsychCheckin.motivation_status} onChange={e => setNewPsychCheckin({ ...newPsychCheckin, motivation_status: e.target.value })}>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Hunger (1-5)</label><input type="number" min="1" max="5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newPsychCheckin.psychological_hunger_scale} onChange={e => setNewPsychCheckin({ ...newPsychCheckin, psychological_hunger_scale: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Stress</label><input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newPsychCheckin.stress_level} onChange={e => setNewPsychCheckin({ ...newPsychCheckin, stress_level: e.target.value })} /></div>
                                    </div>
                                    <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowAddPsychCheckin(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-hover">Save</button></div>
                                </form>
                            </div>
                        </div>
                    )
                }

                {/* Add Activity Log Modal */}
                {
                    showAddActivityLog && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Add Activity Log</h3>
                                    <button onClick={() => setShowAddActivityLog(false)}><X size={20} /></button>
                                </div>
                                <form onSubmit={handleAddActivityLog} className="space-y-4">
                                    <div><label className="block text-sm font-medium text-gray-700">Start Date</label><input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newActivityLog.start_date} onChange={e => setNewActivityLog({ ...newActivityLog, start_date: e.target.value })} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Activity Type</label><input type="text" required placeholder="e.g. Running, Weightlifting" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newActivityLog.activity_type} onChange={e => setNewActivityLog({ ...newActivityLog, activity_type: e.target.value })} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Sessions/Week</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newActivityLog.sessions_per_week} onChange={e => setNewActivityLog({ ...newActivityLog, sessions_per_week: e.target.value })} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Distance (km)</label><input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newActivityLog.distance_km_week} onChange={e => setNewActivityLog({ ...newActivityLog, distance_km_week: e.target.value })} /></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="strength" checked={newActivityLog.strength_training} onChange={e => setNewActivityLog({ ...newActivityLog, strength_training: e.target.checked })} />
                                        <label htmlFor="strength" className="text-sm text-gray-700">Strength Training?</label>
                                    </div>
                                    {newActivityLog.strength_training && (
                                        <div><label className="block text-sm font-medium text-gray-700">Split Details</label><input type="text" placeholder="e.g. PPL, Upper/Lower" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newActivityLog.strength_split} onChange={e => setNewActivityLog({ ...newActivityLog, strength_split: e.target.value })} /></div>
                                    )}
                                    <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowAddActivityLog(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-hover">Save</button></div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </main>

            {/* Add Metabolic Profile Modal */}
            {showAddMetabolic && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Metabolic Settings</h3>
                            <button onClick={() => setShowAddMetabolic(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleAddMetabolic} className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700">Date</label><input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMetabolic.date} onChange={e => setNewMetabolic({ ...newMetabolic, date: e.target.value })} /></div>

                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700">RMR (kcal)</label><input type="number" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMetabolic.rmr_value} onChange={e => setNewMetabolic({ ...newMetabolic, rmr_value: e.target.value })} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">Method</label>
                                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMetabolic.rmr_method} onChange={e => setNewMetabolic({ ...newMetabolic, rmr_method: e.target.value })}>
                                        <option value="Mifflin-St Jeor">Mifflin-St Jeor</option>
                                        <option value="Harris-Benedict">Harris-Benedict</option>
                                        <option value="Katch-McArdle">Katch-McArdle</option>
                                        <option value="Cunningham">Cunningham</option>
                                    </select>
                                </div>
                            </div>

                            <div><label className="block text-sm font-medium text-gray-700">TDEE Range (e.g. 2100-2300)</label><input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMetabolic.tdee_range} onChange={e => setNewMetabolic({ ...newMetabolic, tdee_range: e.target.value })} /></div>

                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700">Deficit Target</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMetabolic.calorie_deficit_target} onChange={e => setNewMetabolic({ ...newMetabolic, calorie_deficit_target: e.target.value })} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">Kcal/KM</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" value={newMetabolic.kcal_per_km_assumption} onChange={e => setNewMetabolic({ ...newMetabolic, kcal_per_km_assumption: e.target.value })} /></div>
                            </div>

                            <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowAddMetabolic(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-hover">Save Profile</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    );
};
