// hooks/useRandomTip.js
import { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { getRandomTipFromList } from "../utils/tipUtils";

/**
 * Hook för att hantera slumpmässiga tips med fade-animation
 */
export default function useRandomTip() {
  const [randomTip, setRandomTip] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getRandomTip = () => {
    const newTip = getRandomTipFromList();
    setRandomTip(newTip);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    getRandomTip();
  }, []);

  return { randomTip, fadeAnim, getRandomTip };
}
