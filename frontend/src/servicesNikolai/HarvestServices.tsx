const baseUrl = "http://localhost:8081/api/v1/harvests"

export type Harvest = {
    id: number;
    weight: number;
    date: string;
}

export async function getHarvests(): Promise<Harvest[]> {
    const response = await fetch(baseUrl)
    return response.json();
};