export const API_BASE_URL = 'http://localhost:3001/v1';

export const coachService = {
    async list() {
        const response = await fetch(`${API_BASE_URL}/coach/list`);
        if (!response.ok) throw new Error('Failed to fetch coaches');
        return response.json();
    },

    async update(coachId: string, updates: any) {
        const response = await fetch(`${API_BASE_URL}/coach/${coachId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update coach');
        return response.json();
    }
};

export const clientService = {
    async list(coachId?: string) {
        const url = coachId ? `${API_BASE_URL}/client/list?coach_id=${coachId}` : `${API_BASE_URL}/client/list`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch clients');
        return response.json();
    },

    async get(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}`);
        if (!response.ok) throw new Error('Failed to fetch client');
        return response.json();
    },

    async update(clientId: string, clientData: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        });
        if (!response.ok) throw new Error('Failed to update client');
        return response.json();
    },

    async delete(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete client');
        return true;
    },

    async getStats() {
        const response = await fetch(`${API_BASE_URL}/client/stats`);
        if (!response.ok) throw new Error('Failed to fetch client stats');
        return response.json();
    },

    async create(clientData: any) {
        const response = await fetch(`${API_BASE_URL}/client/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        });
        if (!response.ok) throw new Error('Failed to create client');
        return response.json();
    },

    async addMeasurement(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/measurements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add measurement');
        return response.json();
    },

    async deleteMeasurement(measurementId: string) {
        const response = await fetch(`${API_BASE_URL}/client/measurements/${measurementId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete measurement');
        return true;
    },
    // Diary (Food Log) service
    async getDiary(clientId: string, date: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/diary?date=${date}`);
        if (!response.ok) throw new Error('Failed to fetch diary');
        return response.json();
    },
    async addDiaryEntry(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/diary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add diary entry');
        return response.json();
    },
    async updateDiaryEntry(entryId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/diary/${entryId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update diary entry');
        return response.json();
    },
    async deleteDiaryEntry(entryId: string) {
        const response = await fetch(`${API_BASE_URL}/client/diary/${entryId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete diary entry');
        return true;
    },

    // Medical CRM
    async getMedicalConditions(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/medical-conditions`);
        if (!response.ok) throw new Error('Failed to fetch medical conditions');
        return response.json();
    },
    async addMedicalCondition(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/medical-conditions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add medical condition');
        return response.json();
    },
    async deleteMedicalCondition(id: string) {
        const response = await fetch(`${API_BASE_URL}/client/medical-conditions/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete medical condition');
        return true;
    },

    async getMedications(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/medications`);
        if (!response.ok) throw new Error('Failed to fetch medications');
        return response.json();
    },
    async addMedication(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/medications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add medication');
        return response.json();
    },
    async deleteMedication(id: string) {
        const response = await fetch(`${API_BASE_URL}/client/medications/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete medication');
        return true;
    },

    async getBloodTests(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/blood-tests`);
        if (!response.ok) throw new Error('Failed to fetch blood tests');
        return response.json();
    },
    async addBloodTest(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/blood-tests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add blood test');
        return response.json();
    },
    async deleteBloodTest(id: string) {
        const response = await fetch(`${API_BASE_URL}/client/blood-tests/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete blood test');
        return true;
    },

    // Strategy CRM (Goals & Prescriptions)
    async getGoals(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/goals`);
        if (!response.ok) throw new Error('Failed to fetch goals');
        return response.json();
    },
    async createGoal(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/goals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create goal');
        return response.json();
    },
    async updateGoal(goalId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/goals/${goalId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update goal');
        return response.json();
    },

    async getPrescriptions(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/prescriptions`);
        if (!response.ok) throw new Error('Failed to fetch prescriptions');
        return response.json();
    },
    async createPrescription(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/prescriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create prescription');
        return response.json();
    },

    async getProtocols(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/protocols`);
        if (!response.ok) throw new Error('Failed to fetch protocols');
        return response.json();
    },
    async addProtocol(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/protocols`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add protocol');
        return response.json();
    },
    async updateProtocol(protocolId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/protocols/${protocolId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update protocol');
        return response.json();
    },
    async deleteProtocol(protocolId: string) {
        const response = await fetch(`${API_BASE_URL}/client/protocols/${protocolId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete protocol');
        return true;
    },

    // Tracking (Psych, Activity, Metabolic, Session)
    async addPsychCheckin(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/psychology`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add psych checkin');
        return response.json();
    },
    async getPsychCheckins(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/psychology`);
        if (!response.ok) throw new Error('Failed to fetch psych checkins');
        return response.json();
    },

    async addActivityLog(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/activity`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add activity log');
        return response.json();
    },
    async getActivityLogs(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/activity`);
        if (!response.ok) throw new Error('Failed to fetch activity logs');
        return response.json();
    },

    async addMetabolicProfile(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/metabolic`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add metabolic profile');
        return response.json();
    },
    async getMetabolicProfiles(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/metabolic`);
        if (!response.ok) throw new Error('Failed to fetch metabolic profiles');
        return response.json();
    },

    async addSessionNote(clientId: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/session-notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to add session note');
        return response.json();
    },
    async getSessionNotes(clientId: string) {
        const response = await fetch(`${API_BASE_URL}/client/${clientId}/session-notes`);
        if (!response.ok) throw new Error('Failed to fetch session notes');
        return response.json();
    },
};
