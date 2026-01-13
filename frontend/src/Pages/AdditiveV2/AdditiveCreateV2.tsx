import { useNavigate } from "react-router-dom"
import { createAdditiveV2, type AdditiveDTOV2 } from "../../Services/AdditiveV2/AdditiveServicesV2";

export default function AdditiveCreateV2() {
    const navigate = useNavigate();

    function handleSubmit (formData : any){
        let additiveTemp : AdditiveDTOV2 = {
            AdditiveName: formData.get("submittedAdditiveName"),
            AdditiveDescription: formData.get("submittedAdditiveDescription"),
            AdditiveURL: formData.get("submittedAdditiveURL")
        };
        createAdditiveV2(additiveTemp);
        navigate(`/additive`);
    }

    return (
        <div>
            <h2 className="text-center">Opret tilsætningsstof</h2>
            <form action={handleSubmit}>
                <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                    <p>Navn: <input className="bg-white rounded" name="submittedAdditiveName" type="text" placeholder="Skriv navn her..."/></p>
                    <p>URL: <input className="bg-white rounded" name="submittedAdditiveURL" type="text" placeholder="Indsæt URL her..."/></p>
                    <p>Beskrivelse:</p> <textarea className="bg-white rounded" spellCheck={false} name="submittedAdditiveDescription" rows={5} placeholder="Skriv beskrivelse her..."></textarea>
                    <div className="flex flex-wrap justify-evenly mt-3">
                        <button className="bg-red-300!" type="button" onClick={() => navigate(`/additive`) }>Annuller</button>
                        <button className="bg-green-300!" type="submit">Opret</button>
                    </div>
                </div>
            </form>
        </div>
    )
}