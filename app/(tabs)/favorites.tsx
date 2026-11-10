import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDiary } from '../../src/context/DiaryContext';
import { useLikedEntries } from '../../src/hooks/useLikedEntries';
import DiaryCard from '../../src/components/DiaryCard';
import EmptyState from '../../src/components/EmptyState';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

export default function FavoritesScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();

  // Custom hook: hanya diary yang ada di likedIds.
  const { likedEntries, likedCount } = useLikedEntries(entries, likedIds);

  const openDetail = useCallback(
    (id: number) => {
      router.push({ pathname: '/detail/[id]', params: { id: String(id) } });
    },
    [router]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={likedEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.eyebrow}>Koleksi</Text>
            <Text style={styles.header}>Favorit</Text>
            <Text style={styles.counter}>{likedCount} diary disukai</Text>
          </View>
        }
        renderItem={({ item }) => (
          <DiaryCard
            id={item.id}
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked
            onPress={openDetail}
            onToggleLike={toggleLike}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: SPACE.m }} />}
        ListEmptyComponent={
          <EmptyState
            icon="💔"
            title="Belum ada favorit"
            message="Tekan ♡ pada diary di Home atau Detail, nanti diary itu muncul di sini."
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
    marginBottom: SPACE.l,
  },
  eyebrow: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.danger,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
  },
  counter: {
    marginTop: SPACE.xs,
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
});
