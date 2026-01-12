import type { TasteProfile } from "../TasteProfile/TasteProfileService";
import type { Additive } from "../Additive/AdditiveService";

export type Juice = {
  id: number;
  volume: number;
  pressedDate: string; 
  juiceTypeId: number; //1 pressed, 2 = unpressed;
  grapeId: number;
  tasteProfile?: TasteProfile[];
  additive?: Additive[]; 
};

export type CreateJuice = {
  pressedDate: string; 
  volume: number;
  juiceTypeId: number; //1 pressed, 2 = unpressed;
  grapeId: number;
}

//const JUICE_API_URL = "http://localhost:8081/api/v1/juices"; 
const url = import.meta.env.VITE_API_BASE_URL; 
const JUICE_API_URL = `${url}/api/v1/juices`;

export async function createJuice(data: CreateJuice) {
  const res = await fetch(`${JUICE_API_URL}/${data.grapeId}/Juice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) { 
    throw new Error("Failed to create juice.");
  }
  
  return true;
}

export async function getJuicesByGrapeIdAndYear(grapeId: number, year: number): Promise<Juice[]> {
  const res = await fetch(`${JUICE_API_URL}/${grapeId}/${year}`);
  
  if(!res.ok) throw new Error("Failed to fetch juice.");

  const data = await res.json();

  // Map PascalCase to camelCase
  return data.map((j: any) => ({
    id: j.JuiceId,
    volume: j.Volume,
    pressedDate: j.PressedDate,
    juiceTypeId: j.JuiceTypeId,
    grapeId: j.GrapeId,
    tasteProfile: j.TasteProfiles?.map((t: any) => ({
      id: t.TasteProfileId,
      sweetness: t.Sweetness,
      acidity: t.Acidity,
      aroma: t.Aroma,
      dryness: t.Dryness,
      color: t.Color,
      rating: t.Rating,
      description: t.TasteProfileDescription,
      date: t.TasteProfileDate,
    })),
    additive: j.Additives?.map((a: any) => ({
      id: a.AdditiveId,
      name: a.AdditiveName,
      amount: a.AdditiveAmount,
      description: a.AdditiveDescription,
      date: a.AdditiveDate,
    })),

  }));
    
}


//Possibly not used
export async function getJuiceById(id: number): Promise<Juice> {
  const res = await fetch(`${JUICE_API_URL}/${id}`);
  if(res.ok){
  return res.json();
  }
  else{
    throw new Error("Failed to fetch juice.")
  }
}

export async function updateJuiceById(
  id: number,
  data: CreateJuice
) {
  const res = await fetch(`${JUICE_API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      PressedDate: data.pressedDate,
      Volume: data.volume
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update juice.");
  }

  return true;
}



export async function deleteJuiceById(id: number) {
  const res = await fetch(`${JUICE_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete juice.");
  }
  return true;
}



export async function fetchJuicesByGrapes(grapeIds: number[]): Promise<Juice[]> {
  const query = grapeIds.map(id => `grapeIds=${id}`).join('&');
  const response = await fetch(`${JUICE_API_URL}/?${query}`);
  if (!response.ok) {
    console.error('Error response:', response.statusText);
    throw new Error('Failed to fetch juices');
  }
  const data = await response.json();

  // Map PascalCase to camelCase
  return data.map((j: any) => ({
    id: j.JuiceId,
    volume: j.Volume,
    pressedDate: j.PressedDate,
    juiceTypeId: j.JuiceTypeId,
    grapeId: j.GrapeId,
    tasteProfile: j.TasteProfiles?.map((t: any) => ({
      id: t.Id,
      sweetness: t.Sweetness,
      acidity: t.Acidity,
      aroma: t.Aroma,
      dryness: t.Dryness,
      color: t.Color,
      description: t.Description,
      rating: t.Rating,
      date: t.Date,
    })) || [],
  }));
}