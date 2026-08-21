import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
nano "app/_layout.tsx"
nano "app/(auth)/login.tsx"
nano "app/(auth)/register.tsx"
nano "app/(app)/home.tsx"
nano "app/(app)/hubs/index.tsx"
nano "app/(app)/hubs/[slug].tsx"
nano "app/(app)/game/[title].tsx"
nano "app/(app)/launchpad/index.tsx"
nano "app/(app)/launchpad/[id].tsx"
nano "app/(app)/launchpad/upload.tsx"

