import { useState, useEffect } from "react";
import type { GrapeRow } from "../Services/GrapeRow/GrapeRowService";
import type { Planting } from "../Services/Planting/PlantingService";

type GrapeRowOverallProps = {
    selectedGrapeRowsPlantings: Planting[],
    selectedGrapeRow: GrapeRow,
    grapes: Record<number, string>
};

export default function GrapeRowOverall({selectedGrapeRowsPlantings, selectedGrapeRow, grapes} : GrapeRowOverallProps) {
    const [liveGrapeVines, setLiveGrapeVines] = useState(0);
    const [deadGrapeVines, setDeadGrapeVines] = useState(0);
    const [liveVinesPerGrape, setLiveVinesPerGrape] = useState<Record<number, number>>({});
    const [deadVinesPerGrape, setDeadVinesPerGrape] = useState<Record<number, number>>({});

    async function calculateLiveAndDeadGrapeVines () {
        let totalLive = 0;
        let totalDead = 0;
        const grapeDictLive: Record<number, number> = {};
        const grapeDictDead: Record<number, number> = {};

        for (const planting of selectedGrapeRowsPlantings) {
            totalLive += (planting.NumberOfVinesPlanted - planting.NumberOfVinesDead);
            totalDead += planting.NumberOfVinesDead;
            
            if(!grapeDictLive[planting.GrapeId]) {
                grapeDictLive[planting.GrapeId] = (planting.NumberOfVinesPlanted - planting.NumberOfVinesDead)
            } else {
                grapeDictLive[planting.GrapeId] += (planting.NumberOfVinesPlanted - planting.NumberOfVinesDead)
            }

            if (!grapeDictDead[planting.GrapeId]) {
                grapeDictDead[planting.GrapeId] = planting.NumberOfVinesDead;
            } else {
                grapeDictDead[planting.GrapeId] += planting.NumberOfVinesDead
            }
        }
        setLiveGrapeVines(totalLive);
        setDeadGrapeVines(totalDead);
        setLiveVinesPerGrape(grapeDictLive);
        setDeadVinesPerGrape(grapeDictDead);
    }

    useEffect(() => {
        calculateLiveAndDeadGrapeVines();
    }, [selectedGrapeRowsPlantings])

    return(
        <div className="grid grid-cols-2 p-2 mb-2 mt-2 gap-2 border-3 rounded border-[rgb(77,16,39)] bg-gray-200 text-black">
            <div className="border-3 col-span-2 rounded border-[rgb(77,16,39)] p-2">
                <h3 className="text-center">{selectedGrapeRow?.GrapeRowName}</h3>
                <p>Rækkens Længde: {selectedGrapeRow?.LengthOfRow}m</p>
                <p>Afstand Mellem Stokke: {selectedGrapeRow?.DistanceBetweenVines}m</p>
                <p>Afstand Til Andre Række: {selectedGrapeRow?.DistanceToNextRow}m</p>
            </div>    
            <div className="border-3 rounded border-[rgb(77,16,39)] p-2">
                <h3 className="text-center">Levende Stokke</h3>
                <p>Samlet: {liveGrapeVines} stokke</p>
                {Object.entries(liveVinesPerGrape).map(([grapeId, liveVines]) => (
                    <p key={grapeId}>
                        {grapes[Number(grapeId)]}: {liveVines} stokke
                    </p>
                ))}
            </div>
            <div className="border-3 rounded border-[rgb(77,16,39)] p-2">
                <h3 className="text-center">Døde Stokke</h3>
                <p>Samlet: {deadGrapeVines} stokke</p>
                {Object.entries(deadVinesPerGrape).map(([grapeId, deadVines]) => (
                    <p key={grapeId}>
                        {grapes[Number(grapeId)]}: {deadVines} stokke
                    </p>
                ))}
            </div>
        </div>
    )
}