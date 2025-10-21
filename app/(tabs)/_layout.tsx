import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack initialRouteName='boasVindas'>
      <Stack.Screen
        name="boasVindas"
        options={{
          title: 'BoasVindas',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sobrenos"
        options={{
          title: 'Sobrenos',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="configuracoes"
        options={{
          title: 'Configuracoes',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="suporte"
        options={{
          title: 'Suporte',
          headerShown: false,
        }}
      />
     <Stack.Screen name="(instituicao)" options={{ headerShown: false }} />
     <Stack.Screen name="(publico)" options={{ headerShown: false }} />
    </Stack>
  );
}
