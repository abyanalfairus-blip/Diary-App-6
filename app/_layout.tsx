import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { DiaryProvider } from '../src/context/DiaryContext';
import { COLORS } from '../src/styles/tokens';

export default function RootLayout() {
  // DiaryProvider membungkus Stack, sehingga seluruh screen dapat memakai useDiary().
  return (
    <DiaryProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTintColor: COLORS.accent,
          headerTitleStyle: { color: COLORS.text, fontWeight: '700' },
          headerStyle: { backgroundColor: COLORS.surface },
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail/[id]" options={{ title: 'Detail Diary' }} />
      </Stack>
    </DiaryProvider>
  );
}
