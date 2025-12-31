import type { TasteProfile } from "../TasteProfile/TasteProfileService";

export type Juice = {
  id: number;
  volume: number;
  pressedDate: string; 
  juiceTypeId: number; //1 pressed, 2 = unpressed;
  grapeId: number;
  tasteProfile?: TasteProfile[];
  //additives to be implemented 
};

export type CreateJuice = {
  pressedDate: string; 
  volume: number;
  juiceTypeId: number; //1 pressed, 2 = unpressed;
  grapeId: number;
}

const JUICE_API_URL = "http://localhost:8081/api/v1/juices"; 

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
}))

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
    body: JSON.stringify(data),
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

