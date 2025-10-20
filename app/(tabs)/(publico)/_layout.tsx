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
        name="agendamento"
        options={{
          title: 'Agendamento',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cadastro"
        options={{
          title: 'Cadastro',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="concluido"
        options={{
          title: 'Concluido',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dicas"
        options={{
          title: 'Dicas',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="hora"
        options={{
          title: 'Hora',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="local"
        options={{
          title: 'Local',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="noticia"
        options={{
          title: 'Noticia',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="valorFinal"
        options={{
          title: 'ValorFinal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dica"
        options={{
          title: 'Dica',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="historico"
        options={{
          title: 'Historico',
          headerShown: false,
        }}
      />
    <Stack.Screen
        name="assinatura"
        options={{
          title: 'Assinatura',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
