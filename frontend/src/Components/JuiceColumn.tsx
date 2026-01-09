import { useState } from "react";
import { createJuice, updateJuiceById, deleteJuiceById, type Juice, type CreateJuice } from "../Services/Juice/JuiceService";
import AdditiveList from "./AdditiveList";
import AdditiveLineList from "./AdditiveLineList";
import TasteProfileList from "./TasteProfileList";
import settingssvg from "./../assets/settings-svgrepo-com.svg";
import trashsvg from "./../assets/trashsvg.svg";

type Props = {
  title: string;
  juiceTypeId: number;
  grapeId: number;
  year: number;
  juices: Juice[];
  onRefresh: () => void;
};

export default function JuiceColumn({
  title,
  juiceTypeId,
  grapeId,
  year,
  juices,
  onRefresh,
}: Props) {
  // Juice editing state
  const [editingJuiceId, setEditingJuiceId] = useState<number | null>(null);

  // Add a new juice
  async function handleAddJuice() {
    const pressedDate = `${year}-01-01`;
    await createJuice({ juiceTypeId, grapeId, pressedDate, volume: 0 });
    onRefresh();
  }

  // Toggle juice editing and initialize state
  function toggleEditJuice(juice: Juice) {
    if (editingJuiceId === juice.id) {
      setEditingJuiceId(null);
    } else {
      setEditingJuiceId(juice.id);
    }
  }

  async function handleEditJuice(juiceId: number, formData: any) {
    const juice: CreateJuice = {
      volume: Number(formData.get("editedJuiceVolume")),
      pressedDate: formData.get("editedJuiceDate"),
      juiceTypeId,
      grapeId
    };
    await updateJuiceById(juiceId, juice);

    setEditingJuiceId(null);
    onRefresh();
  }

  async function handleDeleteJuice(juiceId: number) {
	await deleteJuiceById(juiceId);
	onRefresh();
  }
  if (juices.length === 0) {
    return (
      <div className="border rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 mt-4">Ingen most endnu</p>
        <button
          onClick={handleAddJuice}
          className=" bg-green-600! text-white"
        >
          Tilføj {title}
        </button>
      </div>
    );
  }
  return (
    <div>
      {juices?.map((juice) => (
        <div className="grid grid-cols-2 gap-5 border rounded-lg p-6" key={juice.id}>
          {/* Juice Info */}
          <div className="col-span-2 border bg-gray-100 rounded-lg p-2 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-4">{title}</h2>
              <button onClick={() => toggleEditJuice(juice)} className="mb-2 p-0!">
                <img src={settingssvg} alt="Indstillinger" className="w-9 h-9" />
              </button>
            </div>

            {editingJuiceId === juice.id ? (
              <div className="border rounded p-4 mb-3 bg-white">
                <h3 className="text-lg font-semibold- mb-4"> Rediger Most {juice.id}</h3>
                <form action={(formData => handleEditJuice(juice.id, formData))} className="flex flex-col">
                  <p>Volumen:<input type="number" name="editedJuiceVolume" defaultValue={juice.volume}
                      className="border p-1 mb-2 w-full"
                  /></p>
                  <p>Dato:<input type="date" name="editedJuiceDate" defaultValue={juice.pressedDate.split("T")[0]}
                      className="border p-1 mb-2 w-full"
                  /></p>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <button type="submit" className="bg-green-600! text-white">
                        Gem
                      </button>
                      <button onClick={() => setEditingJuiceId(null)} className="bg-gray-500! text-white">
                        Annuller
                      </button>
				            </div>
				            <button onClick={() => handleDeleteJuice(juice.id)} className="bg-red-600! text-white p-0!">
                      <img src={trashsvg} alt="Slet" className="w-10 h-10" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <p className="">Volumen: {juice.volume} L</p>
                <p className="">Presset Dato: {juice.pressedDate.split("T")[0]}</p>
              </div>
            )}
          </div>

          {/* Taste Profiles */}
          <TasteProfileList juiceId={juice.id}/>

          {/* Additives section */}
          <AdditiveLineList juiceId={juice.id}/>
        </div>
      ))}
    </div>
  );
}
