import ButtonCard from "../../Components/ButtonCard";
import additivesvg from "../../assets/ingredients-mix-svgrepo-com.svg";
import addsvg from "../../assets/add-create-new-plus-svgrepo-com.svg";
import { getAllAdditivesV2, type AdditiveV2 } from "../../Services/AdditiveV2/AdditiveServicesV2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdditiveListV2() {
    const navigate = useNavigate();
    const [allAdditivesV2, setAllAdditivesV2] = useState<AdditiveV2[]>([]);

    async function loadAllAdditivesV2() {
        const data = await getAllAdditivesV2();
        setAllAdditivesV2(data);
    }

    useEffect (() => {
        loadAllAdditivesV2();
    })

    return (
        <div>
            <div className="text-center mb-12">
                <h2>Tilsætningsstoffer</h2>
            </div>
            <div className="flex justify-center flex-wrap gap-3">
                <div>
                    <ButtonCard image={addsvg} title={"Opret nyt tilsætningsstof"} onClick={() => navigate(`/additive/create`)}/>
                </div>
                {allAdditivesV2.map(additive =>
                    <div key={additive.AdditiveId}>
                        <ButtonCard image={additivesvg} title={additive.AdditiveName} onClick={() => navigate(`/additive/${additive.AdditiveId}`)}/>
                    </div>
                )}
            </div>
        </div>
    )
}