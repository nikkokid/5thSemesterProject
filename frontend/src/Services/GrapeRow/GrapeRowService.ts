//const baseUrl = "http://localhost:8081/api/v1/GrapeRows"
const url = import.meta.env.VITE_API_BASE_URL; 
const baseUrl = `${url}/api/v1/GrapeRows`;


export type GrapeRow = {
    GrapeRowId : number;
    GrapeRowName : string;
    LengthOfRow : number;
    DistanceBetweenVines : number;
    DistanceToNextRow : number;
}

export type GrapeRowDTO = {
    GrapeRowName : string;
    LengthOfRow : number;
    DistanceBetweenVines : number;
    DistanceToNextRow : number;
}

export async function getAllGrapeRows() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch grape rows");
    }
    return response.json();
};

export async function getGrapeRowByGrapeRowId(grapeRowId : number) {
    const response = await fetch(`${baseUrl}?grapeRowId=${grapeRowId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch grape row by grape row id");
    }
    return response.json();
};

export async function createGrapeRow(grapeRow : GrapeRowDTO) {
    const response = await fetch(`${baseUrl}`,
        {
            method: "POST",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(grapeRow)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to create GrapeRow");
    }
};

export async function updateGrapeRow(grapeRow : GrapeRowDTO, grapeRowId : number) {
    const response = await fetch(`${baseUrl}?grapeRowId=${grapeRowId}`,
        {
            method: "PATCH",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(grapeRow)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update GrapeRow");
    }
};

export async function deleteGrapeRow(grapeRowId : number) {
    const response = await fetch(`${baseUrl}?grapeRowId=${grapeRowId}`,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw new Error("Failed to delete GrapeRow");
    }
};