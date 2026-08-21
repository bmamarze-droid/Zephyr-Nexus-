import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { gameService } from '../../../src/services/gameService';
import { Game } from '../../../src/types';
import { storage } from '../../../src/utils/storage';
import { colors } from '../../../src/theme/colors';

const BOOKMARKED_NEWS_KEY = '@zephyr_bookmarked_news';

export default function BookmarksScreen() {
  const router = useRouter();
  const [bookmarkedGames, setBookmarkedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    setLoading(true);
    const ids = await storage.getItem<string[]>(BOOKMARKED_NEWS_KEY);
    if (ids && ids.length > 0) {
      const allGames = await gameService.getFeaturedGames();
      const filtered = allGames.filter((g) => ids.includes(g.id));
      setBookmarkedGames(filtered);
    } else {
      setBookmarkedGames([]);
    }
    setLoading(false);
  };

  const removeBookmark = async (id: string) => {
    const ids = (await storage.getItem<string[]>(BOOKMARKED_NEWS_KEY)) || [];
    const updated = ids.filter((bId) => bId !== id);
    await storage.setItem(BOOKMARKED_NEWS_KEY, updated);
    setBookmarkedGames((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Back to Profile</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Saved Articles 📌</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : bookmarkedGames.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No saved articles yet.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedGames}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => router.push(`/(app)/news/${item.id}`)}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardGenre}>{item.genre}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeBookmark(item.id)}
              >
                <Text style={styles.removeBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  backBtn: { marginTop: 12, marginBottom: 16 },
  backBtnText: { color: colors.accentBlue, fontSize: 14, fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 20 },
  list: { gap: 12 },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary },
  cardGenre: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  removeBtn: {
    backgroundColor: '#331111',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#882222',
  },
  removeBtnText: { color: '#FF6666', fontSize: 12, fontWeight: 'bold' },
  emptyState: { marginTop: 60, alignItems: 'center' },
  emptyText: { color: colors.textSecondary, fontSize: 16 },
});

