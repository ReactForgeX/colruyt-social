import { Stack } from 'expo-router';
import React from 'react';

export default function BlogLayout() {
  return (
    <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00ab9e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackTitleVisible: false,
        headerTitle: "Blog Post",
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
