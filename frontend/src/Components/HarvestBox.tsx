import { useState } from "react";
import { deleteHarvestByHarvestId, updateHarvestByHarvestId, type HarvestView, type Harvest} from "../Services/Harvest/HarvestServices";

type HarvestBoxProps = {
    harvests: HarvestView;
    setReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>
};

export default function HarvestBox({harvests, setReloadNeeded} : HarvestBoxProps) {
    const [editingHarvest, setEditingHarvest] = useState(false);

    function handleDelete (harvestId : number) {
        alert("are you sure you want to delete PLACEHOLDER")
        deleteHarvestByHarvestId(harvestId)
        setReloadNeeded(true)
    }

    function handleSubmit (formData : any) {
        let harvest : Harvest = {
            HarvestWeight: formData.get("submittedWeight"),
            HarvestDate: formData.get("submittedHarvestDate"),
            GrapeRowId: formData.get("submittedGrapeRowId"),
            GrapeId: harvests.GrapeId
        };
        updateHarvestByHarvestId(harvests.HarvestId, harvest);
        setEditingHarvest(!editingHarvest);
        setReloadNeeded(true);
    }

    if (!editingHarvest) {
        return(
        <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
            <h2>{harvests.GrapeRowName}</h2>
            <button onClick={() => setEditingHarvest(true)}>Rediger høst</button>
            <p>Antal Stokke: {harvests.NoOfVines}</p>
            <p>Vægt: {harvests.HarvestWeight} kg</p>
            <p>Høstet: {harvests.HarvestDate}</p>
        </div>
    )
    }

       return(
       <form action={handleSubmit}>
        <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
            <h2>{harvests.GrapeRowName}</h2>
            <button className="bg-green-300!" type="submit"> Gem Ændringer</button>
            <p className="py-1">Vægt: <input className="bg-white" min="0" max="99999" name="submittedWeight" type="number" defaultValue={harvests.HarvestWeight} /> kg</p>
            <p className="py-1">Høstet: <input className="bg-white"  min="0" name="submittedHarvestDate" type="date" defaultValue={harvests.HarvestDate} /></p>
            <p className="py-1">Række: <input className="bg-white"  min="1"  max="99999" name="submittedGrapeRowId" type="number" defaultValue={Number(harvests.GrapeRowName.slice(6))}/></p>
            <button className="bg-red-300!" onClick={() => handleDelete(harvests.HarvestId)}>Slet høst</button>
        </div>
        </form>
    )

}