const baseUrl = "http://localhost:8081/api/v1/AdditiveLines"

export type AdditiveLine = {
    AdditiveLineId : number,
    AdditiveId : number,
    JuiceId : number,
    AdditiveAmount : number,
    AdditiveDate : string
}

export type AdditiveLineDTO = {
    AdditiveId : number,
    JuiceId : number,
    AdditiveAmount : number,
    AdditiveDate : string
}

export async function getAllAdditiveLines() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch AdditiveLines");
    }
    return response.json();
};

export async function getAdditiveLineByAdditiveLineId(additiveLineId : number) {
    const response = await fetch(`${baseUrl}?additiveLineId=${additiveLineId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch AdditiveLine by AdditiveLineId");
    }
    return response.json();
};

export async function getAdditiveLinesByJuiceId(juiceId : number) {
    const response = await fetch(`${baseUrl}/GetAdditiveLinesByJuiceId?juiceId=${juiceId}`);
    if (!response.ok) {
        throw new Error("Failed to AdditiveLines by JuiceId");
    }
    return response.json();
};

export async function createAdditiveLine(additiveLine : AdditiveLineDTO) {
    const response = await fetch(`${baseUrl}`,
        {
            method: "POST",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(additiveLine)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to create AdditiveLine");
    }
};

export async function updateAdditiveLine(additiveLine : AdditiveLineDTO, additiveLineId : number) {
    const response = await fetch(`${baseUrl}?additiveLineId=${additiveLineId}`,
        {
            method: "PATCH",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(additiveLine)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update AdditiveLine");
    }
};

export async function deleteAdditiveLine(additiveLineId : number) {
    const response = await fetch(`${baseUrl}?additiveLineId=${additiveLineId}`,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw new Error("Failed to delete AdditiveLine");
    }
};