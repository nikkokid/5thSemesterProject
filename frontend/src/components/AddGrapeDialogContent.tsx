import { useState } from "react";
import { createGrape } from "../Services/Grape/GrapeServices";

type Props = {
  onClose: () => void;
  onAdded: () => void;
};

export default function AddGrapeDialogContent({ onClose, onAdded }: Props) {
  const [grapeName, setGrapeName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!grapeName.trim()) return;

    setIsSaving(true);
    await createGrape({ grapeName });
    setIsSaving(false);

    onAdded(); // reload grapes
    onClose(); // close dialog
  }

  return (
    <div className="p-4 min-width-[300px]">
      <h2 className="text-xl font-semibold mb-4">Tilføj druesort</h2>

      <input
        type="text"
        placeholder="Navn på druesort"
        value={grapeName}
        onChange={(e) => setGrapeName(e.target.value)}
        className="border rounded w-full p-2 mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-green-600! text-white px-4 py-2 rounded"
        >
          Gem
        </button>
      </div>
    </div>
  );
}
