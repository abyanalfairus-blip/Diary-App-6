import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from '../styles/tokens';

type Props = {
  id: number;
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: (id: number) => void;
  onToggleLike: (id: number) => void;
};

/**
 * Kartu diary. Dibungkus React.memo, sehingga kartu hanya re-render
 * jika props-nya berubah. Ini efektif karena callback dari parent
 * (openDetail, toggleLike) stabil berkat useCallback.
 */
function DiaryCard({ id, title, date, preview, mood, liked, onPress, onToggleLike }: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => onPress(id)}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <View style={styles.moodBadge}>
          <Text style={styles.mood}>{mood}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => onToggleLike(id)}
        hitSlop={8}
        accessibilityLabel={liked ? 'Batal suka' : 'Suka'}
        style={({ pressed }) => [
          styles.likeButton,
          liked && styles.likeButtonActive,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.like, liked && styles.likeActive]}>{liked ? '♥' : '♡'}</Text>
      </Pressable>
    </View>
  );
}

export default memo(DiaryCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    paddingRight: SPACE.m,
    ...SHADOW,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACE.m,
    gap: SPACE.m,
  },
  pressed: {
    opacity: 0.6,
  },
  moodBadge: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.input,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mood: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.subtle,
    marginBottom: SPACE.xs,
  },
  preview: {
    fontSize: TYPO.body,
    lineHeight: 20,
    color: COLORS.muted,
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  likeButtonActive: {
    backgroundColor: COLORS.dangerSoft,
  },
  like: {
    fontSize: 20,
    color: COLORS.subtle,
  },
  likeActive: {
    color: COLORS.danger,
  },
});
