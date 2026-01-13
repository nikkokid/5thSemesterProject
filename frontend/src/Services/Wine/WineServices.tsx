import { baseUrl } from "../baseUrl";

const WINE_API_URL = `${baseUrl}/api/v1/wines`;

//const baseUrl = 'http://localhost:8081/api/v1/wines';

export type Wine = {
  WineId: number;
  WineName: string;
  VintageYear: number;
};

export type WineDTO = {
  WineName: string;
  VintageYear: number;
  Juices: { JuiceId: number; VolumeUsed: number;}[];
};

export type WineDetail = {
  WineId: number;
  WineName: string;
  VintageYear: number;
  GrapeId: number;
  GrapeName: string;
  JuiceId: number;
  VolumeUsed: number;
  Percentage: number;
  PressedDate: string;
};

export async function fetchWines(): Promise<Wine[]> {
    const response = await fetch(WINE_API_URL); 
    if (!response.ok) {
        throw new Error('Failed to fetch wines');
    }
    return response.json();
}

export async function fetchWineById(WineId: number): Promise<WineDetail[]> {
    const response = await fetch(`${WINE_API_URL}/${WineId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch wine with id ${WineId}`);
    }
    return response.json();
}

export async function createWine(wineData: WineDTO): Promise<number> {
    const response = await fetch(WINE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(wineData),
    });
    if (!response.ok) {
        throw new Error('Failed to create wine');
    }
    const responseData = await response.json();
    return responseData.wineId;
}
export async function updateWine(wineId: number, wineDTO: WineDTO): Promise<void> {
  const res = await fetch(`${WINE_API_URL}/${wineId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wineDTO),
  });
  if (!res.ok) { throw new Error("Failed to update wine with id " + wineId);
  }
  return;
}

export async function deleteWine(wineId: number): Promise<void> {
  const res = await fetch(`${WINE_API_URL}/${wineId}`, {
    method: "DELETE",
  });
  if (!res.ok) { throw new Error("Failed to delete wine with id " + wineId);
  }
  return;
}
