type HarvestOverallProps = {
    yearsWithHarvests: number[],
    selectedYear: number,
    overallWeight: number,
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>
};

export default function HarvestOverall({yearsWithHarvests, setSelectedYear, selectedYear, overallWeight} : HarvestOverallProps) {
    


    function handleSelect (event : any) {
        setSelectedYear(Number(event.target.value));
    }

    return(
        <div className="flex flex-row justify-between items-center p-1 gap-10 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
            <div>
                Samlet høst for {selectedYear}: {overallWeight} kg
            </div>
            <div>
                Vælg Årstal: <select className="border rounded p-1"value={selectedYear} onChange={handleSelect} name="selectedYear" id="selectedYear">
                    {yearsWithHarvests.map(option => (
                        <option value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}