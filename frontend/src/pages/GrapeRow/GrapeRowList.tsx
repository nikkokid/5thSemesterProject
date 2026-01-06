import ButtonCard from "../../Components/ButtonCard";
import grapeLeaf from "../../assets/grapeLeaf.svg";
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
            <div className="text-center">
                <h2>Rækker</h2>
            </div>

            <div className="flex justify-center flex-wrap gap-3">
                <div>
                    <ButtonCard image={grapeLeaf} title={"Opret"} onClick={() => navigate(`/grape-row/create`)}/>
                </div>
                {allGrapeRows.map(grapeRow => 
                    <div key={grapeRow.GrapeRowId}>
                        <ButtonCard image={grapeLeaf} title={grapeRow.GrapeRowName} onClick={() => navigate(`/grape-row/${grapeRow.GrapeRowId}`)}/>
                    </div>
                )}
            </div>
        </div>
    )
}