import { useState } from "react"
import { deleteAdditiveLine, updateAdditiveLine, type AdditiveLine, type AdditiveLineDTO } from "../Services/AdditiveLine/AdditiveLineServices"
import settingsSvg from "../assets/settings-svgrepo-com.svg";

type AdditiveLineItemProps = {
    additiveLine : AdditiveLine,
    additives: Record<number, string>,
    setReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AdditiveLineItem ({additiveLine, additives, setReloadNeeded} : AdditiveLineItemProps) {
    const [editingAdditiveLine, setEditingAdditiveLine] = useState(false);

    function handleSubmit (formData : any) {
        let tempAdditiveLine : AdditiveLineDTO = {
            JuiceId: additiveLine.JuiceId,
            AdditiveId: formData.get("submittedAdditiveId"),
            AdditiveAmount: formData.get("submittedAdditiveAmount"),
            AdditiveDate: formData.get("submittedAdditiveDate")
        };
        updateAdditiveLine(tempAdditiveLine, additiveLine.AdditiveLineId);
        setEditingAdditiveLine(false);   
        setReloadNeeded(true);
    }

    function handleDelete () {
        deleteAdditiveLine(additiveLine.AdditiveLineId);
        setEditingAdditiveLine(false);
        setReloadNeeded(true);
    }

    if(!editingAdditiveLine) {
        return (
            <div>
                <div className="flex flex-col p-4 border-b-2 bg-gray-100 text-black">
                    <div className="flex justify-between">
                        <h3>{additives[additiveLine.AdditiveId]}</h3>
                        <button className="w-12 h-12 p-0! mt-2" onClick={() => setEditingAdditiveLine(true)}><img src={settingsSvg}/></button>
                    </div>
                    <p><strong>Mængde: </strong>{additiveLine.AdditiveAmount}g</p>
                    <p><strong>Dato: </strong>{additiveLine.AdditiveDate}</p>
                </div>
            </div>
        )
    }

    return (
        <form action={handleSubmit}>
            <div className="flex flex-col p-4 border-b-2 bg-gray-100 text-black">
                <button className="bg-green-600! text-white" type="submit">Gem Ændringer</button>
                <p className="py-1">
                    <strong>Tilsætningsstof</strong>
                    <select className="bg-white rounded w-full" name="submittedAdditiveId" defaultValue={additiveLine.AdditiveId}>
                        {Object.entries(additives).map(([AdditiveId, AdditiveName]) => (
                            <option value={AdditiveId}>{AdditiveName}</option>
                        ))}
                    </select>
                </p>
                <p className="py-1"><strong>Mængde </strong>(gram)<input className="bg-white rounded w-full" required={true} type="number" name="submittedAdditiveAmount" defaultValue={additiveLine.AdditiveAmount}/></p>
                <p className="py-1"><strong>Dato</strong><input className="bg-white rounded w-full" required={true} type="date" name="submittedAdditiveDate" defaultValue={additiveLine.AdditiveDate}/></p>
                <div className="flex flex-wrap justify-between">
                    <button className="text-white" type="button" onClick={() => setEditingAdditiveLine(false)}>Annuller</button>
                    <button className="bg-red-600! text-white" type="button" onClick={() => handleDelete()}>Slet tilsætningsstof</button>
                </div>
            </div>
        </form>
    )
}