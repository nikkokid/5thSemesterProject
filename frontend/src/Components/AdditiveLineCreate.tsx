import { useState } from "react";
import { createAdditiveLine, type AdditiveLineDTO } from "../Services/AdditiveLine/AdditiveLineServices";

type AdditiveLineCreateProps = {
    juiceId : number,
    additives: Record<number, string>,
    setReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AdditiveLineCreate ({juiceId, additives, setReloadNeeded} : AdditiveLineCreateProps) {
    const [addingAdditive, setAddingAdditive] = useState(false);

    function handleSubmit (formData : any) {
        let tempAdditiveLine : AdditiveLineDTO = {
            JuiceId: juiceId,
            AdditiveId: formData.get("submittedAdditiveId"),
            AdditiveAmount: formData.get("submittedAdditiveAmount"),
            AdditiveDate: formData.get("submittedAdditiveDate")
        };
        createAdditiveLine(tempAdditiveLine);
        setAddingAdditive(false);
        setReloadNeeded(true);
    }


    if(!addingAdditive) {
        return (
            <div>
                <div>
                    <button className="mb-2 bg-green-600! text-white" onClick={() => setAddingAdditive(true)}>Tilføj Tilsætningsstof</button>
                </div>
            </div>
        )
    }
    return (
        <form action={handleSubmit}>
            <div className="flex flex-col p-4 bg-gray-100">
                <p className="py-1">
                    <strong>Tilsætningsstof</strong>
                    <select required={true} className="bg-white rounded w-full" name="submittedAdditiveId" >
                        {Object.entries(additives).map(([AdditiveId, AdditiveName]) => (
                            <option value={AdditiveId}>{AdditiveName}</option>
                        ))}
                    </select>
                </p>
                <p className="py-1"><strong>Mængde </strong>(gram)<input className="bg-white rounded w-full" required={true} type="number" name="submittedAdditiveAmount" /></p>
                <p className="py-1"><strong>Dato</strong> <input className="bg-white rounded w-full" required={true} type="date" name="submittedAdditiveDate"/></p>
                <div className="flex flex-wrap justify-evenly">
                    <button className="bg-red-500! text-white" type="button" onClick={() => setAddingAdditive(false)}>Annuller</button>
                    <button className="bg-green-500! text-white" type="submit">Opret</button>
                </div>
            </div>
        </form>
    )
}