import { useState } from "react";
import {createHarvest, type Harvest } from "../Services/Harvest/HarvestServices";

type HarvestBoxCreateProps = {
    grapeId: number,
    setReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>
}
export default function HarvestBoxCreate ({grapeId, setReloadNeeded} : HarvestBoxCreateProps) {
    const [creatingHarvest, setCreatingHarvest] = useState(false);

    function handleSubmit (formData : any) {
        let harvest : Harvest = {
            HarvestWeight: formData.get("submittedWeight"),
            HarvestDate: formData.get("submittedHarvestDate"),
            GrapeRowId: formData.get("submittedGrapeRowId"),
            GrapeId: grapeId
        };
        createHarvest(harvest);
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
                <p className="py-1">Vægt: <input className="bg-white" min="0" max="99999" name="submittedWeight" type="number"/> kg</p>
                <p className="py-1">Høstet: <input className="bg-white"  min="0" name="submittedHarvestDate" type="date"/></p>
                <p className="py-1">Række: <input className="bg-white"  min="1"  max="99999" name="submittedGrapeRowId" type="number"/></p>
                <button className="bg-red-300!" onClick={() => setCreatingHarvest(false)}>Annuller</button>
            </div>
        </form>
    )
}