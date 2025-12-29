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

export type Harvest = {
    HarvestWeight: number;
    HarvestDate: string;
    GrapeRowId: number;
    GrapeId: number;
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

export async function updateHarvestByHarvestId(harvestId : number, harvest : Harvest): Promise<void> {
    const response = await fetch(`${baseUrl}?harvestId=${harvestId}`,
        {
            method: "PATCH",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(harvest)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update harvest");
    }
};

export async function createHarvest(harvest : Harvest): Promise<void> {
    const response = await fetch(`${baseUrl}`,
        {
            method: "POST",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(harvest)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to create harvest");
    }
};
