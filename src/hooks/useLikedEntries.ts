import { useMemo } from 'react';

import { DiaryEntry } from '../context/DiaryContext';

/**
 * Custom hook untuk mengambil diary yang disukai.
 * Input  : entries (semua diary) dan likedIds (Set id yang disukai)
 * Output : likedEntries dan likedCount
 * Karena hanya membaca dari Context, Like di Home, Detail, dan Favorites selalu sinkron.
 */
export function useLikedEntries(entries: DiaryEntry[], likedIds: Set<number>) {
  const likedEntries = useMemo(
    () => entries.filter((entry) => likedIds.has(entry.id)),
    [entries, likedIds]
  );

  return {
    likedEntries,
    likedCount: likedEntries.length,
  };
}
