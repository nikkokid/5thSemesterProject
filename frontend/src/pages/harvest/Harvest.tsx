import { useState, useEffect } from "react";
import HarvestBox from "../../components/HarvestBox";
import HarvestOverall from "../../components/HarvestOverall";
import { getHarvestsByGrapeId, getHarvestsByGrapeIdAndYear , type HarvestView} from "../../servicesNikolai/HarvestServices";

type HarvestProps = {
    grapeId : number;
};

export default function Harvest({grapeId} : HarvestProps) {
    const [allHarvests, setAllHarvests] = useState<HarvestView[]>([]);
    const [selectedYearsHarvests, setSelectedYearsHarvests] = useState<HarvestView[]>([]);
    const [selectedYear, setSelectedYear] = useState(Number(Date().toString().slice(11, 15)));
    const [reloadState, setReloadState] = useState(false);

    useEffect(() => {
        async function loadSelectedYearsHarvests() {
            const data = await getHarvestsByGrapeIdAndYear(grapeId, selectedYear);
            setSelectedYearsHarvests(data);
            
        }

        loadSelectedYearsHarvests();
    }, [grapeId, selectedYear]);

    useEffect(() => {
        async function loadAllHarvests() {
            const data = await getHarvestsByGrapeId(grapeId);
            setAllHarvests(data);
            
        }

        loadAllHarvests();
    }, [grapeId]);

    useEffect(() => {
        if(reloadState){
            setReloadState(false);
            setSelectedYearsHarvests(selectedYearsHarvests);
        }
    }, [reloadState]);
/*
    useEffect(() => {
        if (harvests.length > 0){
            getYearsWithHarvestData(harvests);
        }
    }, [harvests]);
    
    function handleSelect (event : any) {
    setYear(event.target.value);
    }

    function getYearsWithHarvestData (harvest : HarvestView[]) {
        let tempYearsWithHarvest = [1];
        for (let i = 0; i < harvest.length; i++){
            if (!tempYearsWithHarvest.includes(Number(harvest[i].harvestDate.slice(0, 4)), 0)) {
                tempYearsWithHarvest.push(Number(harvest[i].harvestDate.slice(0, 4)))
            }
        }
        setYearsWithHarvest(tempYearsWithHarvest.slice(1))
        
    }
        */


    return (
        <div>
            <div>
                {/*
                harvest[0]? is used because harvest[0] isnt rendered by the time we try to get .grapeName,
                which causes an error in React. 
                */}
                <h2>{selectedYearsHarvests[0]?.grapeName} høsten {selectedYear} {reloadState.toString()}</h2>
            </div>
            <div className="py-2">
                <HarvestOverall allHarvests={allHarvests} selectedYearsHarvests={selectedYearsHarvests} setSelectedYear={setSelectedYear} selectedYear={selectedYear}/>
            </div>
            <div className="flex flex-wrap gap-2">
                {selectedYearsHarvests.map(h => 
                    <div key={h.harvestId}>
                        <HarvestBox harvests={h} reloadState={reloadState} setReloadState={setReloadState}/>
                    </div>
                )}
            </div>
        </div>
    );
}




    
