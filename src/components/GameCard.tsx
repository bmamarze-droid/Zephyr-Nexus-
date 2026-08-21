import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Game } from '../services/gameService';
import { colors } from '../theme/colors';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/game/${game.id}`)}
      activeOpacity={0.8}
    >
      <Text style={styles.cardTitle}>{game.title}</Text>
      <Text style={styles.cardGenre}>{game.genre}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {game.description}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.rating}>⭐ {game.rating}</Text>
        <Text style={styles.linkText}>View Details →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cardGenre: {
    fontSize: 12,
    color: colors.accentBlue,
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
    color: colors.warning,
    fontWeight: 'bold',
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

