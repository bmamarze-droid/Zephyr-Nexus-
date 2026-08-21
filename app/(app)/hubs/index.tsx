import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HubsScreen() {
  const hubs = [
    { id: '1', slug: 'cyberpunk-lounge', name: 'Cyberpunk Lounge', members: '12.4k', category: 'RPG' },
    { id: '2', slug: 'fps-tactics', name: 'FPS Tactics & Loadouts', members: '8.1k', category: 'Shooter' },
    { id: '3', slug: 'indie-showcase', name: 'Indie Dev Showcase', members: '5.6k', category: 'Development' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Zephyr Hubs 💬</Text>
      <Text style={styles.subheader}>Join live game chat rooms and communities</Text>

      <FlatList
        data={hubs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/hubs/${item.slug}`} asChild>
            <TouchableOpacity style={styles.card}>
              <View>
                <Text style={styles.hubName}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <Text style={styles.members}>👥 {item.members}</Text>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ gap: 12, paddingTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f14',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  subheader: {
    fontSize: 14,
    color: '#a0a0ab',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#181820',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#23232e',
  },
  hubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  category: {
    color: '#89b4fa',
    fontSize: 12,
    marginTop: 2,
  },
  members: {
    color: '#a0a0ab',
    fontSize: 12,
  },
});
nano "app/(app)/hubs/[slug].tsx"
nano "app/(app)/game/[title].tsx"
nano "app/(app)/launchpad/index.tsx"
nano "app/(app)/launchpad/[id].tsx"
nano "app/(app)/launchpad/upload.tsx"
nano "src/api/client.ts"
nano "src/api/socket.ts"
nano "src/api/types.ts"
nano "src/api/tokenStorage.ts"
nano "src/context/AuthContext.tsx"
nano "src/screens/ScoreSelector.tsx"
git add .
git commit -m "Add home, hubs, and launchpad routes"
git push

