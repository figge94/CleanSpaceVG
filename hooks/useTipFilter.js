import { useState, useMemo } from "react";
import allTips from "../data/TipsData";

export default function useTipFilter() {
  const [showTips, setShowTips] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = useMemo(
    () => ["Förvaring", "Organisering", "Tvätt", "Mer utrymme"],
    []
  );

  const filteredTips = useMemo(() => {
    return selectedCategory
      ? allTips.filter((tip) => tip.category === selectedCategory)
      : [];
  }, [selectedCategory]);

  const toggleTips = () => {
    setShowTips((prev) => !prev);
    setSelectedCategory((prev) => (showTips ? null : "Förvaring"));
  };

  return {
    showTips,
    toggleTips,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredTips
  };
}
