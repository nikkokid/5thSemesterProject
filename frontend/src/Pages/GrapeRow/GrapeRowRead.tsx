import { useNavigate, useParams } from "react-router-dom";
import { getPlantingsByGrapeRowId, type Planting } from "../../Services/Planting/PlantingService";
import { useEffect, useState } from "react";
import PlantingBox from "../../Components/PlantingBox";
import { deleteGrapeRow, getGrapeRowByGrapeRowId, updateGrapeRow, type GrapeRow, type GrapeRowDTO } from "../../Services/GrapeRow/GrapeRowService";
import GrapeRowOverall from "../../Components/GrapeRowOverall";
import PlantingBoxCreate from "../../Components/PlantingBoxCreate";
import { fetchGrapes } from "../../Services/Grape/GrapeServices";

export default function GrapeRowRead () {
    const navigate = useNavigate();
    let {grapeRowId} = useParams();
    const selectedGrapeRowId = Number(grapeRowId)
    const [selectedGrapeRowsPlantings, setSelectedGrapeRowsPlantings] = useState<Planting[]>([]);
    const [selectedGrapeRow, setSelectedGrapeRow] = useState<GrapeRow[]>([]);
    const [editingGrapeRow, setEditingGrapeRow] = useState(false);
    const [reloadNeeded, setReloadNeeded] = useState(false);
    const [grapes, setGrapes] = useState<Record<number, string>>({});


    async function loadSelectedGrapeRow() {
        const data = await getGrapeRowByGrapeRowId(selectedGrapeRowId);
        setSelectedGrapeRow(data);
    }

    async function loadSelectedGrapeRowsPlantings() {
        const data = await getPlantingsByGrapeRowId(selectedGrapeRowId);
        setSelectedGrapeRowsPlantings(data);
    }

    async function loadGrapes() {
        const grapeDict: Record<number, string> = {};
        const allGrapes = await fetchGrapes()
        
        for (const grape of allGrapes) {
            grapeDict[grape.GrapeId] = grape.GrapeName
        }
        setGrapes(grapeDict);
    }

    useEffect(() => {
        loadSelectedGrapeRow();
        loadSelectedGrapeRowsPlantings();
        setReloadNeeded(false);
        loadGrapes()
    }, [selectedGrapeRowId, reloadNeeded])

    function handleSubmit (formData : any) {
        let grapeRowTemp : GrapeRowDTO = {
            GrapeRowName: formData.get("submittedGrapeRowName"),
            LengthOfRow: formData.get("submittedLengthOfRow"),
            DistanceBetweenVines: formData.get("submittedDistanceBetweenVines"),
            DistanceToNextRow: formData.get("submittedDistanceToNextRow")
        };
        updateGrapeRow(grapeRowTemp, selectedGrapeRowId);
        setEditingGrapeRow(false);
        setReloadNeeded(true);
    }

    function handleDelete () {
        deleteGrapeRow(selectedGrapeRowId);
        navigate(`/grape-row`)
    }

    if(!editingGrapeRow) {
        return (
            <div>
                <div className="flex flex-wrap justify-evenly">
                    <h1>{selectedGrapeRow[0]?.GrapeRowName}</h1>
                    <button onClick={() => setEditingGrapeRow(true)}>Rediger Række</button>
                </div>
                <div>
                    <GrapeRowOverall selectedGrapeRowsPlantings={selectedGrapeRowsPlantings} selectedGrapeRow={selectedGrapeRow[0]} grapes={grapes}/>
                </div>
                <div className="flex flex-wrap gap-2">
                    <PlantingBoxCreate grapeRowId={selectedGrapeRowId} setReloadNeeded={setReloadNeeded} grapes={grapes}/>
                    {selectedGrapeRowsPlantings.map(planting => 
                        <div key={planting.PlantingId}>
                            <PlantingBox planting={planting} setReloadNeeded={setReloadNeeded} grapes={grapes}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return(
        <form action={handleSubmit}>
            <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                <h2 className="text-center">Du er nu ved at ændre {selectedGrapeRow[0]?.GrapeRowName}</h2>
                <p>Rækkens navn: <input className="bg-white" name="submittedGrapeRowName" type="text" defaultValue={selectedGrapeRow[0].GrapeRowName}/></p>
                <p>Rækkens længde: <input className="bg-white" min="0" max="99999" name="submittedLengthOfRow" type="number" defaultValue={selectedGrapeRow[0].LengthOfRow}/> m</p>
                <p>Afstand mellem stokke: <input className="bg-white" min="0" max="99999" name="submittedDistanceBetweenVines" type="number" defaultValue={selectedGrapeRow[0].DistanceBetweenVines}/> m</p>
                <p>Afstand til andre rækker: <input className="bg-white" min="0" max="99999" name="submittedDistanceToNextRow" type="number" defaultValue={selectedGrapeRow[0].DistanceToNextRow}/> m</p>
                <div className="flex flex-wrap justify-evenly">
                    <button onClick={() => setEditingGrapeRow(false) }>Gå tilbage</button>
                    <button className="bg-red-300!" onClick={() => handleDelete()}>Slet Række</button>
                    <button className="bg-green-300!" type="submit">Gem Ændringer</button>
                </div>
            </div>
        </form>
    )

}