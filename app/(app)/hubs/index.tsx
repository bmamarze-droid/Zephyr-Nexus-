import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/theme/colors';

const HUBS_DATA = [
  { id: '1', slug: 'cyberpunk-lounge', name: 'Cyberpunk Lounge', category: 'Sci-Fi / RPG', members: '2.4k active' },
  { id: '2', slug: 'racers-arena', name: 'Racers Arena', category: 'Arcade & Sim', members: '1.1k active' },
  { id: '3', slug: 'indie-dev-corner', name: 'Indie Dev Corner', category: 'Showcase', members: '850 active' },
];

export default function HubsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Hubs 💬</Text>
        <Text style={styles.subtitle}>Join real-time chat rooms for your favorite titles</Text>
      </View>

      <FlatList
        data={HUBS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/hubs/${item.slug}`)}
            activeOpacity={0.8}
          >
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.members}>{item.members}</Text>
            </View>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.linkText}>Enter Room →</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  list: {
    gap: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  members: {
    fontSize: 12,
    color: colors.success,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 13,
    color: colors.accentBlue,
    marginTop: 4,
    marginBottom: 12,
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
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

