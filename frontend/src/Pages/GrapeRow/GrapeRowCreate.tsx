import { useNavigate } from 'react-router-dom';
import { createGrapeRow, type GrapeRowDTO } from '../../Services/GrapeRow/GrapeRowService';


export default function GrapeRowCreate() {
    const navigate = useNavigate();

    function handleSubmit (formData : any){
        let grapeRow : GrapeRowDTO = {
            GrapeRowName: formData.get("submittedGrapeRowName"),
            LengthOfRow: formData.get("submittedLengthOfRow"),
            DistanceBetweenVines: formData.get("submittedDistanceBetweenVines"),
            DistanceToNextRow: formData.get("submittedDistanceToNextRow")
        };
        createGrapeRow(grapeRow);
        navigate(`/grape-row`);
    }
    return(
        <div>
            <h2 className="text-center">Opret række</h2>
            <form action={handleSubmit}>
                <div className="flex flex-col p-4 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
                    <p>Rækkens navn: <input className="bg-white" name="submittedGrapeRowName" type="text"/></p>
                    <p>Rækkens længde: <input className="bg-white" min="0" max="99999" name="submittedLengthOfRow" type="number"/> m</p>
                    <p>Afstand mellem stokke: <input className="bg-white" min="0" max="99999" name="submittedDistanceBetweenVines" type="number"/> m</p>
                    <p>Afstand til andre rækker: <input className="bg-white" min="0" max="99999" name="submittedDistanceToNextRow" type="number"/> m</p>
                    <div className="flex flex-wrap justify-evenly">
                        <button className="bg-red-300!" onClick={() => navigate(`/grape-row`) }>Annuller</button>
                        <button className="bg-green-300!" type="submit">Opret</button>
                    </div>
                </div>
            </form>
        </div>
    )
}