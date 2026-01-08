const baseUrl = "http://localhost:8081/api/v1/AdditivesV2"

export type AdditiveV2 = {
    AdditiveId : number,
    AdditiveName : string,
    AdditiveDescription : string,
    AdditiveURL : string
}

export type AdditiveDTOV2 = {
    AdditiveName : string,
    AdditiveDescription : string,
    AdditiveURL : string
}

export async function getAllAdditivesV2() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch Additives");
    }
    return response.json();
};

export async function getAdditiveByAdditiveIdV2(additiveId : number) {
    const response = await fetch(`${baseUrl}?additiveId=${additiveId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch Additive by AdditiveId");
    }
    return response.json();
};

export async function createAdditiveV2(additive : AdditiveDTOV2) {
    const response = await fetch(`${baseUrl}`,
        {
            method: "POST",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(additive)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to create Additive");
    }
};

export async function updateAdditiveV2(additive : AdditiveDTOV2, additiveId : number) {
    const response = await fetch(`${baseUrl}?additiveId=${additiveId}`,
        {
            method: "PATCH",
            headers: {
                "CONTENT-TYPE" : "application/json"
            },
            body: JSON.stringify(additive)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update Additive");
    }
};

export async function deleteAdditiveV2(additiveId : number) {
    const response = await fetch(`${baseUrl}?additiveId=${additiveId}`,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw new Error("Failed to delete Additive");
    }
};