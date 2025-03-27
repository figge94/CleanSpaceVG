// /hooks/useFormattedDates.js
import { useMemo } from "react";
import { formatDate } from "../utils/dateUtils";

export default function useFormattedDates(item) {
  return useMemo(
    () => ({
      createdAt: formatDate(item?.createdAt),
      lastUsed: formatDate(item?.lastUsed),
      clearedAt: formatDate(item?.clearedAt)
    }),
    [item]
  );
}
