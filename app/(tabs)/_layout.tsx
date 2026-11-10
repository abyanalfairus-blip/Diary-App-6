import React from 'react';
import { Tabs } from 'expo-router';
import { ColorValue } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { useDiary } from '../../src/context/DiaryContext';
import { COLORS } from '../../src/styles/tokens';

type IconName = React.ComponentProps<typeof SymbolView>['name'];

function TabIcon({ name, color }: { name: IconName; color: ColorValue }) {
  return <SymbolView name={name} tintColor={color} size={24} />;
}

export default function TabsLayout() {
  // Jumlah Like dibaca dari Context, dan badge tab Favorites ikut berubah otomatis.
  const { likedIds } = useDiary();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.subtle,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        sceneStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon name={{ ios: 'house.fill', android: 'home', web: 'home' }} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorit',
          tabBarBadge: likedIds.size > 0 ? likedIds.size : undefined,
          tabBarBadgeStyle: { backgroundColor: COLORS.danger },
          tabBarIcon: ({ color }) => (
            <TabIcon
              name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Tambah',
          tabBarIcon: ({ color }) => (
            <TabIcon
              name={{ ios: 'plus.circle.fill', android: 'add_circle', web: 'add_circle' }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Pengaturan',
          tabBarIcon: ({ color }) => (
            <TabIcon
              name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
