import { useMemo } from "react";
import { includesIgnoreCase } from "../utils/stringUtils";

/**
 * Filtrerar och genererar kategorier baserat på plaggdata, sökning och favoriter.
 */
export default function useFilteredClothes(
  data,
  searchQuery,
  selectedCategory,
  showOnlyFavorites,
  favorites
) {
  const categories = useMemo(() => {
    return [
      "Alla",
      ...new Set(data.map((item) => item.category?.main || "Okänd"))
    ];
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchCategory =
        selectedCategory === "Alla" || item.category?.main === selectedCategory;

      const matchSearch = includesIgnoreCase(item.name, searchQuery);

      const isFavorite = favorites[item._id];

      return matchCategory && matchSearch && (!showOnlyFavorites || isFavorite);
    });
  }, [data, searchQuery, selectedCategory, showOnlyFavorites, favorites]);

  return { categories, filteredData };
}
