import { Alert } from "react-native";

/**
 * Hook för att visa en bekräftelsedialog och radera ett objekt.
 * @param {Function} deleteFn - Funktion som raderar objektet via API.
 * @param {Function} [onSuccess] - Funktion som körs efter lyckad radering.
 * @returns {Function} confirmDelete - Funktion som visar bekräftelseruta.
 */
export default function useDeleteConfirmation(deleteFn, onSuccess) {
  return (itemId, options = {}) => {
    const {
      title = "Ta bort",
      message = "Är du säker på att du vill ta bort detta objekt?",
      successMessage = "Objektet togs bort."
    } = options;

    Alert.alert(title, message, [
      { text: "Avbryt", style: "cancel" },
      {
        text: "Ta bort",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteFn(itemId);
            if (onSuccess) onSuccess();
            console.log(successMessage);
          } catch (err) {
            Alert.alert("Fel", "Kunde inte ta bort objektet.");
            console.error(err);
          }
        }
      }
    ]);
  };
}
