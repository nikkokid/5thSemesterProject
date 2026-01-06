import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YearDropdown } from "../../Components/YearDropdown";
import JuiceColumn from "../../Components/JuiceColumn";
import { getJuicesByGrapeIdAndYear, type Juice } from "../../Services/Juice/JuiceService";

export default function Juice() {
  const { grapeId } = useParams();
  const years = [2023, 2024, 2025, 2026];

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [juices, setJuices] = useState<Juice[]>([]);

  async function fetchJuices() {
    const data = await getJuicesByGrapeIdAndYear(Number(grapeId), selectedYear);
    setJuices(data);
  }

  useEffect(() => {
    fetchJuices();
  }, [grapeId, selectedYear]);

  const juiceTypes = [
    { title: "Presset Most", typeId: 1 },
    { title: "Gennemløbet Most", typeId: 2 }
  ];

  return (
    <div className="">
      <div>
        <h1>Most for Vindrue ID: {grapeId}</h1>

        <YearDropdown
          years={years}
          value={selectedYear}
          onChange={setSelectedYear}
        />
      </div>

      <div className="grid grid-cols-2 gap-12 md:gap-18 lg:gap-20 mt-12">
        {juiceTypes.map(type => (
          <JuiceColumn
            key={type.typeId}
            title={type.title}
            juiceTypeId={type.typeId}
            grapeId={Number(grapeId)}
            year={selectedYear}            
            juices={juices.filter(
              j => j.juiceTypeId === type.typeId
            )}

            onRefresh={fetchJuices}
          />
        ))}
      </div>
    </div>
  );
}
