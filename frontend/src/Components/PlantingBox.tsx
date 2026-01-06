import { useState} from "react";
import { deletePlanting, updatePlanting, type Planting, type PlantingDTO } from "../Services/Planting/PlantingService";

type PlantingBoxProps = {
    planting : Planting,
    setReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>,
    grapes: Record<number, string>
    };


export default function PlantingBox({planting, grapes, setReloadNeeded} : PlantingBoxProps) {
    const [editingPlanting, setEditingPlanting] = useState(false);

    function handleSubmit (formData : any){
        let plantingTemp : PlantingDTO = {
            NumberOfVinesPlanted: formData.get("submittedNumberOfVinesPlanted"),
            NumberOfVinesDead: formData.get("submittedNumberOfVinesDead"),
            PlantingDate: formData.get("submittedPlantingDate"),
            GrapeRowId: planting.GrapeRowId,
            GrapeId: formData.get("submittedGrapeId")
        };
        updatePlanting(plantingTemp, planting.PlantingId);
        setEditingPlanting(false);
        setReloadNeeded(true);
    }

    function handleDelete (plantingId : number) {
        deletePlanting(plantingId)
        setEditingPlanting(false);
        setReloadNeeded(true);
    }

    if (!editingPlanting) {
        return(
            <div>
                <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                    <h2>Plantning {planting.PlantingId}</h2>
                    <button onClick={() => setEditingPlanting(true)}>Rediger plantning</button>
                    <p>Drue: {grapes[planting.GrapeId]}</p>
                    <p>Plantede stokke: {planting.NumberOfVinesPlanted}</p>
                    <p>Døde stokke: {planting.NumberOfVinesDead}</p>
                    <p>Plantet: {planting.PlantingDate}</p>
                </div>
            </div>
        )
    }

    return(
        <form action={handleSubmit}>
            <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                <h2>Plantning: {planting.PlantingId}</h2>
                <button className="bg-green-300!" type="submit"> Gem Ændringer</button>
                <p className="py-1">
                    Drue: 
                    <select className="bg-white" name="submittedGrapeId" defaultValue={planting.GrapeId}>
                        {Object.entries(grapes).map(([grapeId, grapeName]) => (
                            <option value={grapeId}>{grapeName}</option>
                        ))}
                    </select>
                </p>
                <p>Plantede stokke: <input min="0" max="99999" name="submittedNumberOfVinesPlanted" type="number" defaultValue={planting.NumberOfVinesPlanted} /></p>
                <p>Døde stokke: <input min="0" max="99999" name="submittedNumberOfVinesDead" type="number" defaultValue={planting.NumberOfVinesDead} /> kg</p>
                <p>Plantet: <input min="0" name="submittedPlantingDate" type="date" defaultValue={planting.PlantingDate} /></p>
                <button className="bg-red-300!" onClick={() => handleDelete(planting.PlantingId)}>Slet høst</button>
            </div>
        </form>
    )

}