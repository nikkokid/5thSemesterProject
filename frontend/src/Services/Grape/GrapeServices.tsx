import { baseUrl } from "../baseUrl";

const GRAPE_API_URL = `${baseUrl}/api/v1/grapes`;


//const baseUrl = 'http://localhost:8081/api/v1/grapes';

export type Grape = {
  GrapeId: number;
  GrapeName: string;
};

export async function fetchGrapes(): Promise<Grape[]> {
    const response = await fetch(GRAPE_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch grapes');
    }
    return response.json();
}
export async function fetchGrapeById(GrapeId: number): Promise<Grape> {
    const response = await fetch(`${GRAPE_API_URL}/${GrapeId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch grape with id ${GrapeId}`);
    }
    return response.json();
}

export async function createGrape(grapeData: { grapeName: string }): Promise<void> {
    const response = await fetch(GRAPE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            GrapeName: grapeData.grapeName,
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to create grape');
    }
    return;
}
export async function updateGrapeById(grapeData: { GrapeId: number; GrapeName: string }): Promise<void> {
    const response = await fetch(`${GRAPE_API_URL}/${grapeData.GrapeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            GrapeName: grapeData.GrapeName,
        }),
    });
    if (!response.ok) {
        throw new Error(`Failed to update grape with id ${grapeData.GrapeId}`);
    }
    return;
}
export async function deleteGrapeById(GrapeId: number): Promise<void> {
    const response = await fetch(`${GRAPE_API_URL}/${GrapeId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete grape with id ${GrapeId}`);
    }
    return;
}