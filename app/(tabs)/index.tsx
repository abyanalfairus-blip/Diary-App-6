import React, { useCallback, useRef } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDiary } from '../../src/context/DiaryContext';
import { useDiarySearch } from '../../src/hooks/useDiarySearch';
import DiaryCard from '../../src/components/DiaryCard';
import EmptyState from '../../src/components/EmptyState';
import { MOODS } from '../../src/constants/moods';
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from '../../src/styles/tokens';

export default function HomeScreen() {
  const router = useRouter();

  // Shared state dari Context.
  const { entries, likedIds, toggleLike } = useDiary();

  // Seluruh logic pencarian + filter mood ada di custom hook.
  const {
    query,
    setQuery,
    selectedMood,
    toggleMood,
    resetFilters,
    hasActiveFilter,
    filteredEntries,
    resultCount,
  } = useDiarySearch(entries);

  // useRef: menyimpan referensi TextInput tanpa memicu re-render.
  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  // useCallback: referensi fungsi stabil untuk DiaryCard (React.memo).
  const openDetail = useCallback(
    (id: number) => {
      router.push({ pathname: '/detail/[id]', params: { id: String(id) } });
    },
    [router]
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    searchRef.current?.focus();
  }, [setQuery]);

  const handleReset = useCallback(() => {
    resetFilters();
    searchRef.current?.blur();
  }, [resetFilters]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.eyebrow}>Diary App</Text>
            <Text style={styles.header}>Buku Harian</Text>

            {/* Search */}
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                ref={searchRef}
                value={query}
                onChangeText={setQuery}
                placeholder="Cari judul, isi, atau tanggal..."
                placeholderTextColor={COLORS.subtle}
                style={styles.search}
                returnKeyType="search"
              />
              {query.length > 0 && (
                <Pressable onPress={clearSearch} hitSlop={8} style={styles.clearButton}>
                  <Text style={styles.clearText}>Clear</Text>
                </Pressable>
              )}
            </View>

            {/* Filter mood */}
            <View style={styles.moodRow}>
              {MOODS.map((m) => {
                const active = selectedMood === m.emoji;
                return (
                  <Pressable
                    key={m.emoji}
                    onPress={() => toggleMood(m.emoji)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={styles.chipEmoji}>{m.emoji}</Text>
                    <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
                      {m.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Counter + Reset Filter */}
            <View style={styles.metaRow}>
              <Text style={styles.counter}>{resultCount} entri ditemukan</Text>
              <Pressable
                onPress={handleReset}
                disabled={!hasActiveFilter}
                style={[styles.resetButton, !hasActiveFilter && styles.resetDisabled]}
              >
                <Text style={styles.resetText}>↺ Reset Filter</Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <DiaryCard
            id={item.id}
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={openDetail}
            onToggleLike={toggleLike}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: SPACE.m }} />}
        ListEmptyComponent={
          <EmptyState
            icon="📭"
            title="Diary tidak ditemukan"
            message="Coba kata kunci lain atau tekan Reset Filter."
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACE.l,
    paddingBottom: SPACE.xxl,
  },
  headerBlock: {
    marginBottom: SPACE.m,
  },
  eyebrow: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACE.l,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.input,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACE.m,
    ...SHADOW,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: SPACE.s,
  },
  search: {
    flex: 1,
    paddingVertical: SPACE.m,
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  clearButton: {
    paddingVertical: SPACE.xs,
    paddingHorizontal: SPACE.s,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accentSoft,
  },
  clearText: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.accent,
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.s,
    marginTop: SPACE.m,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
    paddingVertical: 6,
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accentSoft,
  },
  chipEmoji: {
    fontSize: 16,
  },
  chipLabel: {
    fontSize: TYPO.caption,
    fontWeight: '600',
    color: COLORS.muted,
  },
  chipLabelActive: {
    color: COLORS.accent,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACE.l,
  },
  counter: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  resetButton: {
    paddingVertical: 6,
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accentSoft,
  },
  resetDisabled: {
    opacity: 0.4,
  },
  resetText: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.accent,
  },
});
