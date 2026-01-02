import { useState } from "react";
import { updateGrapeById, deleteGrapeById } from "../Services/Grape/GrapeServices";

type Props = {
  grape: { GrapeId: number; GrapeName: string };
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditGrapeDialogContent({ grape, onClose, onUpdated }: Props) {
  const [name, setName] = useState(grape.GrapeName);

  async function handleSave() {
    await updateGrapeById({ GrapeId: grape.GrapeId, GrapeName: name });
    onUpdated();
    onClose();
  }

  async function handleDelete() {
    await deleteGrapeById(grape.GrapeId);
    onUpdated();
    onClose();
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
      <div className="flex gap-2">
        <button onClick={handleSave} className="bg-green-600! text-white px-4 py-2 rounded-lg">
          Gem
        </button>
        <button onClick={handleDelete} className="bg-red-600! text-white px-4 py-2 rounded-lg">
          Slet
        </button>
      </div>
    </div>
  );
}
