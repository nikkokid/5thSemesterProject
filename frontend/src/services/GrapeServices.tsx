const baseUrl = 'http://localhost:8081/api/grapes';

export type Grape = {
  id: number;
  name: string;
};

export async function fetchGrapes(): Promise<Grape[]> {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch grapes');
    }
    return response.json();
}
export async function fetchGrapeById(id: number): Promise<Grape> {
    const response = await fetch(`${baseUrl}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch grape with id ${id}`);
    }
    return response.json();
}