import { baseUrl } from "../baseUrl";

const GRAPEROW_API_URL = `${baseUrl}/api/v1/GrapeRows`;


//const baseUrl = "http://localhost:8081/api/v1/GrapeRows"

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
    const response = await fetch(GRAPEROW_API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch grape rows");
    }
    return response.json();
};

export async function getGrapeRowByGrapeRowId(grapeRowId : number) {
    const response = await fetch(`${GRAPEROW_API_URL}?grapeRowId=${grapeRowId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch grape row by grape row id");
    }
    return response.json();
};

export async function createGrapeRow(grapeRow : GrapeRowDTO) {
    const response = await fetch(`${GRAPEROW_API_URL}`,
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
    const response = await fetch(`${GRAPEROW_API_URL}?grapeRowId=${grapeRowId}`,
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
    const response = await fetch(`${GRAPEROW_API_URL}?grapeRowId=${grapeRowId}`,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw new Error("Failed to delete GrapeRow");
    }
};