//const baseUrl = "http://localhost:8081/api/v1/Harvests"
const url = import.meta.env.VITE_API_BASE_URL; 
const baseUrl = `${url}/api/v1/Harvests`;


export type Harvest = {
    HarvestId: number;
    HarvestWeight: number;
    HarvestDate: string;
    GrapeRowId: number;
    GrapeId: number;
}

export type HarvestDTO = {
    HarvestWeight: number;
    HarvestDate: string;
    GrapeRowId: number;
    GrapeId: number;
}

export async function getHarvestsByGrapeIdAndYear(grapeId : number, year : number): Promise<Harvest[]> {
    const response = await fetch(`${baseUrl}?grapeId=${grapeId}&year=${year}`)
    if (!response.ok) {
        throw new Error("Failed to fetch harvests");
    }
    return response.json();
};

export async function getHarvestsByGrapeId(grapeId : number): Promise<Harvest[]> {
    const response = await fetch(`${baseUrl}?grapeId=${grapeId}`)
    if (!response.ok) {
        throw new Error("Failed to fetch harvests");
    }
    return response.json();
};

export async function deleteHarvestByHarvestId(harvestId : number){
    const response = await fetch(`${baseUrl}?harvestId=${harvestId}`,
        {
            method: "DELETE",
        }
    );
    if(!response.ok) {
        throw new Error("Failed to delete harvest")
    }
};

export async function updateHarvestByHarvestId(harvestId : number, harvest : HarvestDTO): Promise<void> {
    const response = await fetch(`${baseUrl}?harvestId=${harvestId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(harvest)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update harvest");
    }
};

export async function createHarvest(harvest : HarvestDTO) {
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
