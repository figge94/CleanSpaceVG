import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"; // Hanterar kameraåtkomst och vy
import { useClothes } from "../data/apiData"; // Hämtar data från api

// Skärm som visar en QR-/streckkodsskanner som matchar en kod mot befintliga kläder
export default function BarcodeScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions(); // Hanterar kamerabehörighet
  const [scannedData, setScannedData] = useState(null); // Sparar resultatet om ingen matchning hittas
  const { data } = useClothes(); // Hämta alla plagg från API:t

  // Om hooken ännu inte laddat klart, returneras en tom vy
  if (!permission) {
    return <View />;
  }

  // Om kamerabehörighet inte har godkänts, visas uppmaning att tillåta
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Vi behöver tillgång till kameran</Text>
        <Button title="Tillåt kamera" onPress={requestPermission} />
      </View>
    );
  }

  // Körs när en kod skannas – letar efter matchande plagg i datan
  const handleBarcodeScanned = ({ data }) => {
    const trimmedData = data?.trim(); // Tar bort eventuella mellanslag

    if (!trimmedData) return;

    // Jämför skannad kod med barcode i kläddatan
    const foundItem = data.find((item) => item.barcode === trimmedData);

    // Navigera till detaljerad vy om en matchning hittas
    if (foundItem) {
      navigation.navigate("Details", { item: foundItem });
    } else {
      // Visa meddelande om ingen matchning hittades
      setScannedData(trimmedData);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Kameravy som skannar efter QR- och streckkoder */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "code128"] // Tillåtna kodtyper
        }}
        onBarcodeScanned={scannedData ? undefined : handleBarcodeScanned} // Inaktiverar scanning om något redan har skannats
      />

      {/* Visar ett meddelande om ingen matchning hittats */}
      {scannedData && (
        <View style={styles.overlay}>
          <Text style={styles.text}>Ingen matchning för: {scannedData}</Text>
          <Button title="Skanna igen" onPress={() => setScannedData(null)} />
        </View>
      )}
    </View>
  );
}

// Stilar för meddelande och layout
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center"
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "black"
  }
});
