//my own stub
export type Grape = {
    id: number;
    name: string;
    date: string;
};

const GRAPE_API_URL = "/api/v1/Grapes";

export async function getAllGrapeTypes(): Promise<Grape[]> {
  const res = await fetch(GRAPE_API_URL); //altid prøv fang
  if(res.ok){
  return res.json();
  }
  else{
    throw new Error("Failed to fetch grapes.")
  }
}

export async function getGrapeById(id: number): Promise<Grape> {
  const res = await fetch(`${GRAPE_API_URL}/${id}`);
  if(res.ok){
  return res.json();
  }
  else{
    throw new Error("Failed to fetch grape with id: " + id)
  }
}

  