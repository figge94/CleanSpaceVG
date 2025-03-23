// 🔄 useClothes – en custom hook som hanterar all kommunikation med kläd-API:et
// Den returnerar data, laddningsstatus, felhantering samt funktioner för CRUD (Create, Read, Update, Delete)
import { useState, useEffect } from "react";

export function useClothes() {
  // Variabler för att hålla data, laddningsstatus och felmeddelanden
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funktion för att hämta kläder från API:et
  const fetchClothes = async () => {
    try {
      setLoading(true); // Startar laddning
      setError(null); // Rensar tidigare fel
      const res = await fetch("https://mitt-api.findersson.se/items");
      if (!res.ok) throw new Error("Fel vid hämtning"); // Felhantering
      const json = await res.json(); // Konverterar JSON
      setData(json); // Sparar data i state
    } catch (err) {
      setError(err.message); // Sparar felmeddelande i state
    } finally {
      setLoading(false); // Avslutar laddning
    }
  };

  // Hämtar datan första gången hooken används
  useEffect(() => {
    fetchClothes();
  }, []);

  // Skapar nytt plagg (POST)
  const createItem = async (newItem) => {
    const res = await fetch("https://mitt-api.findersson.se/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem)
    });
    await fetchClothes(); // Hämta ny data efter skapande
  };

  // Uppdaterar befintligt plagg (PUT)
  const updateItem = async (id, updatedItem) => {
    const res = await fetch(`https://mitt-api.findersson.se/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem)
    });
    await fetchClothes(); // Uppdatera listan efter ändring
  };

  // Tar bort plagg (DELETE)
  const deleteItem = async (id) => {
    const res = await fetch(`https://mitt-api.findersson.se/items/${id}`, {
      method: "DELETE"
    });
    await fetchClothes(); // Uppdatera listan efter borttagning
  };

  // Returnerar data, laddningsstatus, felmeddelande samt funktioner för CRUD
  return {
    data,
    isLoading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchClothes // Exponerar fetchClothes för manuell omladdning
  };
}
