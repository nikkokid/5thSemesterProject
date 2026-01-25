import { useState } from "react";
import { useParams } from "react-router-dom";
import { createJuice } from "../Services/Juice/JuiceService";

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

export default function AddJuiceDialogContent({onClose, onCreated} : Props){
  const { grapeId } = useParams(); 
  const [volume, setJuiceVolume] = useState(0);
  const [juiceTypeId, setJuiceTypeId] = useState(1);
  const [pressedDate, setPressedDate] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  async function handleSave(){
    if (!grapeId) {
      setError("Kan ikke finde druesort");
      return;
    }

    if (!pressedDate) {
      setError("Dato skal udfyldes");
      return;
    }

    if (volume <= 0) {
      setError("Volumen skal være højere end 0");
      return;
    }

    await createJuice({ juiceTypeId, grapeId: Number(grapeId), pressedDate, volume});
    onCreated(); // reload grapes
    onClose(); // close dialog
  }
  
  
  return (
    
    <div className="p-4">
      {error && (
          <p className="">{error}</p>
      )}

      <h2 className="text-xl font-semibold mb-4">Tilføj Most</h2>
      <label className="block mb-1 font-medium">Most type</label>
      <select
        value={juiceTypeId}
        onChange={(e) => {setJuiceTypeId(Number(e.target.value)); setError(null)}}
        className="border rounded w-full p-2 mb-4"
      >
        <option value={1}> Presset Most</option>
        <option value={2}> Gennemløbet Most</option>
      </select>

      <input
        type="number"
        placeholder="0"
        value={volume}
        onChange={(e) => {setJuiceVolume(Number(e.target.value)); setError(null)}}
        className="border rounded w-full p-2 mb-4"
      />
      <input 
        type="date"
        value={pressedDate}
        onChange={(e) => {setPressedDate(e.target.value); setError(null)}}
        className="border rounded p-2 mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="bg-gray-400! text-white px-4 py-2 rounded"
        >
          Annuller
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600! text-white px-4 py-2 rounded"
        >
          Gem
        </button>

      </div>
    </div>
  );
}