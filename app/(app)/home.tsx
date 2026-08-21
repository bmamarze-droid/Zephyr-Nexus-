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

