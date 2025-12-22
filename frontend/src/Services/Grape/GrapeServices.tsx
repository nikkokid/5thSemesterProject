const baseUrl = 'http://localhost:8081/api/v1/grapes';

export type Grape = {
  GrapeId: number;
  GrapeName: string;
};

export async function fetchGrapes(): Promise<Grape[]> {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch grapes');
    }
    return response.json();
}
export async function fetchGrapeById(GrapeId: number): Promise<Grape> {
    const response = await fetch(`${baseUrl}/${GrapeId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch grape with id ${GrapeId}`);
    }
    return response.json();
}