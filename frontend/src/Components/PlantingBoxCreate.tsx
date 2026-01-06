import { useState } from "react";
import { createPlanting, type PlantingDTO } from "../services/Planting/PlantingService";

type PlantingBoxCreateProps = {
    grapeRowId: number,
    setReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>,
    grapes: Record<number, string>
};

export default function PlantingBoxCreate({grapeRowId, setReloadNeeded, grapes} : PlantingBoxCreateProps) {
    const [creatingPlanting, setCreatingPlanting] = useState(false);

    function handleSubmit (formData : any) {
        let plantingTemp : PlantingDTO = {
            NumberOfVinesPlanted: formData.get("submittedNumberOfVinesPlanted"),
            NumberOfVinesDead: formData.get("submittedNumberOfVinesDead"),
            PlantingDate: formData.get("submittedPlantingDate"),
            GrapeRowId: grapeRowId,
            GrapeId: formData.get("submittedGrapeId")
        };
        createPlanting(plantingTemp);
        setCreatingPlanting(false);
        setReloadNeeded(true);
    }

    if(!creatingPlanting){
        return(
            <div className="flex flex-col justify-center p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                <button onClick={() => setCreatingPlanting(true)}>Opret Plantning</button>
            </div>
        )
    }
    return(
        <form action={handleSubmit}>
            <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                <button className="bg-red-300!" onClick={() => setCreatingPlanting(false)}>Annuller</button>
                <p className="py-1">
                    Drue: 
                    <select className="bg-white" name="submittedGrapeId">
                        {Object.entries(grapes).map(([grapeId, grapeName]) => (
                            <option value={grapeId}>{grapeName}</option>
                        ))}
                    </select>
                </p>
                <p className="py-1">Plantede Stokke: <input className="bg-white"  min="0" max ="99999" name="submittedNumberOfVinesPlanted" type="number"/></p>
                <p className="py-1">Døde Stokke: <input className="bg-white"  min="0"  max="99999" name="submittedNumberOfVinesDead" type="number"/></p>
                <p className="py-1">Plantet: <input className="bg-white"  min="0" name="submittedPlantingDate" type="date"/></p>
                <button className="bg-green-300!" type="submit">Opret Plantning</button>
            </div>
        </form>

    )
}