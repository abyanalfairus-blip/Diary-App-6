/**
 * Design tokens Diary App.
 * Semua warna, jarak, radius, tipografi, dan bayangan diambil dari sini
 * agar tampilan konsisten di seluruh screen.
 */
import { Platform } from 'react-native';

export const COLORS = {
  surface: '#FFFFFF',
  background: '#F4F6FB',
  border: '#E5E7EB',
  text: '#111827',
  muted: '#6B7280',
  subtle: '#9CA3AF',
  accent: '#2563EB',
  accentSoft: '#E8EFFE',
  danger: '#EF4444',
  dangerSoft: '#FDECEC',
  white: '#FFFFFF',
};

export const SPACE = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  card: 14,
  input: 12,
  pill: 999,
};

export const TYPO = {
  h1: 26,
  h2: 22,
  title: 17,
  body: 14,
  caption: 12,
};

/** Bayangan lembut untuk kartu, berbeda cara penulisan di iOS, Android, dan web. */
export const SHADOW = Platform.select({
  ios: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: {
    elevation: 2,
  },
  default: {
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
  },
}) as object;
