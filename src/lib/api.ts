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
