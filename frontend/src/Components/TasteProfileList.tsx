import { useEffect, useState } from "react";
import {createTasteProfileForJuice, getTasteProfilesByJuiceId, updateTasteProfile, deleteTasteProfile,
  type CreateTasteProfile, type TasteProfile}
  from "../Services/TasteProfile/TasteProfileService";
import settingssvg from "./../assets/settings-svgrepo-com.svg";
import trashsvg from "./../assets/trashsvg.svg";

  type TasteProfileListProps = {
    juiceId: number;
}

export default function TasteProfileList({ juiceId }: TasteProfileListProps) {
    const [tasteProfiles, setTasteProfiles] = useState<TasteProfile[]>([]);

    // Which taste profile is being edited, if null, none are being edited
    const [editingTasteProfileId, setEditingTasteProfileId] = useState<number | null>(null);

    async function loadTasteProfiles() {
      const data = await getTasteProfilesByJuiceId(juiceId);
      setTasteProfiles(data);
    }
    
    useEffect(() => {
        loadTasteProfiles();
    }, [juiceId]);
    
    async function handleAddTasteProfile(juiceId: number) {
        await createTasteProfileForJuice(juiceId, {
            sweetness: 0,
            acidity: 0,
            aroma: 0,
            dryness: 0,
            color: 0,
            description: "Ny Smagsprofil",
            rating: 0,
            date: new Date().toISOString().split('T')[0], 
        });
        await loadTasteProfiles();
    }
    //mangler lige nogle metoder

    async function toggleEditTasteProfile(tasteProfile: TasteProfile) {
        if (editingTasteProfileId === tasteProfile.id) {
            setEditingTasteProfileId(null);
        } else {
            setEditingTasteProfileId(tasteProfile.id);
        }
    };

    async function handleEditTasteProfile(tasteProfileId: number, formData: any) {
      const tasteProfile: CreateTasteProfile = {
        sweetness: Number(formData.get("editedTasteProfileSweetness")),
        acidity: Number(formData.get("editedTasteProfileAcidity")),
        aroma: Number(formData.get("editedTasteProfileAroma")),
        dryness: Number(formData.get("editedTasteProfileDryness")),
        color: Number(formData.get("editedTasteProfileColor")),
        description: formData.get("editedTasteProfileDescription"),
        rating: Number(formData.get("editedTasteProfileRating")),
        date: formData.get("editedTasteProfileDate")
      };
      await updateTasteProfile(tasteProfileId, tasteProfile);
      
      setEditingTasteProfileId(null);
      await loadTasteProfiles();
    }

    async function handleDeleteTasteProfile(tasteProfileId: number) {
      if (!editingTasteProfileId) return;
      await deleteTasteProfile(tasteProfileId);
      setEditingTasteProfileId(null);
      await loadTasteProfiles();
    }

    return (
      <div className="col-start-1 mb-6 rounded-2xl border p-2 bg-gray-100">
            <h3 className=" border-b-4 font-semibold pb-2">Smagsprofiler: {tasteProfiles?.length}</h3>
            <div className="mt-2">
              {tasteProfiles?.length === 0 ? (
                <p className="text-sm text-gray-500">Ingen smagsprofiler endnu.</p>
              ) : (
                tasteProfiles?.map((tasteProfile) => (
                  <div key={tasteProfile.id} className="border-b-2 p-2 mb-3">
                    {editingTasteProfileId === tasteProfile.id ? (
                      <div className="border rounded p-4 mb-3 bg-white">
						            <h3 className="text-lg font-semibold mb-4">Rediger Smagsprofil {tasteProfile.id}</h3>
                        <form action={(formData) => handleEditTasteProfile(tasteProfile.id, formData)} className="flex flex-col">
                        <p>Dato: <input type="date" name="editedTasteProfileDate" defaultValue={tasteProfile.date.split("T")[0]} className="border"/></p>
                        <p>Sødme: <input type="number" name="editedTasteProfileSweetness" defaultValue={tasteProfile.sweetness} className="border"/></p>
                        <p>Syre: <input type="number" name="editedTasteProfileAcidity" defaultValue={tasteProfile.acidity} className="border"/></p>
                        <p>Aroma: <input type="number" name="editedTasteProfileAroma" defaultValue={tasteProfile.aroma} className="border"/></p>
                        <p>Tørhed: <input type="number" name="editedTasteProfileDryness" defaultValue={tasteProfile.dryness} className="border"/></p>
                        <p>Color: <input type="number" name="editedTasteProfileColor" defaultValue={tasteProfile.color} className="border"/></p>
                        <p>Vurdering: <input type="number" name="editedTasteProfileRating" defaultValue={tasteProfile.rating} className="border"/></p>
                        <p>Beskrivelse: <input type="text" name="editedTasteProfileDescription" defaultValue={tasteProfile.description} className="border"/></p>
                        <div className="flex justify-between">
                          <div className="flex gap-2">
                          <button type="submit" className="bg-green-500! text-white">Gem</button>
                          <button onClick={() => toggleEditTasteProfile(tasteProfile)} className="bg-gray-500! text-white">Annuller</button>
                          </div>
                          <button onClick={() => handleDeleteTasteProfile(tasteProfile.id)} className="bg-red-600! text-white p-0!">
                            <img src={trashsvg} className="w-8 h-8"></img>
                          </button>
                        </div>
                        </form>
                      </div>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <p><h3>Smagsprofil {tasteProfile.id}</h3>
                            </p><button
                              className="w-8 mb-2 p-0!"
                              onClick={() => toggleEditTasteProfile(tasteProfile)}
                            >
                              <img src={settingssvg} alt="Indstillinger" />
                            </button>
                          </div>
                          <p><strong>Dato:</strong> {tasteProfile.date?.split("T")[0]}</p>
                          <p><strong>Sødme:</strong> {tasteProfile.sweetness}</p>
                          <p><strong>Syre:</strong> {tasteProfile.acidity}</p>
                          <p><strong>Aroma:</strong> {tasteProfile.aroma}</p>
                          <p><strong>Tørhed:</strong> {tasteProfile.dryness}</p>
                          <p><strong>Farve:</strong> {tasteProfile.color}</p>
                          <p><strong>Vurdering:</strong> {tasteProfile.rating}</p>
                          <p><strong>Beskrivelse:</strong> {tasteProfile.description}</p>
                        </>
                      )}
                      </div>
              )))}
              </div>
          
            
            <button
              onClick={() => handleAddTasteProfile(juiceId)}
              className="bg-green-600! text-white"
            >
            Tilføj Smagsprofil
            </button>
      </div>
    );
}