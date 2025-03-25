import { Alert } from "react-native";

/**
 * Custom hook för att visa en bekräftelsedialog och radera ett plagg.
 * @param {Function} deleteItemFn - Funktion som raderar ett plagg via API.
 * @param {object} navigation - Navigation-objekt från React Navigation.
 */
export default function useDeleteConfirmation(deleteItemFn, navigation) {
  return (itemId) => {
    Alert.alert(
      "Ta bort plagg",
      "Är du säker på att du vill ta bort detta plagg?",
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Ta bort",
          onPress: async () => {
            try {
              await deleteItemFn(itemId);
              navigation.goBack();
            } catch (err) {
              Alert.alert("Fel!", "Kunde inte ta bort plagget.");
              console.error(err);
            }
          },
          style: "destructive"
        }
      ]
    );
  };
}
