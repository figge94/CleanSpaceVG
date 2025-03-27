import { useContext } from "react";
import { Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SettingsContext } from "../context/SettingsContext"; // Hanterar tema och mörkt/ljust läge
import { buttonStyles, globalStyles, imageStyles } from "../styles/styles"; // Gemensamma bildstilar
import { Button } from "../components";

// Skärm som visar användarens profilinformation samt inställningar
export default function ProfileScreen({ navigation }) {
  const { darkMode, toggleDarkMode, theme } = useContext(SettingsContext);

  return (
    // Hela sidan får bakgrundsfärg baserat på aktuellt tema
    <View
      style={[globalStyles.container, { backgroundColor: theme.background }]}>
      {/* Profilbild */}
      <Image
        source={require("../assets/user.png")}
        style={imageStyles.profileImage}
      />

      {/* Användarnamn och e-post */}
      <Text style={[globalStyles.username, { color: theme.text }]}>
        Webmaster
      </Text>
      <Text style={[globalStyles.email, { color: theme.text }]}>
        user@example.com
      </Text>

      {/* Sektion för inställningar */}
      <View style={buttonStyles.buttonContainer}>
        {/* Navigeringsknapp till statistik */}
        <Button
          icon={
            <MaterialIcons
              name="bar-chart"
              size={22}
              color={theme.buttonText}
            />
          }
          title="Statistik"
          onPress={() => navigation.navigate("Statistics")}
          theme={theme}
        />
      </View>
      <View style={buttonStyles.buttonContainer}>
        <Text style={[globalStyles.subTitle, { color: theme.text }]}>
          Inställningar
        </Text>

        {/* Knapp som växlar mellan mörkt och ljust tema */}
        <Button
          icon={
            <MaterialIcons
              name={darkMode ? "wb-sunny" : "nightlight-round"}
              size={22}
              color={theme.buttonText}
            />
          }
          title={darkMode ? "Byt till ljust läge" : "Byt till mörkt läge"}
          onPress={toggleDarkMode}
          theme={theme}
        />
      </View>
    </View>
  );
}
