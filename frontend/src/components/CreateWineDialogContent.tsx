import { useState, useEffect } from "react";
import { fetchGrapes, type Grape } from "../Services/Grape/GrapeServices";
import { createWine, type WineDTO } from "../Services/Wine/WineServices";
import { fetchJuicesByGrapes, type Juice } from "../Services/Juice/JuiceService";

type CreateWineDialogContentProps = {
  onClose: () => void;
  onCreated: (wineId: number) => void;
};

type JuiceWithPercentage = Juice & { percentage: number };

export default function CreateWineDialogContent({
  onClose,
  onCreated,
}: CreateWineDialogContentProps) {
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [selectedGrapeIds, setSelectedGrapeIds] = useState<number[]>([]);

  const [juices, setJuices] = useState<JuiceWithPercentage[]>([]);
  const [selectedJuiceIds, setSelectedJuiceIds] = useState<number[]>([]);

  const [wineName, setWineName] = useState("");
  const [vintageYear, setVintageYear] = useState<number>(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Fetch grapes
  // -------------------------------
  useEffect(() => {
    async function loadGrapes() {
      try {
        setGrapes(await fetchGrapes());
      } catch (err) {
        console.error("Failed to fetch grapes", err);
      }
    }
    loadGrapes();
  }, []);

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

      try {
        const fetched = await fetchJuicesByGrapes(selectedGrapeIds);
        setJuices(fetched.map(j => ({ ...j, percentage: 0 })));
        setSelectedJuiceIds([]);
      } catch (err) {
        console.error("Failed to fetch juices", err);
      }
    }
    loadJuices();
  }, [selectedGrapeIds]);

  // -------------------------------
  // Toggle grape
  // -------------------------------
  function toggleGrapeSelection(grapeId: number) {
    setSelectedGrapeIds(prev =>
      prev.includes(grapeId)
        ? prev.filter(id => id !== grapeId)
        : [...prev, grapeId]
    );
  }

  // -------------------------------
  // Toggle juice (IDENTICAL pattern)
  // -------------------------------
  function toggleJuiceSelection(juiceId: number) {
    setSelectedJuiceIds(prev =>
      prev.includes(juiceId)
        ? prev.filter(id => id !== juiceId)
        : [...prev, juiceId]
    );
  }

  // -------------------------------
  // Normalize percentages
  // -------------------------------
  useEffect(() => {
    if (selectedJuiceIds.length === 0) {
      setJuices(prev => prev.map(j => ({ ...j, percentage: 0 })));
      return;
    }

    const equal = Math.floor(100 / selectedJuiceIds.length);
    const remainder = 100 - equal * selectedJuiceIds.length;

    let remainderGiven = false;

    setJuices(prev =>
      prev.map(j => {
        if (!selectedJuiceIds.includes(j.id)) {
          return { ...j, percentage: 0 };
        }

        if (!remainderGiven) {
          remainderGiven = true;
          return { ...j, percentage: equal + remainder };
        }

        return { ...j, percentage: equal };
      })
    );
  }, [selectedJuiceIds]);

  // -------------------------------
  // Manual slider change
  // -------------------------------
  function handleSliderChange(juiceId: number, value: number) {
    setJuices(prev =>
      prev.map(j =>
        j.id === juiceId ? { ...j, percentage: value } : j
      )
    );
  }

  // -------------------------------
  // Submit
  // -------------------------------
  async function handleSubmit() {
    try {
      setLoading(true);

      const selectedJuices = juices
        .filter(j => selectedJuiceIds.includes(j.id) && j.percentage > 0)
        .map(j => ({
          JuiceId: j.id,
          Percentage: j.percentage,
        }));

      if (!wineName || selectedJuices.length === 0) {
        alert("Provide a wine name and select at least one juice");
        return;
      }

      const wineDto: WineDTO = {
        WineName: wineName,
        VintageYear: vintageYear,
        Juices: selectedJuices,
      };

      const wineId = await createWine(wineDto);
      onCreated(wineId);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create wine");
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="flex flex-col gap-4 p-4 min-width[400px]">
      <h2 className="text-xl font-semibold">Create Wine</h2>

      <label>
        Wine Name:
        <input
          className="border p-1 rounded w-full"
          value={wineName}
          onChange={e => setWineName(e.target.value)}
        />
      </label>

      <label>
        Vintage Year:
        <input
          type="number"
          className="border p-1 rounded w-full"
          value={vintageYear}
          onChange={e => setVintageYear(Number(e.target.value))}
        />
      </label>

      <h3 className="font-semibold">Select Grapes</h3>
      <div className="flex flex-wrap gap-2">
        {grapes.map(g => (
          <button
            key={g.GrapeId}
            onClick={() => toggleGrapeSelection(g.GrapeId)}
            className={`px-3 py-1 border rounded ${
              selectedGrapeIds.includes(g.GrapeId)
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {g.GrapeName}
          </button>
        ))}
      </div>

      {juices.length > 0 && (
        <>
          <h3 className="font-semibold">Select Juices</h3>

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
                  Grape:{juice.grapeId} · {juice.volume}L · Type:{juice.juiceTypeId}
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

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Creating..." : "Create Wine"}
        </button>
      </div>
    </div>
  );
}
