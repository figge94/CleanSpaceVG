import { useColorScheme } from "react-native";

export default function useSystemTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return {
    isDark,
    background: isDark ? "#121212" : "#ece3df",
    text: isDark ? "#EAEAEA" : "#000000",
    card: isDark ? "#242424" : "#ffffff",
    border: isDark ? "#666" : "#d9c7bf",
    buttonBackground: isDark ? "#444" : "#A47864",
    buttonText: "#fff",
    tagBackground: isDark ? "#242424" : "#AC9C95"
  };
}
