import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useDiary } from '../../src/context/DiaryContext';
import EmptyState from '../../src/components/EmptyState';
import { MOODS } from '../../src/constants/moods';
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from '../../src/styles/tokens';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, likedIds, toggleLike } = useDiary();

  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <EmptyState icon="🔎" title="Diary tidak ditemukan" message="Data mungkin sudah tidak ada." />
      </View>
    );
  }

  // Status Like dibaca dari Context, sehingga sama dengan Home dan Favorites.
  const liked = likedIds.has(entry.id);
  const moodLabel = MOODS.find((m) => m.emoji === entry.mood)?.label ?? 'Mood';

  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.mood}>{entry.mood}</Text>
          <View style={styles.moodPill}>
            <Text style={styles.moodPillText}>{moodLabel}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.date}>📅 {entry.date}</Text>
          <View style={styles.divider} />
          <Text style={styles.body}>{entry.body}</Text>
        </View>

        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={({ pressed }) => [
            styles.likeButton,
            liked && styles.likeButtonActive,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.likeText, liked && styles.likeTextActive]}>
            {liked ? '♥ Disukai' : '♡ Suka'}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.l,
    paddingBottom: SPACE.xxl,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: SPACE.l,
    gap: SPACE.s,
  },
  mood: {
    fontSize: 64,
  },
  moodPill: {
    paddingVertical: SPACE.xs,
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accentSoft,
  },
  moodPillText: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.accent,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACE.l,
    ...SHADOW,
  },
  title: {
    fontSize: TYPO.h2,
    fontWeight: '800',
    color: COLORS.text,
  },
  date: {
    marginTop: SPACE.xs,
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACE.m,
  },
  body: {
    fontSize: TYPO.body + 1,
    lineHeight: 24,
    color: COLORS.text,
  },
  likeButton: {
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: COLORS.danger,
    borderRadius: RADIUS.card,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  likeButtonActive: {
    backgroundColor: COLORS.danger,
  },
  pressed: {
    opacity: 0.75,
  },
  likeText: {
    fontSize: TYPO.title - 1,
    fontWeight: '700',
    color: COLORS.danger,
  },
  likeTextActive: {
    color: COLORS.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
