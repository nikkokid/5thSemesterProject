import { useState } from "react";
import { deleteHarvestByHarvestId, updateHarvestByHarvestId, type Harvest, type HarvestDTO} from "../Services/Harvest/HarvestServices";

type HarvestBoxProps = {
    harvest: Harvest,
    setReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>,
    grapeRows: Record<number, string>
};

export default function HarvestBox({harvest, setReloadNeeded, grapeRows} : HarvestBoxProps) {
    const [editingHarvest, setEditingHarvest] = useState(false);



    function handleSubmit (formData : any) {
        
        let harvestTemp : HarvestDTO = {
            HarvestWeight: formData.get("submittedWeight"),
            HarvestDate: formData.get("submittedHarvestDate"),
            GrapeRowId: formData.get("submittedGrapeRowId"),
            GrapeId: harvest.GrapeId
        };
        updateHarvestByHarvestId(harvest.HarvestId, harvestTemp);
        setEditingHarvest(false);
        setReloadNeeded(true);
    }

    function handleDelete (harvestId : number) {
        deleteHarvestByHarvestId(harvestId);
        setEditingHarvest(false);
        setReloadNeeded(true);
    };

    if (!editingHarvest) {
        return(
        <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
            <h2>{grapeRows[harvest.GrapeRowId]}</h2>
            <button onClick={() => setEditingHarvest(true)}>Rediger høst</button>
            <p>Vægt: {harvest.HarvestWeight} kg</p>
            <p>Høstet: {harvest.HarvestDate}</p>
        </div>
    )
    }

       return(
       <form action={handleSubmit}>
            <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                <h2>
                    <select className="bg-white border rounded" name="submittedGrapeRowId" defaultValue={harvest.GrapeRowId}>
                        {Object.entries(grapeRows).map(([grapeRowId, grapeRowName]) => (
                            <option value={grapeRowId}>{grapeRowName}</option>
                        ))}
                    </select>
                </h2>
                <button className="bg-green-300!" type="submit"> Gem Ændringer</button>
                <p className="py-1">Vægt: <input className="bg-white" min="0" max="99999" name="submittedWeight" type="number" defaultValue={harvest.HarvestWeight} /> kg</p>
                <p className="py-1">Høstet: <input className="bg-white" name="submittedHarvestDate" type="date" defaultValue={harvest.HarvestDate.slice(0, 10)} /></p>          
                <button className="bg-red-300!" onClick={() => handleDelete(harvest.HarvestId)}>Slet høst</button>
            </div>
        </form>
    )

}