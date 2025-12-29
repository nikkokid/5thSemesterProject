import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HarvestBox from "../../Components/HarvestBox";
import HarvestOverall from "../../Components/HarvestOverall";
import HarvestBoxCreate from "../../Components/HarvestBoxCreate";
import { getHarvestsByGrapeId, getHarvestsByGrapeIdAndYear , type HarvestView} from "../../Services/Harvest/HarvestServices";


export default function Harvest() {
    const {grapeId} = useParams()
    const selectedGrapeId = Number(grapeId);
    const [allHarvests, setAllHarvests] = useState<HarvestView[]>([]);
    const [selectedYearsHarvests, setSelectedYearsHarvests] = useState<HarvestView[]>([]);
    const [selectedYear, setSelectedYear] = useState(Number(Date().toString().slice(11, 15)));
    const [reloadNeeded, setReloadNeeded] = useState(false)

    async function loadSelectedYearsHarvests(grapeId : number, selectedYear : number) {
        const data = await getHarvestsByGrapeIdAndYear(grapeId, selectedYear);
        setSelectedYearsHarvests(data);
    }

    async function loadAllHarvests(grapeId : number){
        const data = await getHarvestsByGrapeId(grapeId);
        setAllHarvests(data);
    }

    useEffect(() => {
        
        loadSelectedYearsHarvests(selectedGrapeId, selectedYear);
        loadAllHarvests(selectedGrapeId)
        setReloadNeeded(false)
        
    }, [selectedGrapeId, selectedYear, reloadNeeded]);

    /*

    useEffect(() => {
        async function loadAllHarvests() {
            const data = await getHarvestsByGrapeId(selectedGrapeId);
            setAllHarvests(data);
            
        }

        loadAllHarvests();
    }, [selectedGrapeId]);

    useEffect(() => {
        if(reloadState){
            setReloadState(false);
            setSelectedYearsHarvests(selectedYearsHarvests);
        }
    }, [reloadState]);
*/

    return (
        <div>
            <div>
                {/*
                harvest[0]? is used because harvest[0] isnt rendered by the time we try to get .grapeName,
                which causes an error in React. 
                */}
                <h2 className="text-center">{selectedYearsHarvests[0]?.GrapeName} høsten {selectedYear}</h2>
            </div>
            <div className="">
                <HarvestOverall allHarvests={allHarvests} selectedYearsHarvests={selectedYearsHarvests} setSelectedYear={setSelectedYear} selectedYear={selectedYear}/>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
                <HarvestBoxCreate grapeId={selectedGrapeId} setReloadNeeded={setReloadNeeded}/>
                {selectedYearsHarvests.map(h => 
                    <div key={h.HarvestId}>
                        <HarvestBox harvests={h} setReloadNeeded={setReloadNeeded}/>
                    </div>
                )}
            </div>
        </div>
    );
}




    
