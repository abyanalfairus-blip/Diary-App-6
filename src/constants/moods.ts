/**
 * Daftar mood yang dipakai di CreateScreen (pilih mood)
 * dan HomeScreen (filter mood). Satu sumber agar keduanya selalu sama.
 */
export const MOODS = [
  { emoji: '😊', label: 'Senang' },
  { emoji: '😌', label: 'Tenang' },
  { emoji: '😐', label: 'Biasa' },
  { emoji: '😢', label: 'Sedih' },
] as const;

export const DEFAULT_MOOD = MOODS[0].emoji;
