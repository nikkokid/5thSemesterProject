import { useEffect, useState } from "react";
import AdditiveLineCreate from "./AdditiveLineCreate";
import { getAdditiveLinesByJuiceId, type AdditiveLine } from "../Services/AdditiveLine/AdditiveLineServices";
import AdditiveLineItem from "./AdditiveLineItem";
import { getAllAdditivesV2 } from "../Services/AdditiveV2/AdditiveServicesV2";

type AdditiveLineListProps = {
    juiceId : number
}

export default function AdditiveLineList ({juiceId} : AdditiveLineListProps) {
    const [selectedJuicesAdditiveLines, setSelectedJuicesAdditiveLines] = useState<AdditiveLine[]>([]);
    const [additives, setAdditives] = useState<Record<number, string>>({});
    const [reloadNeeded, setReloadNeeded] = useState(false);

    async function loadAdditives() {
        const additiveDict: Record<number, string> = {};
        const allAdditives = await getAllAdditivesV2()

        for (const additive of allAdditives) {
            additiveDict[additive.AdditiveId] = additive.AdditiveName;
        };
        setAdditives(additiveDict);
    }
    
    async function loadAdditiveLines () {
        const data = await getAdditiveLinesByJuiceId(juiceId);
        setSelectedJuicesAdditiveLines(data);
    }


    useEffect(() => {
        loadAdditiveLines();
        loadAdditives();
        setReloadNeeded(false);
    }, [juiceId, reloadNeeded]);

    return (
        <div className="sm:col-start-2 mb-6 rounded-2xl border p-2 bg-gray-100">
            <h3 className="border-b-4 pb-2">Tilsætningsstoffer: {selectedJuicesAdditiveLines.length}</h3>
            {selectedJuicesAdditiveLines?.length === 0 ? (
              <p className="text-sm text-gray-500">Ingen tilsætningsstoffer endnu.</p>
            ) : (
              <>
                {selectedJuicesAdditiveLines.map(additiveLine => (
                    <div key={additiveLine.AdditiveLineId}>
                        <AdditiveLineItem additiveLine={additiveLine} additives={additives} setReloadNeeded={setReloadNeeded}/>
                    </div>
                ))}
              </>
              )}
              <div className="mt-3">
                  <AdditiveLineCreate additives={additives} juiceId={juiceId} setReloadNeeded={setReloadNeeded}/>
              </div>
        </div>
    )
}