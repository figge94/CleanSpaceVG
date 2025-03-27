import { useEffect, useRef } from "react";
import { Animated } from "react-native";

/**
 * Skapa en animerad transition baserat på darkMode-ändring
 */
export default function useThemeTransition(darkMode) {
  const transition = useRef(new Animated.Value(darkMode ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(transition, {
      toValue: darkMode ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [darkMode]);

  return transition;
}
