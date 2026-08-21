import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function GameDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const game = {
    title: 'Cyber Odyssey 2077',
    genre: 'Action RPG / Sci-Fi',
    rating: '4.8',
    reviewsCount: '1.2k',
    description: 'Explore a sprawling neon-lit metropolis, upgrade cybernetics, and engage in high-octane tactical combat in this immersive open-world adventure.',
    tags: ['Single Player', 'Open World', 'Cyberpunk', 'Co-op'],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/600x300/1e1e2e/89b4fa?text=Zephyr+Game+Cover' }}
          style={styles.bannerImage}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.genre}>{game.genre}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>⭐ {game.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{game.reviewsCount}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        <View style={styles.tagContainer}>
          {game.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHeader}>About</Text>
        <Text style={styles.description}>{game.description}</Text>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Launch Demo / Community Hub</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f14',
  },
  bannerContainer: {
    position: 'relative',
    height: 220,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  genre: {
    fontSize: 14,
    color: '#a0a0ab',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    backgroundColor: '#181820',
    borderRadius: 12,
    padding: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  statLabel: {
    fontSize: 12,
    color: '#a0a0ab',
    marginTop: 2,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#23232e',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tagText: {
    color: '#a0a0ab',
    fontSize: 12,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

