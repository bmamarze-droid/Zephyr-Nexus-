import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LaunchpadScreen() {
  const router = useRouter();

  const demos = [
    {
      id: 'demo-1',
      title: 'Neon Drift: Zenith',
      studio: 'Aetheria Games',
      releaseDate: 'Dropping in 2 Days',
      tags: ['Racing', 'Cyberpunk', 'Demo Available'],
      downloads: '14.2k',
    },
    {
      id: 'demo-2',
      title: 'Chronos Shattered',
      studio: 'Pixel Forge',
      releaseDate: 'Dropping in 5 Days',
      tags: ['Action', 'Roguelike', 'Alpha Access'],
      downloads: '8.9k',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zephyr Launchpad 🚀</Text>
        <Text style={styles.headerSubtitle}>Discover early demos, upcoming releases & beta access</Text>
      </View>

      <View style={styles.feed}>
        {demos.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.badge}>{item.releaseDate}</Text>
              <Text style={styles.downloads}>📥 {item.downloads}</Text>
            </View>

            <Text style={styles.gameTitle}>{item.title}</Text>
            <Text style={styles.studioText}>by {item.studio}</Text>

            <View style={styles.tagContainer}>
              {item.tags.map((tag, idx) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.demoButton}>
              <Text style={styles.demoButtonText}>Download Demo / Try Beta</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
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
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#a0a0ab',
    marginTop: 4,
  },
  feed: {
    gap: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#181820',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#23232e',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    color: '#00b894',
    backgroundColor: 'rgba(0, 184, 148, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  downloads: {
    color: '#a0a0ab',
    fontSize: 12,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  studioText: {
    fontSize: 13,
    color: '#89b4fa',
    marginTop: 2,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#23232e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: '#a0a0ab',
    fontSize: 11,
  },
  demoButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

