const baseUrl = 'http://localhost:8081/api/v1/wines';

export type Wine = {
  WineId: number;
  WineName: string;
  VintageYear: number;
};

export type WineDTO = {
  WineName: string;
  VintageYear: number;
  Juices: { JuiceId: number; Percentage: number }[];
};

export type WineDetail = {
  WineId: number;
  WineName: string;
  VintageYear: number;
  GrapeId: number;
  GrapeName: string;
  JuiceId: number;
  JuiceVolume: number;
  WineJuicePercentage: number;
  PressedDate: string;
};

export async function fetchWines(): Promise<Wine[]> {
    const response = await fetch(baseUrl); 
    if (!response.ok) {
        throw new Error('Failed to fetch wines');
    }
    return response.json();
}

export async function fetchWineById(WineId: number): Promise<WineDetail[]> {
    const response = await fetch(`${baseUrl}/${WineId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch wine with id ${WineId}`);
    }
    return response.json();
}

export async function createWine(wineData: WineDTO): Promise<number> {
    const response = await fetch(baseUrl, {
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