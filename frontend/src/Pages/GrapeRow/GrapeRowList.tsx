import ButtonCard from "../../Components/ButtonCard";
import plantsvg from "../../assets/plant-svgrepo-com.svg";
import addsvg from "../../assets/add-create-new-plus-svgrepo-com.svg";
import { getAllGrapeRows, type GrapeRow } from "../../Services/GrapeRow/GrapeRowService";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';




export default function GrapeRowList() {
    const navigate = useNavigate();
    const [allGrapeRows, setAllGrapeRows] = useState<GrapeRow[]>([]);

    useEffect(() => {
        async function loadAllGrapeRows() {
            const data = await getAllGrapeRows();
            setAllGrapeRows(data);
        }

        loadAllGrapeRows();
    })
    return (
        <div>
            <div className="text-center mb-12">
                <h2>Rækker</h2>
            </div>

            <div className="flex justify-center flex-wrap gap-3">
                <div>
                    <ButtonCard image={addsvg} title={"Opret"} onClick={() => navigate(`/grape-row/create`)}/>
                </div>
                {allGrapeRows.map(grapeRow => 
                    <div key={grapeRow.GrapeRowId}>
                        <ButtonCard image={plantsvg} title={grapeRow.GrapeRowName} onClick={() => navigate(`/grape-row/${grapeRow.GrapeRowId}`)}/>
                    </div>
                )}
            </div>
        </div>
    )
}