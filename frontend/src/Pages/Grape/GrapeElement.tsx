import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {fetchGrapeById, type Grape} from "../../Services/Grape/GrapeServices"
import grapeImage from "../../assets/grapesvg.svg"
import ButtonCard from "../../Components/ButtonCard";

export default function GrapeElement() {
    const { grapeId } = useParams<{ grapeId: string }>();
    const [grape, setGrape] = useState<Grape | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadGrape() {
            if (grapeId) {
                const data = await fetchGrapeById(Number(grapeId));
                setGrape(data);
            }
        }
        loadGrape();
    }, [grapeId]);
    if (!grape) {
        return <div>Loading...</div>;
    }
    return (
    <>
      {/* Header */}
      <h2 className="text-center text-2xl font-semibold mb-6">
        {grape.GrapeName}
      </h2>

      {/* Button Card */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-25 p-2">
        <ButtonCard
          image={grapeImage}
          title="Planter"
          description="Se antal planter"
          onClick={() => navigate(`/grape/${grape.GrapeId}/plants`)}
        />

        <ButtonCard
          image={grapeImage}
          title="Høst"
          description="Se høstdata"
          onClick={() => navigate(`/grape/${grape.GrapeId}/harvest`)}
        />

        <ButtonCard
          image={grapeImage}
          title="Vin"
          description="Se vinproduktion"
          onClick={() => navigate(`/grape/${grape.GrapeId}/juice`)}
        />
      </div>
    </>
  );
}