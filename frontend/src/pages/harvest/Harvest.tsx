import { useState, useEffect } from "react";
import { getHarvests , type Harvest} from "../../servicesNikolai/HarvestServices";


export default function Harvest() {
    const [harvests, setHarvests] = useState<Harvest[]>([]);

    useEffect(() => {
        async function loadHarvests() {
            const data = await getHarvests()
            setHarvests(data);
        }

        loadHarvests();
    }, []);


    return (
        <div>
            <h1>test</h1>
            {harvests.map(h => (
                <div key={h.id}>
                    <p>Weight = {h.weight}</p>
                    <p>Date = {h.date}</p>
                </div>
            ))}
        </div>
    );
}
    
