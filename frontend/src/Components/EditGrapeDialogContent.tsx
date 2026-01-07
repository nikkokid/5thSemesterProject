import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateGrapeById, deleteGrapeById } from "../Services/Grape/GrapeServices";

type Props = {
  grape: { GrapeId: number; GrapeName: string };
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditGrapeDialogContent({ grape, onClose, onUpdated }: Props) {
  const [name, setName] = useState(grape.GrapeName);
  const navigate = useNavigate();

  async function handleSave() {
    await updateGrapeById({ GrapeId: grape.GrapeId, GrapeName: name });
    onUpdated();
    onClose();
  }

  async function handleDelete() {
    await deleteGrapeById(grape.GrapeId);
    onClose();
    navigate(-1);
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Rediger druesort</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="flex justify-between gap-2">
        <button onClick={handleDelete} className="bg-red-600! text-white px-4 py-2 rounded-lg">
          Slet
        </button>
        <button onClick={handleSave} className="bg-green-600! text-white px-4 py-2 rounded-lg">
          Gem
        </button>
      </div>
    </div>
  );
}
