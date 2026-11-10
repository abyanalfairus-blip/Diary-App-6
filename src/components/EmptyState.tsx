import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, SPACE, TYPO } from '../styles/tokens';

type Props = {
  icon: string;
  title: string;
  message: string;
};

/** Tampilan kosong yang dipakai Home (hasil cari kosong) dan Favorites (belum ada Like). */
export default function EmptyState({ icon, title, message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: SPACE.xxl * 1.5,
    paddingHorizontal: SPACE.xl,
    gap: SPACE.s,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },
  message: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
