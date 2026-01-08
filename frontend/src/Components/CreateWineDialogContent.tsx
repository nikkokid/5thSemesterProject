import { useState, useEffect } from "react";
import { fetchGrapes, type Grape } from "../Services/Grape/GrapeServices";
import { createWine, type WineDTO } from "../Services/Wine/WineServices";
import { fetchJuicesByGrapes, type Juice } from "../Services/Juice/JuiceService";

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

type JuiceWithVolume = Juice & {
  usedVolume: number;
};

export default function CreateWineDialogContent({ onClose, onCreated }: Props) {
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [selectedGrapeIds, setSelectedGrapeIds] = useState<number[]>([]);

  const [juices, setJuices] = useState<JuiceWithVolume[]>([]);
  const [selectedJuiceIds, setSelectedJuiceIds] = useState<number[]>([]);

  const [wineName, setWineName] = useState("");
  const [vintageYear, setVintageYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  // ----------------------------------
  // Fetch grapes
  // ----------------------------------
  useEffect(() => {
    fetchGrapes().then(setGrapes);
  }, []);

  // ----------------------------------
  // Fetch juices when grapes change
  // ----------------------------------
  useEffect(() => {
    if (selectedGrapeIds.length === 0) {
      setJuices([]);
      setSelectedJuiceIds([]);
      return;
    }

    fetchJuicesByGrapes(selectedGrapeIds).then(fetched =>
      setJuices(fetched.map(j => ({ ...j, usedVolume: 0 })))
    );
  }, [selectedGrapeIds]);

  // ----------------------------------
  // Helpers
  // ----------------------------------
  function toggleGrape(id: number) {
    setSelectedGrapeIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function toggleJuice(id: number) {
    setSelectedJuiceIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function updateVolume(juiceId: number, value: number) {
    setJuices(prev =>
      prev.map(j =>
        j.id === juiceId
          ? { ...j, usedVolume: Math.min(value, j.volume) }
          : j
      )
    );
  }

  // ----------------------------------
  // Derived values
  // ----------------------------------
  const totalVolume = juices
    .filter(j => selectedJuiceIds.includes(j.id))
    .reduce((sum, j) => sum + j.usedVolume, 0);

  function percentageOf(juice: JuiceWithVolume) {
    if (totalVolume === 0) return 0;
    return Math.round((juice.usedVolume / totalVolume) * 100);
  }

  // ----------------------------------
  // Submit
  // ----------------------------------
  async function handleSubmit() {
    if (!wineName || totalVolume === 0) {
      alert("Angiv vinens navn og volumen");
      return;
    }

    const dto: WineDTO = {
      WineName: wineName,
      VintageYear: vintageYear,
      Juices: juices
        .filter(j => selectedJuiceIds.includes(j.id) && j.usedVolume > 0)
        .map(j => ({
          JuiceId: j.id,
          VolumeUsed: j.usedVolume,
        })),
    };

    try {
      setLoading(true);
      await createWine(dto);
      onCreated();
      onClose();
    } catch {
      alert("Kunne ikke oprette vin");
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------------
  // UI
  // ----------------------------------
  return (
    <div className="flex flex-col gap-4 p-4 min-width[400px]">
      <h2 className="text-xl font-semibold">Opret Vin</h2>

      <input
        className="border p-2 rounded"
        placeholder="Vin navn"
        value={wineName}
        onChange={e => setWineName(e.target.value)}
      />

      <input
        type="number"
        className="border p-2 rounded"
        value={vintageYear}
        onChange={e => setVintageYear(Number(e.target.value))}
      />

      <h3 className="font-semibold">Druer</h3>
      <div className="flex flex-wrap gap-2">
        {grapes.map(g => (
          <button
            key={g.GrapeId}
            onClick={() => toggleGrape(g.GrapeId)}
            className={`px-3 py-1 rounded ${
              selectedGrapeIds.includes(g.GrapeId)
                ? "bg-green-600! text-white"
                : "bg-gray-200"
            }`}
          >
            {g.GrapeName}
          </button>
        ))}
      </div>

      {juices.length > 0 && (
        <>
          <h3 className="font-semibold">Saft</h3>

          {juices.map(j => {
            const selected = selectedJuiceIds.includes(j.id);

            return (
              <div key={j.id} className="border rounded p-2 flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleJuice(j.id)}
                />

                <div className="flex-1">
                  {j.volume} L tilgængelig
                </div>

                {selected && (
                  <>
                    <input
                      type="number"
                      min={0}
                      max={j.volume}
                      value={j.usedVolume}
                      onChange={e =>
                        updateVolume(j.id, Number(e.target.value))
                      }
                      className="w-20 border rounded p-1"
                    />
                    <span>{percentageOf(j)}%</span>
                  </>
                )}
              </div>
            );
          })}

          <div className="text-right font-semibold">
            Total: {totalVolume} L
          </div>
        </>
      )}

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Annuller
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600! text-white px-4 py-2 rounded"
        >
          {loading ? "Opretter..." : "Opret Vin"}
        </button>
      </div>
    </div>
  );
}
