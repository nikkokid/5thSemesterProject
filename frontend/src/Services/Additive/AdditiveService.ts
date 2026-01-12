import { baseUrl } from "../baseUrl";

const ADDITIVE_API_URL = `${baseUrl}/api/v1/Additives`;
//const ADDITIVE_API_URL = "http://localhost:8081/api/v1/Additives";

export type Additive = {
    id: number;
    name: string;
    amount: number;
    description: string;
    date: string;
}

//for write
export type CreateAdditive = {
    name: string;
    amount: number;
    description: string;
    date: string;
}


export async function createAdditiveForJuice(juiceId: number, data: CreateAdditive) {
    const res = await fetch(`${ADDITIVE_API_URL}/${juiceId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        AdditiveName: data.name,
        AdditiveAmount: data.amount,
        AdditiveDescription: data.description,
        AdditiveDate: data.date,
      }),
    });

    if (!res.ok) throw new Error("Failed to create additive.");
        return true;
}

export async function getAdditivesByJuiceId(juiceId: number): Promise<Additive[]> {
    const res = await fetch(`${ADDITIVE_API_URL}/${juiceId}`);
    if (!res.ok) throw new Error("Failed to fetch additives.");

    const data = await res.json();

    // Map PascalCase to camelCase
    return data.map((a: any) => ({
      id: a.AdditiveId,
      name: a.AdditiveName,
      amount: a.AdditiveAmount,
      description: a.AdditiveDescription,
      date: a.AdditiveDate,
    }));
}

export async function updateAdditiveById(additiveId: number, data: CreateAdditive) {
    const res = await fetch(`${ADDITIVE_API_URL}/${additiveId}`, {
      method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        AdditiveName: data.name,
        AdditiveAmount: data.amount,
        AdditiveDescription: data.description,
        AdditiveDate: data.date,
      }),
    });
    if (!res.ok) throw new Error("Failed to update additive.");
    return true;
}

export async function deleteAdditiveById(additiveId: number) {
    const res = await fetch(`${ADDITIVE_API_URL}/${additiveId}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete additive.");
    return true;
}
