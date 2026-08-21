<Tabs.Screen
  name="profile"
  options={{
    title: 'Profile',
  }}
/>
import React from 'react';
import { Tabs } from 'expo-router';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#181820',
          borderTopColor: '#23232e',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#6c5ce7',
        tabBarInactiveTintColor: '#a0a0ab',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="launchpad/index"
        options={{
          title: 'Launchpad',
        }}
      />
      <Tabs.Screen
        name="hubs/index"
        options={{
          title: 'Hubs',
        }}
      />
      {/* Hide dynamic sub-routes from tab bar */}
      <Tabs.Screen
        name="game/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="hubs/[slug]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

