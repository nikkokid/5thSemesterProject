//const baseUrl = "http://localhost:8081/api/v1/Plantings"
const url = import.meta.env.VITE_API_BASE_URL; 
const baseUrl = `${url}/api/v1/Plantings`;


export type Planting = {
    PlantingId : number;
    NumberOfVinesPlanted : number;
    NumberOfVinesDead : number;
    PlantingDate : string;
    GrapeRowId : number;
    GrapeId : number;
}

export type PlantingDTO = {
    NumberOfVinesPlanted : number;
    NumberOfVinesDead : number;
    PlantingDate : string;
    GrapeRowId : number;
    GrapeId : number;
}

export async function getAllPlantings() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch plantings");
    }
    return response.json();
};

export async function getPlantingsByGrapeRowId(grapeRowId : number) {
    const response = await fetch(`${baseUrl}/GetPlantingsByGrapeRowId?grapeRowId=${grapeRowId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch plantings by grape row id");
    }
    return response.json();
};

export async function getPlantingByPlantingId(plantingId : number) {
    const response = await fetch(`${baseUrl}/?plantingId=${plantingId}`);
    if (!response.ok){
        throw new Error("Failed to fetch plantings by planting id");
    }
    return response.json();
};

export async function createPlanting(planting : PlantingDTO) {
    const response = await fetch(`${baseUrl}`,
        {
            method: "POST",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(planting)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to create Planting")
    }
};

export async function updatePlanting(planting : PlantingDTO, plantingId : number) {
    const response = await fetch(`${baseUrl}?plantingId=${plantingId}`,
        {
            method: "PATCH",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(planting)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update Planting");
    }
};

export async function deletePlanting(plantingId : number) {
    const response = await fetch(`${baseUrl}?plantingId=${plantingId}`,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw new Error("Failed to delete Planting")
    }
}