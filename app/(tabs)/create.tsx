import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDiary } from '../../src/context/DiaryContext';
import { DEFAULT_MOOD, MOODS } from '../../src/constants/moods';
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from '../../src/styles/tokens';

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();

  // Local state: setiap input dikontrol oleh state (controlled input).
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-11-02');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState<string>(DEFAULT_MOOD);

  // Derived value: tidak perlu state sendiri, cukup dihitung saat render.
  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;

    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80),
      body: body.trim(),
      mood,
    });

    setTitle('');
    setBody('');
    setMood(DEFAULT_MOOD);

    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.eyebrow}>Entri Baru</Text>
          <Text style={styles.heading}>Tambah Diary</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Judul</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Contoh: Hari pertama UTS"
              placeholderTextColor={COLORS.subtle}
              style={styles.input}
            />

            <Text style={styles.label}>Tanggal</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={COLORS.subtle}
              style={styles.input}
            />

            <Text style={styles.label}>Cerita</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Ceritakan harimu..."
              placeholderTextColor={COLORS.subtle}
              multiline
              style={[styles.input, styles.bodyInput]}
            />
            <Text style={styles.hint}>{body.trim().length} karakter</Text>

            <Text style={styles.label}>Mood</Text>
            <View style={styles.moodRow}>
              {MOODS.map((item) => {
                const active = mood === item.emoji;
                return (
                  <Pressable
                    key={item.emoji}
                    onPress={() => setMood(item.emoji)}
                    style={[styles.moodButton, active && styles.moodSelected]}
                  >
                    <Text style={styles.mood}>{item.emoji}</Text>
                    <Text style={[styles.moodLabel, active && styles.moodLabelActive]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            onPress={save}
            disabled={!canSave}
            style={({ pressed }) => [
              styles.saveButton,
              !canSave && styles.disabled,
              pressed && canSave && styles.pressed,
            ]}
          >
            <Text style={styles.saveText}>Simpan</Text>
          </Pressable>
          {!canSave && (
            <Text style={styles.helper}>Isi judul dan cerita untuk mengaktifkan tombol Simpan.</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: SPACE.l,
    paddingBottom: SPACE.xxl,
  },
  eyebrow: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heading: {
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
  label: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.muted,
    marginBottom: SPACE.xs,
    marginTop: SPACE.m,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.input,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.m,
    fontSize: TYPO.body,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  bodyInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  hint: {
    alignSelf: 'flex-end',
    fontSize: 11,
    color: COLORS.subtle,
    marginTop: SPACE.xs,
  },
  moodRow: {
    flexDirection: 'row',
    gap: SPACE.s,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACE.s,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.input,
    backgroundColor: COLORS.background,
  },
  moodSelected: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: COLORS.accentSoft,
  },
  mood: {
    fontSize: 26,
  },
  moodLabel: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },
  moodLabelActive: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: SPACE.xl,
    paddingVertical: 14,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.card,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.8,
  },
  saveText: {
    color: COLORS.white,
    fontSize: TYPO.title - 1,
    fontWeight: '700',
  },
  helper: {
    textAlign: 'center',
    fontSize: TYPO.caption,
    color: COLORS.subtle,
    marginTop: SPACE.s,
  },
});
