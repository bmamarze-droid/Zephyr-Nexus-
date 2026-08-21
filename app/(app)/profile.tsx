import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const user = {
    username: 'ZephyrGamer',
    handle: '@zephyr_dev',
    avatar: 'https://via.placeholder.com/150/6c5ce7/ffffff?text=Z',
    joined: 'August 2026',
    favoriteGames: 12,
    posts: 48,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile Info */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.handle}>{user.handle}</Text>
        <Text style={styles.joined}>Member since {user.joined}</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.favoriteGames}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>⚙️ Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🔔 Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🎮 Connected Platforms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  handle: {
    fontSize: 14,
    color: '#89b4fa',
    marginTop: 2,
  },
  joined: {
    fontSize: 12,
    color: '#a0a0ab',
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#181820',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#23232e',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  statLabel: {
    fontSize: 12,
    color: '#a0a0ab',
    marginTop: 2,
  },
  menuContainer: {
    marginTop: 20,
    gap: 10,
  },
  menuItem: {
    backgroundColor: '#181820',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#23232e',
  },
  menuText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  logoutItem: {
    borderColor: 'rgba(255, 107, 107, 0.3)',
    marginTop: 10,
  },
  logoutText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

