import { useState, useEffect } from "react";
import { type HarvestView} from "../Services/Harvest/HarvestServices";

type HarvestOverallProps = {
    allHarvests: HarvestView[];
    selectedYearsHarvests: HarvestView[];
    selectedYear: number;
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
};

export default function HarvestOverall({allHarvests, selectedYearsHarvests, setSelectedYear, selectedYear} : HarvestOverallProps) {
    const [yearsWithHarvest, setYearsWithHarvest] = useState([1]);
    
    useEffect(() => {
        if (allHarvests.length > 0){
            getYearsWithHarvestData(allHarvests);
        }
    }, [allHarvests]);

    function getYearsWithHarvestData (harvest : HarvestView[]) {
        let tempYearsWithHarvest = [1];
        for (let i = 0; i < harvest.length; i++){
            if (!tempYearsWithHarvest.includes(Number(harvest[i].HarvestDate.slice(0, 4)), 0)) {
                tempYearsWithHarvest.push(Number(harvest[i].HarvestDate.slice(0, 4)))
            }
        }
        setYearsWithHarvest(tempYearsWithHarvest.slice(1))
        
    }

    function handleSelect (event : any) {
        setSelectedYear(Number(event.target.value));
    }

    return(
        <div className="flex flex-row justify-between items-center p-1 gap-10 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
            <div>
                <p>Samlet høst for {selectedYear}: {getOverallWeight(selectedYearsHarvests)} kg</p>
            </div>
            <div>
                Vælg Årstal: <select className="border rounded p-1"value={selectedYear} onChange={handleSelect} name="selectedYear" id="selectedYear">
                    {yearsWithHarvest.map(option => (
                        <option value={option}>{option}</option>
                    ))}
                </select>
            </div>
     
        </div>
    )
}

function getOverallWeight (harvests : HarvestView[]) {
    let total = 0;
    for (let i = 0; i < harvests.length; i++){
        total = total + harvests[i].HarvestWeight
    }
    return total;
}