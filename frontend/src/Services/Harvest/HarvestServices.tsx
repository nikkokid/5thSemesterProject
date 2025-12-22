const baseUrl = "http://localhost:8081/api/v1/harvests"

export type HarvestView = {
    HarvestId: number;
    HarvestWeight: number;
    HarvestDate: string;
    GrapeRowName: string;
    NoOfVines: number;
    GrapeId: number;
    GrapeName: string;
}

export async function getHarvestsByGrapeIdAndYear(grapeId : number, year : number): Promise<HarvestView[]> {
    const response = await fetch(`${baseUrl}?grapeId=${grapeId}&year=${year}`)
    if (!response.ok) {
        throw new Error("Failed to fetch harvests");
    }
    return response.json();
};

export async function getHarvestsByGrapeId(grapeId : number): Promise<HarvestView[]> {
    const response = await fetch(`${baseUrl}?grapeId=${grapeId}`)
    if (!response.ok) {
        throw new Error("Failed to fetch harvests");
    }
    return response.json();
};

export async function deleteHarvestByHarvestId(harvestId : number): Promise<void> {
    const response = await fetch(`${baseUrl}?harvestId=${harvestId}`,
    {
        method: "DELETE",
    }
    );
    if(!response.ok) {
        throw new Error("Failed to delete harvest")
    }
};
