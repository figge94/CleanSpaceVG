import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useInitialRoute() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkIntro = async () => {
      try {
        const seen = await AsyncStorage.getItem("hasSeenIntro");
        setInitialRoute(seen === "true" ? "Tabs" : "Intro");
      } catch (error) {
        console.error("Failed to check intro state:", error);
      }
    };
    checkIntro();
  }, []);

  return initialRoute;
}
