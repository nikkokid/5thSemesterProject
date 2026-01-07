import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HarvestBox from "../../Components/HarvestBox";
import HarvestOverall from "../../Components/HarvestOverall";
import HarvestBoxCreate from "../../Components/HarvestBoxCreate";
import { getHarvestsByGrapeId, getHarvestsByGrapeIdAndYear , type Harvest} from "../../Services/Harvest/HarvestServices";
import { getAllGrapeRows } from "../../Services/GrapeRow/GrapeRowService";
import { fetchGrapes } from "../../Services/Grape/GrapeServices";


export default function Harvest() {
    const {grapeId} = useParams()
    const selectedGrapeId = Number(grapeId);
    const [allHarvests, setAllHarvests] = useState<Harvest[]>([]);
    const [selectedYearsHarvests, setSelectedYearsHarvests] = useState<Harvest[]>([]);
    const [reloadNeeded, setReloadNeeded] = useState(false);
    const [grapeRows, setGrapeRows] = useState<Record<number, string>>({});
    const [grapes, setGrapes] = useState<Record<number, string>>({});
    const [yearsWithHarvests, setYearsWithHarvests] = useState([1]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [overallWeight, setOverallWeight] = useState(0);


    async function loadSelectedYearsHarvests(grapeId : number, selectedYear : number) {
        const data = await getHarvestsByGrapeIdAndYear(grapeId, selectedYear);
        setSelectedYearsHarvests(data);
    }

    async function loadAllHarvests(grapeId : number){
        const data = await getHarvestsByGrapeId(grapeId);
        setAllHarvests(data);
    }

    async function loadAllGrapeRows() {
        const grapeRowDict: Record<number, string> = {};
        const allGrapeRows = await getAllGrapeRows()
        
        for (const grapeRow of allGrapeRows) {
            grapeRowDict[grapeRow.GrapeRowId] = grapeRow.GrapeRowName
        }
        setGrapeRows(grapeRowDict);
    }
    
    async function loadAllGrapes() {
        const grapeDict: Record<number, string> = {};
        const allGrapes = await fetchGrapes()
        
        for (const grape of allGrapes) {
            grapeDict[grape.GrapeId] = grape.GrapeName
        }
        setGrapes(grapeDict);
    }

    async function getYearsWithHarvestData (harvest : Harvest[]) {
        const tempYearsWithHarvest = [0];
        for (let i = 0; i < harvest.length; i++){
            const year = Number(harvest[i].HarvestDate.slice(0,4))
            if (!tempYearsWithHarvest.includes(year)) {
                tempYearsWithHarvest.push(year)
            }
        }
        setYearsWithHarvests(tempYearsWithHarvest.slice(1));
    }

    async function getOverallWeight (harvest : Harvest[]) {
        let total = 0;
        for (let i = 0; i < harvest.length; i++) {
            total = total + harvest[i].HarvestWeight
        }
        setOverallWeight(total);
    }

    useEffect(() => {
        loadAllHarvests(selectedGrapeId)
        loadAllGrapeRows()
        loadAllGrapes()
        loadSelectedYearsHarvests(selectedGrapeId, selectedYear);
        setReloadNeeded(false)

        
    }, [selectedGrapeId, selectedYear, reloadNeeded]);

    useEffect(() => {
        getYearsWithHarvestData(allHarvests);
    }, [allHarvests]);

    useEffect(() => {
        getOverallWeight(selectedYearsHarvests)
    }, [selectedYearsHarvests]);

    return (
        <div>
            <div>
                {/*
                harvest[0]? is used because harvest[0] isnt rendered by the time we try to get .grapeName,
                which causes an error in React. 
                */}
                <h2 className="text-center">{grapes[selectedYearsHarvests[0]?.GrapeId]} høsten {selectedYear}</h2>            </div>
            <div className="">
                <HarvestOverall yearsWithHarvests={yearsWithHarvests} setSelectedYear={setSelectedYear} selectedYear={selectedYear} overallWeight={overallWeight}/>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
                <HarvestBoxCreate grapeId={selectedGrapeId} setReloadNeeded={setReloadNeeded} grapeRows={grapeRows}/>
                {selectedYearsHarvests.map(harvest => 
                    <div key={harvest.HarvestId}>
                        <HarvestBox harvest={harvest} setReloadNeeded={setReloadNeeded} grapeRows={grapeRows}/>
                    </div>
                )}
            </div>
        </div>
    );
}




    
