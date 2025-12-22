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

const JUICE_API_URL = "http://localhost:8081/api/v1/juices"; 




export async function getJuicesByGrapeId(grapeId: number): Promise<Juice[]> {
  const res = await fetch(`${JUICE_API_URL}/Grape/${grapeId}/Juices`);
  
  if(!res.ok) throw new Error("Failed to fetch juice.");

  const data = await res.json();

  // Map PascalCase to camelCase
  return data.map((j: any) => ({
    id: j.Id,
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