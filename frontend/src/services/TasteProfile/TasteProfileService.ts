

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
    rating: number;
    description: string;
    date: string;
}

const TASTEPROFILE_API_URL = "http://localhost:8081/api/v1/TasteProfiles";

export async function createTasteProfileForJuice(juiceId: number, data: CreateTasteProfile) {
const res = await fetch(`${TASTEPROFILE_API_URL}/${juiceId}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    Sweetness: data.sweetness,
    Acidity: data.acidity,
    Aroma: data.aroma,
    Dryness: data.dryness,
    Color: data.color,
    TasteProfileDescription: data.description,
    Rating: data.rating,
    TasteProfileDate: data.date,
  }),
});

if (!res.ok) throw new Error("Failed to create taste profile.");
return true;
}

  export async function getTasteProfileByJuiceId(juiceId: number): Promise<TasteProfile[]> {
    const res = await fetch(`${TASTEPROFILE_API_URL}/${juiceId}`);
    if (!res.ok) throw new Error("Failed to fetch taste profile.");

    const data = await res.json();

    // Map PascalCase to camelCase
    return data.map((t: any) => ({
      id: t.TasteProfileId,
      sweetness: t.Sweetness,
      acidity: t.Acidity,
      aroma: t.Aroma,
      dryness: t.Dryness,
      color: t.Color,
      description: t.TasteProfileDescription,
      rating: t.Rating,
      date: t.TasteProfileDate,
    }));
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
      body: JSON.stringify({
        Sweetness: data.sweetness,
        Acidity: data.acidity,
        Aroma: data.aroma,
        Dryness: data.dryness,
        Color: data.color,
        TasteProfileDescription: data.description,
        Rating: data.rating,
        TasteProfileDate: data.date,
      })
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

