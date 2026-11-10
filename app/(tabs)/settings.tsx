import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from '../../src/styles/tokens';

export default function SettingsScreen() {
  // Local state sederhana: hanya dipakai di screen ini.
  const [compactMode, setCompactMode] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Aplikasi</Text>
        <Text style={styles.title}>Pengaturan</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Compact Mode</Text>
              <Text style={styles.rowDesc}>Contoh local state dengan useState</Text>
            </View>
            <Switch
              value={compactMode}
              onValueChange={setCompactMode}
              trackColor={{ false: COLORS.border, true: COLORS.accent }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <View style={[styles.statusPill, compactMode && styles.statusPillActive]}>
          <Text style={[styles.info, compactMode && styles.infoActive]}>
            State: {compactMode ? 'Aktif' : 'Nonaktif'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: SPACE.l,
  },
  eyebrow: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACE.l,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACE.l,
    ...SHADOW,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: TYPO.title - 1,
    fontWeight: '700',
    color: COLORS.text,
  },
  rowDesc: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  statusPill: {
    alignSelf: 'flex-start',
    marginTop: SPACE.m,
    paddingVertical: 6,
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.border,
  },
  statusPillActive: {
    backgroundColor: COLORS.accentSoft,
  },
  info: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.muted,
  },
  infoActive: {
    color: COLORS.accent,
  },
});
