import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, SPACE, TYPO } from '../src/styles/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Halaman tidak ditemukan.</Text>
        <Link href="/" style={styles.link}>
          Kembali ke Home
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACE.xl,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },
  link: {
    marginTop: SPACE.l,
    fontSize: TYPO.body,
    color: COLORS.accent,
  },
});
