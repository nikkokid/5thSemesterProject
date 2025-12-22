import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import grapeImage from "../assets/grapesvg.svg"
import {fetchGrapes, type Grape} from "../services/GrapeServices"
import ButtonCard from "../components/ButtonCard"


export default function Grape() {
  const [grapes, setGrapes] = useState<Grape[]>([])
  const navigate = useNavigate();
  useEffect(() => {
    async function loadGrapes() {
      const data =  await fetchGrapes();
      setGrapes(data);
    } 
    loadGrapes();
  }, []);

  return (
    <>
      <h2 className="text-center text-2xl font-semibold mb-4">
        Druesorter
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-25 p-2">
        {grapes.map((grape) => (
          <ButtonCard
            key={grape.id}
            image={grapeImage}
            title={grape.name}
            description="Klik for detaljer"
            onClick={() => navigate(`/grape/${grape.id}`)}
          />
        ))}
      </div>
    </>
  );
    
}
