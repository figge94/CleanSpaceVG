import React from "react";
import { Text, Image, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import useSettings from "../hooks/useSettings";
import { buttonStyles, globalStyles, imageStyles } from "../styles/styles";
import { Button } from "../components";
import useThemeTransition from "../hooks/useThemeTransition";

export default function ProfileScreen({ navigation }) {
  const { theme } = useSettings();
  const transition = useThemeTransition(darkMode);

  const backgroundColor = transition.interpolate({
    inputRange: [0, 1],
    outputRange: ["#121212", "#ece3df"] // Mörkt till ljust tema
  });

  return (
    <Animated.View // 👈 Byter till Animated.View
      style={[globalStyles.container, { backgroundColor }]}>
      <Image
        source={require("../assets/user.png")}
        style={imageStyles.profileImage}
      />

      <Text style={[globalStyles.username, { color: theme.text }]}>
        Webmaster
      </Text>
      <Text style={[globalStyles.email, { color: theme.text }]}>
        user@example.com
      </Text>

      <View style={buttonStyles.buttonContainer}>
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
    </Animated.View>
  );
}
