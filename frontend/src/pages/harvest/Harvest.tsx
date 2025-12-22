import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HarvestBox from "../../Components/HarvestBox";
import HarvestOverall from "../../Components/HarvestOverall";
import { getHarvestsByGrapeId, getHarvestsByGrapeIdAndYear , type HarvestView} from "../../Services/Harvest/HarvestServices";


export default function Harvest() {
    let {grapeId} = useParams();
    const testgrapeId = Number(grapeId);
    const [allHarvests, setAllHarvests] = useState<HarvestView[]>([]);
    const [selectedYearsHarvests, setSelectedYearsHarvests] = useState<HarvestView[]>([]);
    const [selectedYear, setSelectedYear] = useState(Number(Date().toString().slice(11, 15)));
    const [reloadState, setReloadState] = useState(false);

    useEffect(() => {
        async function loadSelectedYearsHarvests() {
            const data = await getHarvestsByGrapeIdAndYear(testgrapeId, selectedYear);
            setSelectedYearsHarvests(data);
            
        }

        loadSelectedYearsHarvests();
    }, [testgrapeId, selectedYear]);

    useEffect(() => {
        async function loadAllHarvests() {
            const data = await getHarvestsByGrapeId(testgrapeId);
            setAllHarvests(data);
            
        }

        loadAllHarvests();
    }, [testgrapeId]);

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
                <h2 className="text-center">{selectedYearsHarvests[0]?.GrapeName} høsten {selectedYear} {reloadState.toString()}</h2>
            </div>
            <div className="py-2">
                <HarvestOverall allHarvests={allHarvests} selectedYearsHarvests={selectedYearsHarvests} setSelectedYear={setSelectedYear} selectedYear={selectedYear}/>
            </div>
            <div className="flex flex-wrap gap-2">
                {selectedYearsHarvests.map(h => 
                    <div key={h.HarvestId}>
                        <HarvestBox harvests={h} reloadState={reloadState} setReloadState={setReloadState}/>
                    </div>
                )}
            </div>
        </div>
    );
}




    
