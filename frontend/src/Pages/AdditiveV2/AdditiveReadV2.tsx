import { useNavigate, useParams } from "react-router-dom"
import { getAdditiveByAdditiveIdV2, updateAdditiveV2, deleteAdditiveV2, type AdditiveV2, type AdditiveDTOV2 } from "../../Services/AdditiveV2/AdditiveServicesV2";
import { useEffect, useState } from "react";
import settingsSvg from "../../assets/settings-svgrepo-com.svg";
import AdditiveOverall from "../../Components/AdditiveOverall";

export default function AdditiveReadV2() {
    const navigate = useNavigate();
    let {additiveId} = useParams();
    const selectedAdditiveId = Number(additiveId);
    const [selectedAdditive, setSelectedAdditive] = useState<AdditiveV2[]>([]);
    const [editingAdditive, setEditingAdditive] = useState(false);
    const [reloadNeeded, setReloadNeeded] = useState(false);

    async function loadSelectedAdditive() {
        const data = await getAdditiveByAdditiveIdV2(selectedAdditiveId);
        setSelectedAdditive(data);
    }

    useEffect(() => {
        loadSelectedAdditive();
        setReloadNeeded(false);
    }, [selectedAdditiveId, reloadNeeded])

    function handleSubmit (formData : any) {
        let additiveTemp : AdditiveDTOV2 = {
            AdditiveName: formData.get("submittedAdditiveName"),
            AdditiveDescription: formData.get("submittedAdditiveDescription"),
            AdditiveURL: formData.get("submittedAdditiveURL")
        };
        updateAdditiveV2(additiveTemp, selectedAdditiveId);
        setEditingAdditive(false)
        setReloadNeeded(true);
    }

    function handleDelete () {
        deleteAdditiveV2(selectedAdditiveId);
        navigate(`/additive`)
    }

    if(!editingAdditive) {
        return (
            <div>
                <div className="flex flex-wrap justify-between">
                    <h1>{selectedAdditive[0]?.AdditiveName}</h1>
                    <button 
                        className="w-12 h-12 p-0! mt-2" 
                        onClick={() => setEditingAdditive(true)}><img src={settingsSvg}/></button>
                </div>
                <div>
                    <AdditiveOverall selectedAdditive={selectedAdditive[0]}/>
                </div>
            </div>
        )
    }

    return (
        <form action={handleSubmit}>
            <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                <h2 className="text-center">Du er nu ved at ændre {selectedAdditive[0]?.AdditiveName}</h2>
                <p>Navn: <input required className="bg-white rounded w-full" name="submittedAdditiveName" type="text" defaultValue={selectedAdditive[0]?.AdditiveName}/></p>
                <p>URL: <input className="bg-white rounded w-full" name="submittedAdditiveURL" type="text" defaultValue={selectedAdditive[0]?.AdditiveURL}/></p>
                <p>Beskrivelse:<textarea className="bg-white rounded w-full" spellCheck={false} name="submittedAdditiveDescription" rows={5} defaultValue={selectedAdditive[0]?.AdditiveDescription}></textarea></p> 
                <div className="flex flex-wrap justify-between py-2">
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setEditingAdditive(false) }>Annuller</button>
                        <button className="bg-green-500!" type="submit">Gem</button>
                    </div>
                    <button className="bg-red-500!" type="button" onClick={() => handleDelete()}>Slet</button>
                </div>
            </div>
        </form>

    )
}