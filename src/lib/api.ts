import { supabase } from './supabase';

const mapCoach = (coach: any) => {
    if (!coach) return null;
    return {
        ...coach,
        proteinPriority: coach.protein_priority ?? 0.5,
        carbTolerance: coach.carb_tolerance ?? 0.5,
        fatTolerance: coach.fat_tolerance ?? 0.5,
        hydrationEmphasis: coach.hydration_emphasis ?? 0.5,
        consistencyEmphasis: coach.consistency_emphasis ?? 0.5,
        philosophyId: coach.philosophy_id,
        programs_enabled: coach.programs_enabled ?? true
    };
};

export const coachService = {
    async list() {
        const { data, error } = await supabase
            .from('coaches')
            .select('*')
            .order('name');
        if (error) throw error;
        return (data || []).map(mapCoach);
    },

    async get(coachId: string) {
        const { data, error } = await supabase
            .from('coaches')
            .select('*')
            .eq('id', coachId)
            .single();
        if (error) throw error;
        return mapCoach(data);
    },

    async update(coachId: string, updates: any) {
        // Map back to snake_case for the database
        const dbUpdates = { ...updates };
        if ('proteinPriority' in dbUpdates) { dbUpdates.protein_priority = dbUpdates.proteinPriority; delete dbUpdates.proteinPriority; }
        if ('carbTolerance' in dbUpdates) { dbUpdates.carb_tolerance = dbUpdates.carbTolerance; delete dbUpdates.carbTolerance; }
        if ('fatTolerance' in dbUpdates) { dbUpdates.fat_tolerance = dbUpdates.fatTolerance; delete dbUpdates.fatTolerance; }
        if ('hydrationEmphasis' in dbUpdates) { dbUpdates.hydration_emphasis = dbUpdates.hydrationEmphasis; delete dbUpdates.hydrationEmphasis; }
        if ('consistencyEmphasis' in dbUpdates) { dbUpdates.consistency_emphasis = dbUpdates.consistencyEmphasis; delete dbUpdates.consistencyEmphasis; }

        const { data, error } = await supabase
            .from('coaches')
            .update(dbUpdates)
            .eq('id', coachId)
            .select()
            .single();
        if (error) throw error;
        return mapCoach(data);
    }
};

export const clientService = {
    async list(coachId?: string) {
        let query = supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });

        if (coachId) {
            query = query.eq('assigned_coach_id', coachId);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async get(clientId: string) {
        // Fetch client and recent measurements
        const { data: client, error: clientError } = await supabase
            .from('clients')
            .select('*')
            .eq('id', clientId)
            .single();

        if (clientError) throw clientError;

        const { data: measurements, error: measError } = await supabase
            .from('client_measurements')
            .select('*')
            .order('date', { ascending: false })
            .eq('client_id', clientId);

        if (measError) throw measError;

        return {
            ...client,
            recent_measurements: measurements
        };
    },

    async update(clientId: string, clientData: any) {
        const { data, error } = await supabase
            .rpc('update_client_profile', { client_id: clientId, updates: clientData });
        if (error) throw error;
        return data;
    },

    async delete(clientId: string) {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', clientId);
        if (error) throw error;
        return true;
    },

    async getStats() {
        const { data, error } = await supabase.rpc('get_client_dashboard_stats');
        if (error) throw error;
        return data;
    },

    async create(clientData: any) {
        const { data, error } = await supabase
            .from('clients')
            .insert([{ ...clientData, id: crypto.randomUUID() }])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async addMeasurement(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_measurements')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async deleteMeasurement(measurementId: string) {
        const { error } = await supabase
            .from('client_measurements')
            .delete()
            .eq('id', measurementId);
        if (error) throw error;
        return true;
    },

    // Diary (Food Log) service
    async getDiary(clientId: string, date: string) {
        const { data, error } = await supabase
            .from('client_diary_entries')
            .select('*')
            .eq('client_id', clientId)
            .eq('date', date);
        if (error) throw error;
        return data;
    },

    async addDiaryEntry(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_diary_entries')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async updateDiaryEntry(entryId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_diary_entries')
            .update(data)
            .eq('id', entryId)
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async deleteDiaryEntry(entryId: string) {
        const { error } = await supabase
            .from('client_diary_entries')
            .delete()
            .eq('id', entryId);
        if (error) throw error;
        return true;
    },

    // Medical CRM
    async getMedicalConditions(clientId: string) {
        const { data, error } = await supabase
            .from('client_medical_conditions')
            .select('*')
            .eq('client_id', clientId);
        if (error) throw error;
        return data;
    },

    async addMedicalCondition(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_medical_conditions')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async deleteMedicalCondition(id: string) {
        const { error } = await supabase
            .from('client_medical_conditions')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    },

    async getMedications(clientId: string) {
        const { data, error } = await supabase
            .from('client_medications')
            .select('*')
            .eq('client_id', clientId);
        if (error) throw error;
        return data;
    },

    async addMedication(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_medications')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async deleteMedication(id: string) {
        const { error } = await supabase
            .from('client_medications')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    },

    async getBloodTests(clientId: string) {
        const { data, error } = await supabase
            .from('client_blood_tests')
            .select('*')
            .eq('client_id', clientId)
            .order('date', { ascending: false });
        if (error) throw error;
        return data;
    },

    async addBloodTest(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_blood_tests')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async deleteBloodTest(id: string) {
        const { error } = await supabase
            .from('client_blood_tests')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    },

    // Strategy CRM (Goals & Prescriptions)
    async getGoals(clientId: string) {
        const { data, error } = await supabase
            .from('client_goals')
            .select('*')
            .eq('client_id', clientId)
            .order('start_date', { ascending: false });
        if (error) throw error;
        return data;
    },

    async createGoal(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_goals')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async updateGoal(goalId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_goals')
            .update(data)
            .eq('id', goalId)
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async getPrescriptions(clientId: string) {
        const { data, error } = await supabase
            .from('client_nutrition_prescriptions')
            .select('*')
            .eq('client_id', clientId)
            .order('start_date', { ascending: false });
        if (error) throw error;
        return data;
    },

    async createPrescription(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_nutrition_prescriptions')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async getProtocols(clientId: string) {
        const { data, error } = await supabase
            .from('client_protocols')
            .select('*')
            .eq('client_id', clientId);
        if (error) throw error;
        return data;
    },

    async addProtocol(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_protocols')
            .insert([{ ...data, client_id: clientId, id: crypto.randomUUID() }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async updateProtocol(protocolId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_protocols')
            .update(data)
            .eq('id', protocolId)
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async deleteProtocol(protocolId: string) {
        const { error } = await supabase
            .from('client_protocols')
            .delete()
            .eq('id', protocolId);
        if (error) throw error;
        return true;
    },

    // Tracking (Psych, Activity, Metabolic, Session)
    async addPsychCheckin(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_psychology_checkins')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async getPsychCheckins(clientId: string) {
        const { data, error } = await supabase
            .from('client_psychology_checkins')
            .select('*')
            .eq('client_id', clientId)
            .order('date', { ascending: false });
        if (error) throw error;
        return data;
    },

    async addActivityLog(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_activity_logs')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async getActivityLogs(clientId: string) {
        const { data, error } = await supabase
            .from('client_activity_logs')
            .select('*')
            .eq('client_id', clientId)
            .order('start_date', { ascending: false });
        if (error) throw error;
        return data;
    },

    async addMetabolicProfile(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_metabolic_profiles')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async getMetabolicProfiles(clientId: string) {
        const { data, error } = await supabase
            .from('client_metabolic_profiles')
            .select('*')
            .eq('client_id', clientId)
            .order('date', { ascending: false });
        if (error) throw error;
        return data;
    },

    async addSessionNote(clientId: string, data: any) {
        const { data: result, error } = await supabase
            .from('client_session_notes')
            .insert([{ ...data, client_id: clientId }])
            .select()
            .single();
        if (error) throw error;
        return result;
    },

    async getSessionNotes(clientId: string) {
        const { data, error } = await supabase
            .from('client_session_notes')
            .select('*')
            .eq('client_id', clientId)
            .order('date', { ascending: false });
        if (error) throw error;
        return data;
    },
};

export const foodService = {
    async list({ page = 0, pageSize = 10, search = '', categories = [] as string[] }) {
        let query = supabase
            .from('foods')
            .select('*', { count: 'exact' });

        if (search) {
            query = query.or(`name_he.ilike.%${search}%,name_en.ilike.%${search}%,barcode.eq.${search}`);
        }

        if (categories.length > 0) {
            const regularCategories = categories.filter(c => c !== 'ללא קטגוריה' && c !== 'Uncategorized');
            const hasUncategorized = categories.includes('ללא קטגוריה') || categories.includes('Uncategorized');

            if (hasUncategorized && regularCategories.length > 0) {
                const inList = `(${regularCategories.map(c => `"${c}"`).join(',')})`;
                query = query.or(`category.is.null,category.in.${inList}`);
            } else if (hasUncategorized) {
                query = query.is('category', null);
            } else {
                query = query.in('category', regularCategories);
            }
        }

        const { data, count, error } = await query
            .range(page * pageSize, (page + 1) * pageSize - 1)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, total: count || 0 };
    },

    async get(barcode: string) {
        const { data, error } = await supabase
            .from('foods')
            .select('*')
            .eq('barcode', barcode)
            .single();
        if (error) throw error;
        return data;
    },

    async getCategories() {
        const { data, error } = await supabase
            .from('foods')
            .select('category');

        if (error) throw error;

        const categoryCounts: Record<string, number> = {};
        data.forEach(p => {
            const cat = p.category || 'ללא קטגוריה';
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        return Object.entries(categoryCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    },

    async getStats() {
        const { count, error } = await supabase
            .from('foods')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;
        return { total: count || 0 };
    }
};

export const coachProgramService = {
    async list(coachId: string) {
        const { data, error } = await supabase
            .from('coach_programs')
            .select('*')
            .eq('coach_id', coachId)
            .order('created_at', { ascending: true });
        if (error) throw error;
        return data || [];
    },

    async create(coachId: string, program: any) {
        const { data, error } = await supabase
            .from('coach_programs')
            .insert([{
                coach_id: coachId,
                title: program.title,
                description: program.desc,
                duration: program.days,
                videos: program.videos,
                gradient: program.gradient,
                phases: program.phases,
                active_phase: program.activePhase || 0
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async delete(programId: string) {
        const { error } = await supabase
            .from('coach_programs')
            .delete()
            .eq('id', programId);
        if (error) throw error;
    }
};
