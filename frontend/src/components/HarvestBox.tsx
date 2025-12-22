import { useState } from "react";
import { deleteHarvestByHarvestId, type HarvestView} from "../servicesNikolai/HarvestServices";

type HarvestBoxProps = {
    harvests: HarvestView;
    reloadState: boolean;
    setReloadState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HarvestBox({harvests, reloadState, setReloadState} : HarvestBoxProps) {
    const [editingHarvest, setEditingHarvest] = useState(false);
    const [submittedRowNames, setSubmittedRowNames] = useState(harvests.rowName);
    const [submittedNoOfVines, setSubmittedNoOfVines] = useState(harvests.noOfVines);
    const [submittedWeight, setSubmittedWeight] = useState(harvests.weight);
    const [submittedHarvestDate, setSubmittedHarvestDate] = useState(harvests.harvestDate);

    function handleEdit () {
        setEditingHarvest(!editingHarvest);
    }

    function handleDelete (harvestId : number) {
        deleteHarvestByHarvestId(harvestId)
        setReloadState(true)
    }

    function handleSubmit (formData : any) {
        setSubmittedNoOfVines(formData.get("submittedNoOfVines"))
        setSubmittedWeight(formData.get("submittedWeight"))
        setSubmittedHarvestDate(formData.get("submittedHarvestDate"))
        setEditingHarvest(!editingHarvest);
    }

    if (!editingHarvest) {
        return(
        <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
            <h2>{harvests.rowName}</h2>
            <button onClick={() => handleEdit()}>Rediger høst</button>
            <p>Antal Stokke: {harvests.noOfVines}</p>
            <p>Vægt: {harvests.weight} kg</p>
            <p>Høstet: {harvests.harvestDate}</p>
            <p>{reloadState.toString()}</p>
        </div>
    )
    }

       return(
       <form action={handleSubmit}>
        <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
            <h2>{harvests.rowName}</h2>
            <button type="submit"> Gem Ændringer</button>
            <p>Antal stokke: <input min="0" max="99999" name="submittedNoOfVines" type="number" defaultValue={submittedNoOfVines} /></p>
            <p>Vægt: <input min="0" max="99999" name="submittedWeight" type="number" defaultValue={submittedWeight} /> kg</p>
            <p>Høstet: <input min="0" name="submittedHarvestDate" type="date" defaultValue={submittedHarvestDate} /></p>
            <p>Harvest Id: {harvests.harvestId}</p>
            <button onClick={() => handleDelete(harvests.harvestId)}>Slet høst</button>
        </div>
        </form>
    )

}