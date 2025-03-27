import React from "react";
import { Text, Image, View, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useAppTheme from "../hooks/useAppTheme";
import { buttonStyles, globalStyles, imageStyles } from "../styles/styles";
import { Button } from "../components";

export default function ProfileScreen({ navigation }) {
  const { isDarkMode, toggleDarkMode, theme } = useAppTheme();

  const background = isDarkMode ? "#121212" : "#ece3df";
  const textColor = isDarkMode ? "#fff" : "#000";

  return (
    <View style={[globalStyles.container, { backgroundColor: background }]}>
      <Image
        source={require("../assets/images/user.png")}
        style={imageStyles.profileImage}
      />

      <Text style={[globalStyles.username, { color: textColor }]}>
        Webmaster
      </Text>
      <Text style={[globalStyles.email, { color: textColor }]}>
        user@example.com
      </Text>

      <View style={buttonStyles.buttonContainer}>
        <Button
          icon={<MaterialIcons name="bar-chart" size={22} color={textColor} />}
          title="Statistik"
          onPress={() => navigation.navigate("Statistics")}
        />
      </View>

      <View style={buttonStyles.buttonContainer}>
        <Text style={[globalStyles.subTitle, { color: textColor }]}>
          Mörkt läge
        </Text>

        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#d9c7bf", true: "#A86D5D" }}
          thumbColor={isDarkMode ? "#ffffff" : "#000000"}
        />
      </View>
    </View>
  );
}
