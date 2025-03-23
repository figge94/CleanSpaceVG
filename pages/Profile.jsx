import { useContext } from "react";
import { Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SettingsContext } from "../context/SettingsContext"; // Hanterar tema och mörkt/ljust läge
import profilePic from "../assets/user.png"; // Profilbilden
import { ProfileStyle } from "../styles/pages/ProfilePageStyle"; // Stilar specifika för profilsidan
import { ImageStyle } from "../styles/ImageStyle"; // Gemensamma bildstilar
import Button from "../components/Button"; // Återanvändbar knappkomponent
import { Animated } from "react-native";

// Skärm som visar användarens profilinformation samt inställningar
export default function ProfileScreen({ navigation }) {
  const { darkMode, toggleDarkMode, theme } = useContext(SettingsContext);

  // Förbereder en animering för temaväxling (används ej visuellt i denna version)
  const transition = new Animated.Value(darkMode ? 1 : 0);

  Animated.timing(transition, {
    toValue: darkMode ? 0 : 1,
    duration: 300,
    useNativeDriver: false
  }).start();

  return (
    // Hela sidan får bakgrundsfärg baserat på aktuellt tema
    <View
      style={[ProfileStyle.container, { backgroundColor: theme.background }]}>
      {/* Profilbild */}
      <Image source={profilePic} style={ImageStyle.profileImage} />

      {/* Användarnamn och e-post */}
      <Text style={[ProfileStyle.username, { color: theme.text }]}>
        Webmaster
      </Text>
      <Text style={[ProfileStyle.email, { color: theme.text }]}>
        user@example.com
      </Text>

      {/* Navigeringsknapp till statistik */}
      <Button
        icon={
          <MaterialIcons name="bar-chart" size={22} color={theme.buttonText} />
        }
        title="Statistik"
        onPress={() => navigation.navigate("Statistics")}
        theme={theme}
      />

      {/* Sektion för inställningar */}
      <View style={ProfileStyle.settingsContainer}>
        <Text style={[ProfileStyle.settingsHeader, { color: theme.text }]}>
          Inställningar:
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
