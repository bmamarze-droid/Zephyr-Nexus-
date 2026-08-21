import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { colors } from '../../src/theme/colors';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile 👤</Text>
      </View>

      {/* User Info Card */}
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.username?.[0] ?? 'U'}</Text>
        </View>

        <Text style={styles.username}>{user?.username ?? 'Guest User'}</Text>
        <Text style={styles.handle}>{user?.handle ?? '@guest'}</Text>
        <Text style={styles.bio}>{user?.bio ?? 'No bio set.'}</Text>
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  handle: {
    fontSize: 14,
    color: colors.accentBlue,
    marginTop: 2,
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  logoutBtn: {
    marginTop: 24,
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
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

