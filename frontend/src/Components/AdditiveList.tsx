import { createAdditiveForJuice, getAdditivesByJuiceId, updateAdditiveById, deleteAdditiveById} from "../Services/Additive/AdditiveService";
import type { Additive, CreateAdditive } from "../Services/Additive/AdditiveService";
import { useEffect, useState } from "react";
import settingssvg from "./../assets/settings-svgrepo-com.svg";
import trashsvg from "./../assets/trashsvg.svg";


type AdditiveListProps = {
    juiceId: number;

}

export default function AdditiveList({ juiceId }: AdditiveListProps) {
    const [additives, setAdditives] = useState<Additive[]>([]);

    // Which additive is being edited, if null, none are being edited
    const [editingAdditiveId, setEditingAdditiveId] = useState<number | null>(null);


    async function loadAdditives() {
      const data = await getAdditivesByJuiceId(juiceId);
      setAdditives(data);
    }

    useEffect(() => {
      loadAdditives();
    },[juiceId]);
    

    async function handleAddAdditive(juiceId: number) {
        await createAdditiveForJuice(juiceId, {
            name: "Ny Additiv",
            amount: 0,
            description: "Beskrivelse",
            date: new Date().toISOString().split('T')[0], 
        });
        await loadAdditives();
    }

    function toggleEditAdditive(additive: Additive) {
        if (editingAdditiveId === additive.id) {
            setEditingAdditiveId(null);
        } else {
            setEditingAdditiveId(additive.id);
            
        }
    };

    async function handleEditAdditive(additiveId: number, formData: any) {
        const additive: CreateAdditive = {
          name: formData.get("editedAdditiveName"),
          amount: Number(formData.get("editedAdditiveAmount")),
          description: formData.get("editedAdditiveDescription"),
          date: formData.get("editedAdditiveDate")
        };
        await updateAdditiveById(additiveId, additive);

        setEditingAdditiveId(null);
        await loadAdditives();
    }


    async function handleDeleteAdditive(additiveId: number) {
      if (!editingAdditiveId) return;
      await deleteAdditiveById(additiveId);
      setEditingAdditiveId(null);
      await loadAdditives();
    }

    return (
        <div className="col-start-2 mb-6 rounded-2xl border p-2 bg-gray-100">
          <h3 className="border-b-4 font-semibold pb-2">Tilsætningsstoffer: {additives.length} </h3>
          <div className="mt-2">
            {additives.length === 0 ? (
              <p className="text-sm text-gray-500">Ingen tilsætningsstoffer endnu.</p>
            ) : (
                additives.map(additive => (
                  <div key={additive.id} className="border-b-2 p-4 mb-3">
                    <div className="flex items-center justify-between"/>
                      {editingAdditiveId === additive.id ? (
                        <div className="border rounded p-4 mb-3 bg-white">
                        <h3>Rediger Tilsætningsstof {additive.id}</h3>
                        <form action={(formData) => handleEditAdditive(additive.id, formData)} className="flex flex-col">
                            <p>Dato: <input type="date" name="editedAdditiveDate" defaultValue={additive.date.split("T")[0]} className="border"/></p>
                            <p>Navn: <input type="text" name="editedAdditiveName" defaultValue={additive.name} className="border"/></p>
                            <p>Mængde: <input type="number" name="editedAdditiveAmount" defaultValue={additive.amount} className="border"/></p>
                            <p>Beskrivelse: <input type="text" name="editedAdditiveDescription" defaultValue={additive.description} className="border"/></p>
                          
                            <div className="flex justify-between">
                              <div className="flex gap-2">
                                <button type="submit" className=" bg-green-500! text-white">Gem</button>
                                <button type="button" onClick={() => toggleEditAdditive(additive)} className="bg-gray-500! text-white">Annuller</button>
                              </div>
                              <button type="button" onClick={() => handleDeleteAdditive(additive.id)} className="bg-red-600! text-white p-0!">
                                <img src={trashsvg} className="w-8 h-8"></img>
                              </button>
                            </div>
                        </form>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <h3>Tilsætningsstof {additive.id}</h3>
                            <button
                              className="w-8 mb-2 p-0!"
                              onClick={() => toggleEditAdditive(additive)}
                            >
                              <img src={settingssvg} alt="Indstillinger" />
                            </button>
                          </div>
                          <p><strong>Dato:</strong> {additive.date?.split("T")[0]}</p>
                          <p><strong>Navn:</strong> {additive.name}</p>
                          <p><strong>Mængde:</strong> {additive.amount}</p>
                          <p><strong>Beskrivelse:</strong> {additive.description}</p>
                        </>
                      )}
                  </div>
                ))
              
            )}
          </div>

          <div>
            <button
              onClick={() => handleAddAdditive(juiceId)}
              className="mb-2 bg-green-600! text-white"
            >
              Tilføj Tilsætningsstof
            </button>
          </div>
        </div>
    );
  }