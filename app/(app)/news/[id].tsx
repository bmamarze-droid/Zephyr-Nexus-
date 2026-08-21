import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gameService } from '../../../src/services/gameService';
import { Game } from '../../../src/types';
import { storage } from '../../../src/utils/storage';
import { colors } from '../../../src/theme/colors';

const BOOKMARKED_NEWS_KEY = '@zephyr_bookmarked_news';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<Game | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (id) {
        const item = await gameService.getGameById(id);
        if (item) setArticle(item);

        const savedBookmarks = await storage.getItem<string[]>(BOOKMARKED_NEWS_KEY);
        if (savedBookmarks && id) {
          setIsBookmarked(savedBookmarks.includes(id));
        }
      }
      setLoading(false);
    }
    fetchArticle();
  }, [id]);

  const toggleBookmark = async () => {
    if (!id) return;
    const savedBookmarks = (await storage.getItem<string[]>(BOOKMARKED_NEWS_KEY)) || [];
    const updated = savedBookmarks.includes(id)
      ? savedBookmarks.filter((bId) => bId !== id)
      : [...savedBookmarks, id];

    setIsBookmarked(!isBookmarked);
    await storage.setItem(BOOKMARKED_NEWS_KEY, updated);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Article not found.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Back to Feed</Text>
      </TouchableOpacity>

      <Text style={styles.genre}>{article.genre.toUpperCase()}</Text>
      <Text style={styles.title}>{article.title}</Text>

      <View style={styles.badgeRow}>
        <Text style={styles.badge}>Rating: ★ {article.rating}</Text>
        {article.demoAvailable && <Text style={[styles.badge, styles.demoBadge]}>Demo Live</Text>}
      </View>

      <Text style={styles.body}>{article.description}</Text>

      <TouchableOpacity
        style={[styles.bookmarkBtn, isBookmarked && styles.bookmarkedBtn]}
        onPress={toggleBookmark}
      >
        <Text style={styles.bookmarkText}>
          {isBookmarked ? '★ Saved to Bookmarks' : '☆ Bookmark Article'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, paddingBottom: 40 },
  backBtn: { marginBottom: 16 },
  backBtnText: { color: colors.accentBlue, fontSize: 14, fontWeight: 'bold' },
  genre: { fontSize: 12, color: colors.primary, fontWeight: 'bold', letterSpacing: 1 },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.textPrimary, marginVertical: 8 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  badge: {
    backgroundColor: colors.cardBg,
    color: colors.textSecondary,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  demoBadge: { borderColor: colors.primary, color: colors.primary },
  body: { fontSize: 16, color: '#DDD', lineHeight: 24, marginBottom: 24 },
  bookmarkBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookmarkedBtn: { backgroundColor: colors.borderColor },
  bookmarkText: { color: colors.textPrimary, fontWeight: 'bold', fontSize: 14 },
  errorText: { color: colors.textSecondary, fontSize: 16, marginBottom: 16 },
});

