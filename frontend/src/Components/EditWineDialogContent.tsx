import { useEffect, useState } from "react";
import { fetchGrapes, type Grape } from "../Services/Grape/GrapeServices";
import {
  fetchWineById,
  updateWine,
  deleteWine,
  type WineDTO,
} from "../Services/Wine/WineServices";
import { fetchJuicesByGrapes, type Juice } from "../Services/Juice/JuiceService";

type EditWineDialogContentProps = {
  wineId: number;
  onClose: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
};

type JuiceWithPercentage = Juice & { percentage: number };

export default function EditWineDialogContent({
  wineId,
  onClose,
  onUpdated,
  onDeleted,
}: EditWineDialogContentProps) {
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [selectedGrapeIds, setSelectedGrapeIds] = useState<number[]>([]);

  const [juices, setJuices] = useState<JuiceWithPercentage[]>([]);
  const [selectedJuiceIds, setSelectedJuiceIds] = useState<number[]>([]);

  const [wineName, setWineName] = useState("");
  const [vintageYear, setVintageYear] = useState<number>(
    new Date().getFullYear()
  );

  const [loading, setLoading] = useState(false);
  const [loadingWine, setLoadingWine] = useState(true);

  // ----------------------------------
  // Fetch grapes
  // ----------------------------------
  useEffect(() => {
    fetchGrapes().then(setGrapes).catch(console.error);
  }, []);

  // ----------------------------------
  // Fetch wine + initialize state
  // ----------------------------------
  useEffect(() => {
    async function loadWine() {
      try {
        const details = await fetchWineById(wineId);

        if (details.length === 0) return;

        setWineName(details[0].WineName);
        setVintageYear(details[0].VintageYear);

        const grapeIds = [...new Set(details.map(d => d.GrapeId))];
        setSelectedGrapeIds(grapeIds);

        const fetchedJuices = await fetchJuicesByGrapes(grapeIds);

        const juiceMap: JuiceWithPercentage[] = fetchedJuices.map(j => {
          const match = details.find(d => d.JuiceId === j.id);
          return {
            ...j,
            percentage: match ? match.Percentage : 0,
          };
        });

        setJuices(juiceMap);
        setSelectedJuiceIds(
          juiceMap.filter(j => j.percentage > 0).map(j => j.id)
        );
      } catch (err) {
        console.error("Failed to load wine", err);
      } finally {
        setLoadingWine(false);
      }
    }

    loadWine();
  }, [wineId]);

  // ----------------------------------
  // Fetch juices when grapes change
  // ----------------------------------
  useEffect(() => {
    async function loadJuices() {
      if (selectedGrapeIds.length === 0) {
        setJuices([]);
        setSelectedJuiceIds([]);
        return;
      }

      const fetched = await fetchJuicesByGrapes(selectedGrapeIds);
      setJuices(prev => {
        return fetched.map(j => {
          const existing = prev.find(p => p.id === j.id);
          return existing ?? { ...j, percentage: 0 };
        });
      });
    }

    loadJuices();
  }, [selectedGrapeIds]);

  // ----------------------------------
  // Toggle grape
  // ----------------------------------
  function toggleGrapeSelection(grapeId: number) {
    setSelectedGrapeIds(prev =>
      prev.includes(grapeId)
        ? prev.filter(id => id !== grapeId)
        : [...prev, grapeId]
    );
  }

  // ----------------------------------
  // Toggle juice
  // ----------------------------------
  function toggleJuiceSelection(juiceId: number) {
    setSelectedJuiceIds(prev =>
      prev.includes(juiceId)
        ? prev.filter(id => id !== juiceId)
        : [...prev, juiceId]
    );
  }

  // ----------------------------------
  // Manual slider change
  // ----------------------------------
  function handleSliderChange(juiceId: number, value: number) {
    setJuices(prev =>
      prev.map(j => (j.id === juiceId ? { ...j, percentage: value } : j))
    );
  }

  // ----------------------------------
  // Update
  // ----------------------------------
  async function handleUpdate() {
    try {
      setLoading(true);

      const selectedJuices = juices
        .filter(j => selectedJuiceIds.includes(j.id))
        .map(j => ({
          JuiceId: j.id,
          Percentage: j.percentage,
        }));

      const total = selectedJuices.reduce(
        (sum, j) => sum + j.Percentage,
        0
      );

      if (total < 99 || total > 100) {
        alert("Juice percentages must add up to 100%");
        return;
      }

      const dto: WineDTO = {
        WineName: wineName,
        VintageYear: vintageYear,
        Juices: selectedJuices,
      };

      await updateWine(wineId, dto);
      onUpdated();
      onClose();
    } catch {
      alert("Failed to update wine");
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------------
  // Delete
  // ----------------------------------
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this wine?")) return;

    try {
      await deleteWine(wineId);
      onDeleted();
      onClose();
    } catch {
      alert("Failed to delete wine");
    }
  }

  if (loadingWine) return <div>Loading wine...</div>;

  // ----------------------------------
  // UI
  // ----------------------------------
  return (
    <div className="flex flex-col gap-4 p-4 min-width-[400px]">
      <h2 className="text-xl font-semibold">Redigér Vin</h2>

      <label>
        Vin Navn:
        <input
          className="border p-1 rounded w-full"
          value={wineName}
          onChange={e => setWineName(e.target.value)}
        />
      </label>

      <label>
        Årgang:
        <input
          type="number"
          className="border p-1 rounded w-full"
          value={vintageYear}
          onChange={e => setVintageYear(Number(e.target.value))}
        />
      </label>

      <h3 className="font-semibold">Vælg Druer</h3>
      <div className="flex flex-wrap gap-2">
        {grapes.map(g => (
          <button
            key={g.GrapeId}
            onClick={() => toggleGrapeSelection(g.GrapeId)}
            className={`px-3 py-1 border rounded ${
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
          <h3 className="font-semibold">Vælg Saft</h3>

          {juices.map(juice => {
            const selected = selectedJuiceIds.includes(juice.id);

            return (
              <div
                key={juice.id}
                className="flex items-center gap-2 border rounded p-2"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleJuiceSelection(juice.id)}
                />

                <span className="flex-1">
                  Drue:{juice.grapeId} · {juice.volume}L
                </span>

                {selected && (
                  <>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={juice.percentage}
                      onChange={e =>
                        handleSliderChange(
                          juice.id,
                          Number(e.target.value)
                        )
                      }
                    />
                    <span>{juice.percentage}%</span>
                  </>
                )}
              </div>
            );
          })}
        </>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600! text-white rounded"
        >
          Slet
        </button>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600! text-white rounded"
          >
            {loading ? "Gemmer..." : "Gem Ændringer"}
          </button>
        </div>
      </div>
    </div>
  );
}
