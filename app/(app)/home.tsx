import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { getGames } from '../../src/services/gameService';

export default function HomeScreen() {
  const router = useRouter();
  const games = getGames();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Zephyr Feed ⚡</Text>
        <Text style={styles.subtitle}>Latest gaming news, reviews & community hub</Text>
      </View>

      {/* Game Feed */}
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/game/${item.id}`)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardGenre}>{item.genre}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
              <Text style={styles.linkText}>View Details →</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.feedContainer}
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
    marginTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0ab',
    marginTop: 4,
  },
  feedContainer: {
    gap: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#181820',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#23232e',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardGenre: {
    fontSize: 12,
    color: '#89b4fa',
    marginTop: 2,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  rating: {
    color: '#f1c40f',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#6c5ce7',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Zephyr Home Feed</Text>

      {/* Navigate to dynamic game details route */}
      <Link href="/game/cyber-odyssey" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Game Details</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
nano "app/(app)/hubs/index.tsx"
nano "app/(app)/hubs/[slug].tsx"
nano "app/(app)/game/[title].tsx"
nano "app/(app)/launchpad/index.tsx"
nano "app/(app)/launchpad/[id].tsx"
nano "app/(app)/launchpad/upload.tsx"

