import { useState } from "react";
import type { Juice, CreateJuice } from "../Services/Juice/JuiceService";
import { createJuice, updateJuiceById, deleteJuiceById } from "../Services/Juice/JuiceService";
import {
  createTasteProfileForJuice,
  editTasteProfile,
  deleteTasteProfile,
  type CreateTasteProfile,
  type TasteProfile,
} from "../Services/TasteProfile/TasteProfileService";
import settingssvg from "./../Assets/settings-svgrepo-com.svg";
import trashsvg from "./../Assets/trashsvg.svg";

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
  const [editingJuiceData, setEditingJuiceData] = useState<{ volume: number; pressedDate: string }>({
    volume: 0,
    pressedDate: "",
  });

  // Taste profile editing state
  const [editingTasteProfileId, setEditingTasteProfileId] = useState<number | null>(null);
  const [editingTasteProfiles, setEditingTasteProfiles] = useState<{ [id: number]: CreateTasteProfile }>({});

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
      setEditingJuiceData({
        volume: juice.volume,
        pressedDate: juice.pressedDate.split("T")[0],
      });
    }
  }

  async function handleEditJuice(juiceId: number) {
    await updateJuiceById(juiceId, { ...editingJuiceData, juiceTypeId, grapeId });
    setEditingJuiceId(null);
    onRefresh();
  }

  async function handleDeleteJuice(juiceId: number) {
	await deleteJuiceById(juiceId);
	onRefresh();
  }

  // Taste profile editing
  function toggleEditTasteProfile(tasteProfile: TasteProfile) {
  if (editingTasteProfileId === tasteProfile.id) {
    setEditingTasteProfileId(null);
  } else {
    setEditingTasteProfileId(tasteProfile.id);
    setEditingTasteProfiles((prev) => ({
      ...prev,
      [tasteProfile.id]: {
        ...tasteProfile,
        date: tasteProfile.date ? tasteProfile.date.split("T")[0] : "",
        description: tasteProfile.description ?? "",
      },
    }));
  }
}

async function handleAddTasteProfile(juiceId: number) {
  await createTasteProfileForJuice(juiceId, {
	sweetness: 0,
	acidity: 0,
	aroma: 0,
	dryness: 0,
	color: 0,
	rating: 0,
	description: "",
	date: new Date().toISOString().split("T")[0],
  });
  onRefresh();
}

async function handleEditTasteProfile(tasteProfileId: number) {
  await editTasteProfile(tasteProfileId, editingTasteProfiles[tasteProfileId]);
  setEditingTasteProfileId(null);
  onRefresh();
}

  async function handleDeleteTasteProfile(tasteProfileId: number) {
	await deleteTasteProfile(tasteProfileId);
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
      {juices.map((juice) => (
        <div className="grid grid-cols-2 gap-5 border rounded-lg p-6" key={juice.id}>
          {/* Juice Info */}
          <div className="col-span-2 border rounded p-2 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-4">{title}</h2>
              <button onClick={() => toggleEditJuice(juice)} className="mb-2 p-0!">
                <img src={settingssvg} alt="Indstillinger" className="w-6 h-6" />
              </button>
            </div>

            {editingJuiceId === juice.id ? (
              <div className="border rounded p-4 mb-3 bg-white">
                <p>
                  Volumen:
                  <input
                    type="number"
                    value={editingJuiceData.volume}
                    onChange={(e) =>
                      setEditingJuiceData((prev) => ({ ...prev, volume: Number(e.target.value) }))
                    }
                    className="border p-1 mb-2 w-full"
                  />
                </p>
                <p>
                  Dato:
                  <input
                    type="date"
                    value={editingJuiceData.pressedDate}
                    onChange={(e) =>
                      setEditingJuiceData((prev) => ({ ...prev, pressedDate: e.target.value }))
                    }
                    className="border p-1 mb-2 w-full"
                  />
                </p>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                  <button
                    onClick={() => handleEditJuice(juice.id)}
                    className="bg-green-600! text-white"
                  >
                    Gem
                  </button>
                  <button
                    onClick={() => setEditingJuiceId(null)}
                    className="bg-gray-300"
                  >
                    Annuller
                  </button>
				  </div>
				  <button
				  	onClick={() => handleDeleteJuice(juice.id)}
					className="bg-red-600! text-white p-0!"
					><img src={trashsvg} alt="Slet" className="w-10 h-10" /></button>
                </div>
              </div>
            ) : (
              <div>
                <p className="">Most Id: {juice.id}</p>
                <p className="">Volumen: {juice.volume} L</p>
                <p className="">Presset Dato: {juice.pressedDate.split("T")[0]}</p>
              </div>
            )}
          </div>

          {/* Taste Profiles */}
          <div className="col-start-1 mb-6 rounded-2xl border p-2 bg-gray-100">
            <h3 className=" font-semibold">Smagsprofiler: {juice.tasteProfile?.length}</h3>
            <div className="mt-2">
              {juice.tasteProfile?.length === 0 ? (
                <p className="text-sm text-gray-500">Ingen smagsprofiler endnu.</p>
              ) : (
                juice.tasteProfile?.map((tp) => (
                  <div key={tp.id} className="">
                    {editingTasteProfileId === tp.id ? (
                      <div className="border rounded p-4 mb-3 bg-white">
						<h3 className="text-lg font-semibold mb-4">Rediger Smagsprofil {tp.id}</h3>
                        <p>Dato: <input
                          type="date"
                          value={editingTasteProfiles[tp.id]?.date}
                          onChange={(e) =>
                            setEditingTasteProfiles((prev) => ({
                              ...prev,
                              [tp.id]: {
                                ...prev[tp.id],
                                date: e.target.value,
                              },
                            }))
                          }
                          className="border p-1 w-full mb-2"
                        /></p>
                        <p>Sødme: <input
                          type="number"
                          value={editingTasteProfiles[tp.id]?.sweetness ?? 0}
                          onChange={(e) =>
                            setEditingTasteProfiles((prev) => ({
                              ...prev,
                              [tp.id]: { ...prev[tp.id], sweetness: Number(e.target.value) },
                            }))
                          }
                          className="border p-1 w-full mb-2"
                        /></p>
						<p>Syre: <input
						  type="number"
						  value={editingTasteProfiles[tp.id]?.acidity ?? 0}
						  onChange={(e) =>
							setEditingTasteProfiles((prev) => ({
							  ...prev,
							  [tp.id]: { ...prev[tp.id], acidity: Number(e.target.value) },
							}))
						  }
						  className="border p-1 w-full mb-2"
                        /></p>
						<p>Aroma: <input
						  type="number"
						  value={editingTasteProfiles[tp.id]?.aroma ?? 0}
						  onChange={(e) =>
							setEditingTasteProfiles((prev) => ({
							  ...prev,
							  [tp.id]: { ...prev[tp.id], aroma: Number(e.target.value) },
							}))
						  }
						  className="border p-1 w-full mb-2"
                        /></p>
						<p>Tørhed: <input
						  type="number"
						  value={editingTasteProfiles[tp.id]?.dryness ?? 0}
						  onChange={(e) =>
							setEditingTasteProfiles((prev) => ({
							  ...prev,
							  [tp.id]: { ...prev[tp.id], dryness: Number(e.target.value) },
							}))
						  }
						  className="border p-1 w-full mb-2"
                        /></p>
						<p>Farve: <input
						  type="number"
						  value={editingTasteProfiles[tp.id]?.color ?? 0}
						  onChange={(e) =>
							setEditingTasteProfiles((prev) => ({
							  ...prev,
							  [tp.id]: { ...prev[tp.id], color: Number(e.target.value) },
							}))
						  }
						  className="border p-1 w-full mb-2"
                        /></p>
						<p>Vurdering: <input
						  type="number"
						  value={editingTasteProfiles[tp.id]?.rating ?? 0}
						  onChange={(e) =>
							setEditingTasteProfiles((prev) => ({
							  ...prev,
							  [tp.id]: { ...prev[tp.id], rating: Number(e.target.value) },
							}))
						  }
						  className="border p-1 w-full mb-2"
                        /></p>
                        <p>Beskrivelse<textarea
                          value={editingTasteProfiles[tp.id]?.description ?? ""}
                          onChange={(e) =>
                            setEditingTasteProfiles((prev) => ({
                              ...prev,
                              [tp.id]: { ...prev[tp.id], description: e.target.value },
                            }))
                          }
                          className="border p-1 w-full mb-2"
                        /></p>
						<div className="flex justify-between">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTasteProfile(tp.id)}
                            className="bg-green-600! text-white"
                          >
                            Gem
                          </button>
                          <button
                            onClick={() => setEditingTasteProfileId(null)}
                            className=""
                          >
                            Annuller
                          </button>
						  </div>
						  <button
						  	onClick={() => handleDeleteTasteProfile(tp.id)}
							className="bg-red-600! text-white p-0!"
						  ><img src={trashsvg} alt="Slet" className="w-7 h-7" /></button>
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded p-4 mb-3">
                        <div className="flex items-center justify-between">
                          <h3>Smagsprofil {tp.id}</h3>
                          <button
                            className="w-8 mb-2 p-0!"
                            onClick={() => toggleEditTasteProfile(tp)}
                          >
                            <img src={settingssvg} alt="Indstillinger" />
                          </button>
                        </div>
                        <p>
                          <strong>Dato:</strong> {tp.date?.split("T")[0]}
                        </p>
                        <p>
                          <strong>Sødme:</strong> {tp.sweetness}
                        </p>
                        <p>
                          <strong>Syre:</strong> {tp.acidity}
                        </p>
                        <p>
                          <strong>Aroma:</strong> {tp.aroma}
                        </p>
                        <p>
                          <strong>Tørhed:</strong> {tp.dryness}
                        </p>
                        <p>
                          <strong>Farve:</strong> {tp.color}
                        </p>
                        <p>
                          <strong>Rating:</strong> {tp.rating}
                        </p>
                        <p>
                          <strong>Beskrivelse:</strong> {tp.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => handleAddTasteProfile(juice.id)}
              className="mb-2 bg-green-600! text-white"
            >
              Tilføj Smagsprofil
            </button>
          </div>

          {/* Additives placeholder */}
          <div className="col-start-2 mb-6 rounded-2xl border p-2 bg-gray-100">
            <h3 className="text-md font-semibold">Tilsætningsstoffer: </h3>
            <button className="mb-2 bg-green-600! text-white">
              Tilføj Tilsætningsstoffer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
