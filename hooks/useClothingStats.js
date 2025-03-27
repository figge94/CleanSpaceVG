// hooks/useClothingStats.js
import { useMemo } from "react";

/**
 * Returnerar statistik baserat på en lista av klädesplagg.
 * @param {Array} data - Lista med klädesplagg från API
 * @returns {{ totalItems: number, categoryCount: Object }}
 */
export default function useClothingStats(data) {
  return useMemo(() => {
    const categoryCount = data.reduce((acc, item) => {
      const cat = item.category?.main || "Okänd";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return {
      totalItems: data.length,
      categoryCount
    };
  }, [data]);
}
