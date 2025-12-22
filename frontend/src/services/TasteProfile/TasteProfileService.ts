
//for read
export type TasteProfile = {
    id: number;
    sweetness: number;
    acidity: number;
    aroma: number;
    dryness: number;
    color: number;
    description: string;
    rating: number;
    date: string;
}

//for create
export type CreateTasteProfile = {
    sweetness: number;
    acidity: number;
    aroma: number;
    dryness: number;
    color: number;
    description: string;
    rating: number;
    date: string;
}

const TASTEPROFILE_API_URL = "http://localhost:8081/api/v1/TasteProfiles";


export async function getTasteProfileByJuiceId(juiceId: number): Promise<TasteProfile[]> {
  const res = await fetch(`${TASTEPROFILE_API_URL}/${juiceId}`);
  if (!res.ok) throw new Error("Failed to fetch taste profile.");

  const data = await res.json();

  // Map PascalCase to camelCase
  return data.map((t: any) => ({
    id: t.Id,
    sweetness: t.Sweetness,
    acidity: t.Acidity,
    aroma: t.Aroma,
    dryness: t.Dryness,
    color: t.Color,
    description: t.Description,
    rating: t.Rating,
    date: t.Date,
  }));
}

export async function createTasteProfileForJuice(
  juiceId: number,
  data: CreateTasteProfile
) {
  const res = await fetch(
    `${TASTEPROFILE_API_URL}/${juiceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",},
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create taste profile.");
  }

  return true; 
}

export async function editTasteProfile(
  tasteProfileId: number,
  data: CreateTasteProfile
) {
    const res = await fetch(`${TASTEPROFILE_API_URL}/${tasteProfileId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    if(!res.ok) {
      throw new Error("Failed to update taste profile.")
    }
    return true;

  }


export async function deleteTasteProfile(
  tasteProfileId: number,
) {
  const res = await fetch(
    `${TASTEPROFILE_API_URL}/${tasteProfileId}`,{
      method: "DELETE"
    }
  );
  if (!res.ok) {
    throw new Error("Failed to delete taste profile.");
  }
  return true;
}