import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { gameService } from '../../../src/services/gameService';
import { Game } from '../../../src/types';
import { storage } from '../../../src/utils/storage';
import { colors } from '../../../src/theme/colors';

const SAVED_DEMOS_KEY = '@zephyr_saved_demos';

export default function LaunchpadScreen() {
  const [demos, setDemos] = useState<Game[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initLaunchpad() {
      const allGames = await gameService.getFeaturedGames();
      setDemos(allGames.filter((g) => g.demoAvailable));

      const storedSaved = await storage.getItem<string[]>(SAVED_DEMOS_KEY);
      if (storedSaved) setSavedIds(storedSaved);

      setLoading(false);
    }
    initLaunchpad();
  }, []);

  const toggleSaveDemo = async (id: string) => {
    const updated = savedIds.includes(id)
      ? savedIds.filter((item) => item !== id)
      : [...savedIds, id];

    setSavedIds(updated);
    await storage.setItem(SAVED_DEMOS_KEY, updated);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Launchpad 🚀</Text>
        <Text style={styles.subtitle}>Test early access playtest demos</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={demos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSaved = savedIds.includes(item.id);
            return (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.genre}>{item.genre}</Text>
                <Text style={styles.desc}>{item.description}</Text>

                <View style={styles.footer}>
                  <TouchableOpacity
                    style={[styles.saveBtn, isSaved && styles.savedBtn]}
                    onPress={() => toggleSaveDemo(item.id)}
                  >
                    <Text style={styles.saveBtnText}>
                      {isSaved ? '★ Saved to Library' : '☆ Save Demo'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { marginTop: 20, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  list: { gap: 16, paddingBottom: 24 },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  genre: { fontSize: 12, color: colors.accentBlue, marginTop: 2, marginBottom: 8 },
  desc: { fontSize: 14, color: '#ccc', lineHeight: 18 },
  footer: { marginTop: 14, alignItems: 'flex-start' },
  saveBtn: {
    backgroundColor: colors.borderColor,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  savedBtn: { backgroundColor: colors.primary },
  saveBtnText: { color: colors.textPrimary, fontSize: 12, fontWeight: 'bold' },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

interface DemoItem {
  id: string;
  title: string;
  developer: string;
  genre: string;
  status: 'Playable' | 'Upcoming';
  size: string;
}

const DEMOS_DATA: DemoItem[] = [
  {
    id: '1',
    title: 'Cyber Odyssey: Tactical Demo',
    developer: 'Aether Studios',
    genre: 'Sci-Fi Action',
    status: 'Playable',
    size: '142 MB',
  },
  {
    id: '2',
    title: 'Neon Drift: Time Trial',
    developer: 'Vapor Dynamics',
    genre: 'Arcade Racing',
    status: 'Playable',
    size: '88 MB',
  },
  {
    id: '3',
    title: 'Project Zephyr Engine Test',
    developer: 'Zephyr Labs',
    genre: 'Sandbox / Physics',
    status: 'Upcoming',
    size: '210 MB',
  },
];

export default function LaunchpadScreen() {
  const [demos] = useState<DemoItem[]>(DEMOS_DATA);

  const handleLaunchDemo = (item: DemoItem) => {
    if (item.status === 'Upcoming') {
      Alert.alert('Coming Soon', `${item.title} demo is currently in early testing.`);
    } else {
      Alert.alert('Launching Demo', `Starting runtime for ${item.title}...`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Launchpad 🚀</Text>
        <Text style={styles.subtitle}>Test instant game demos and early access prototypes</Text>
      </View>

      {/* Demo List */}
      <FlatList
        data={demos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={[styles.badge, item.status === 'Playable' ? styles.badgePlayable : styles.badgeUpcoming]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.developer}>{item.developer} • {item.genre}</Text>
            <Text style={styles.sizeText}>Download Size: {item.size}</Text>

            <TouchableOpacity
              style={[styles.launchButton, item.status === 'Upcoming' && styles.disabledButton]}
              onPress={() => handleLaunchDemo(item)}
            >
              <Text style={styles.launchButtonText}>
                {item.status === 'Playable' ? 'Launch Instant Demo' : 'Pre-register Test'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
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
  listContainer: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgePlayable: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
  },
  badgeUpcoming: {
    backgroundColor: 'rgba(241, 196, 15, 0.2)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  developer: {
    fontSize: 13,
    color: '#89b4fa',
    marginTop: 4,
  },
  sizeText: {
    fontSize: 12,
    color: '#a0a0ab',
    marginTop: 8,
    marginBottom: 14,
  },
  launchButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#333344',
  },
  launchButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
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

