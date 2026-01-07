import { useState } from "react";
import {createHarvest, type HarvestDTO } from "../Services/Harvest/HarvestServices";

type HarvestBoxCreateProps = {
    grapeId: number,
    setReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>,
    grapeRows: Record<number, string>
}
export default function HarvestBoxCreate ({grapeId, setReloadNeeded, grapeRows} : HarvestBoxCreateProps) {
    const [creatingHarvest, setCreatingHarvest] = useState(false);

    function handleSubmit (formData : any) {
        let harvestTemp : HarvestDTO = {
            HarvestWeight: formData.get("submittedWeight"),
            HarvestDate: formData.get("submittedHarvestDate"),
            GrapeRowId: formData.get("submittedGrapeRowId"),
            GrapeId: grapeId
        };
        createHarvest(harvestTemp);
        setCreatingHarvest(false);
        setReloadNeeded(true);
    }

    if(!creatingHarvest){
        return (
            <div className="flex flex-col justify-center p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                <button onClick={() => setCreatingHarvest(true)}> Opret høst</button>
            </div>
        )
    }
    
    return(
        <form action={handleSubmit}>
            <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                <button className="bg-green-300!" type="submit"> Opret Høst</button>
                <p className="py-1">
                    Række: 
                    <select className="bg-white" name="submittedGrapeRowId">
                        {Object.entries(grapeRows).map(([grapeRowId, grapeRowName]) => (
                            <option value={grapeRowId}>{grapeRowName}</option>
                        ))}
                    </select>
                </p>
                <p className="py-1">Vægt: <input className="bg-white" min="0" max="99999" name="submittedWeight" type="number"/> kg</p>
                <p className="py-1">Høstet: <input className="bg-white"  min="0" name="submittedHarvestDate" type="date"/></p>
                <button className="bg-red-300!" onClick={() => setCreatingHarvest(false)}>Annuller</button>
            </div>
        </form>
    )
}