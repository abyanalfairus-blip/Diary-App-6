import { useCallback, useEffect, useMemo, useState } from 'react';

import { DiaryEntry } from '../context/DiaryContext';

/**
 * Custom hook pencarian + filter mood.
 * - useState    : query, debouncedQuery, selectedMood
 * - useEffect   : debounce 350 ms dengan cleanup clearTimeout
 * - useMemo     : menggabungkan query dan filter mood menjadi filteredEntries
 * - useCallback : resetFilters yang stabil untuk dipakai di UI
 */
export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    // Cleanup: batalkan timer lama jika user masih mengetik.
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredEntries = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchMood = selectedMood === null || entry.mood === selectedMood;

      const matchQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q);

      return matchMood && matchQuery;
    });
  }, [entries, debouncedQuery, selectedMood]);

  // Tap mood yang sama dua kali = matikan filter mood.
  const toggleMood = useCallback((mood: string) => {
    setSelectedMood((prev) => (prev === mood ? null : mood));
  }, []);

  // Reset langsung mengosongkan debouncedQuery juga, agar hasil tidak menunggu 350 ms.
  const resetFilters = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setSelectedMood(null);
  }, []);

  const hasActiveFilter = query.length > 0 || selectedMood !== null;

  return {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    toggleMood,
    resetFilters,
    hasActiveFilter,
    filteredEntries,
    resultCount: filteredEntries.length,
  };
}
