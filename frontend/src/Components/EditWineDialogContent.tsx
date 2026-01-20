import { useEffect, useState } from "react";
import { fetchGrapes, type Grape } from "../Services/Grape/GrapeServices";
import {
  fetchWineById,
  updateWine,
  deleteWine,
  type WineDTO,
} from "../Services/Wine/WineServices";
import { fetchJuicesByGrapes, type Juice } from "../Services/Juice/JuiceService";

type Props = {
  wineId: number;
  onClose: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
};

type JuiceWithVolume = Juice & {
  usedVolume: number;
};

export default function EditWineDialogContent({
  wineId,
  onClose,
  onUpdated,
  onDeleted,
}: Props) {
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [selectedGrapeIds, setSelectedGrapeIds] = useState<number[]>([]);
  const [juices, setJuices] = useState<JuiceWithVolume[]>([]);
  const [selectedJuiceIds, setSelectedJuiceIds] = useState<number[]>([]);

  const [wineName, setWineName] = useState("");
  const [vintageYear, setVintageYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [loadingWine, setLoadingWine] = useState(true);

  // -------------------------------
  // Fetch grapes
  // -------------------------------
  useEffect(() => {
    fetchGrapes().then(setGrapes).catch(console.error);
  }, []);

  // -------------------------------
  // Load wine + juices
  // -------------------------------
  useEffect(() => {
    async function loadWine() {
      try {
        const details = await fetchWineById(wineId);
        if (details.length === 0) return;

        setWineName(details[0].WineName);
        setVintageYear(details[0].VintageYear);

        // Get unique grapeIds from the wine
        const grapeIds = [...new Set(details.map(d => d.GrapeId))];
        setSelectedGrapeIds(grapeIds);

        // Fetch juices from these grapes
        const fetchedJuices = await fetchJuicesByGrapes(grapeIds);

        const juiceMap: JuiceWithVolume[] = fetchedJuices.map(j => {
          const match = details.find(d => d.JuiceId === j.id);
          return {
            ...j,
            usedVolume: match ? match.VolumeUsed : 0,
          };
        });

        setJuices(juiceMap);
        setSelectedJuiceIds(
          juiceMap.filter(j => j.usedVolume > 0).map(j => j.id)
        );
      } catch (err) {
        console.error("Failed to load wine", err);
      } finally {
        setLoadingWine(false);
      }
    }

    loadWine();
  }, [wineId]);

  // -------------------------------
  // Fetch juices when grapes change
  // -------------------------------
  useEffect(() => {
    async function loadJuices() {
      if (selectedGrapeIds.length === 0) {
        setJuices([]);
        setSelectedJuiceIds([]);
        return;
      }

      const fetched = await fetchJuicesByGrapes(selectedGrapeIds);
      setJuices(prev =>
        fetched.map(j => {
          const existing = prev.find(p => p.id === j.id);
          return existing ?? { ...j, usedVolume: 0 };
        })
      );
    }

    loadJuices();
  }, [selectedGrapeIds]);

  // -------------------------------
  // Toggle grape
  // -------------------------------
  function toggleGrape(id: number) {
    setSelectedGrapeIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  // -------------------------------
  // Toggle juice
  // -------------------------------
  function toggleJuice(id: number) {
    setSelectedJuiceIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  // -------------------------------
  // Update used volume
  // -------------------------------
  function updateVolume(juiceId: number, value: number) {
    setJuices(prev =>
      prev.map(j =>
        j.id === juiceId
          ? { ...j, usedVolume: Math.min(value, j.volume) }
          : j
      )
    );
  }

  // -------------------------------
  // Derived values
  // -------------------------------
  const totalVolume = juices
    .filter(j => selectedJuiceIds.includes(j.id))
    .reduce((sum, j) => sum + j.usedVolume, 0);

  // -------------------------------
  // Update wine
  // -------------------------------
  async function handleUpdate() {
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
      await updateWine(wineId, dto);
      onUpdated();
      onClose();
    } catch {
      alert("Kunne ikke gemme vin");
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  // Delete wine
  // -------------------------------
  async function handleDelete() {
    try {
      await deleteWine(wineId);
      onDeleted();
      onClose();
    } catch {
      alert("Kunne ikke slette vin");
    }
  }

  if (loadingWine) return <div>Loading wine...</div>;

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="flex flex-col gap-4 p-4 min-width[400px]">
      <h2 className="text-xl font-semibold">Redigér Vin</h2>

      <input
        className="border p-2 rounded"
        value={wineName}
        onChange={e => setWineName(e.target.value)}
        placeholder="Vin navn"
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
                      onChange={e => updateVolume(j.id, Number(e.target.value))}
                      className="w-20 border rounded p-1"
                    />
                    <span>L</span>
                  </>
                )}
              </div>
            );
          })}

          <div className="text-right font-semibold">Total: {totalVolume} L</div>
        </>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Annuller
        </button>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-green-600! text-white px-4 py-2 rounded"
        >
          {loading ? "Gemmer..." : "Gem"}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600! text-white px-4 py-2 rounded"
        >
          Slet
        </button>
      </div>
    </div>
  );
}
