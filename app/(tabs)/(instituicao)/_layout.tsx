import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack>
      <Stack.Screen
        name="addNoticia"
        options={{
          title: 'addNoticia',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cadastroInst"
        options={{
          title: 'cadastroInst',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="inicioInst"
        options={{
          title: 'inicioInst',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="loginInst"
        options={{
          title: 'loginInst',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="perfilInst"
        options={{
          title: 'perfilInst',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
