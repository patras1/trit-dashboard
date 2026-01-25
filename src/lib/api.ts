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
    }
};
