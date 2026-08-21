import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../../src/theme/colors';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export default function DynamicHubChatScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Alex', text: 'Anyone running the time trial right now?', time: '17:30', isMe: false },
    { id: '2', sender: 'DevMode', text: 'New optimization patch dropping at midnight!', time: '17:32', isMe: false },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{slug ? String(slug).replace('-', ' ').toUpperCase() : 'HUB CHAT'}</Text>
      </View>

      {/* Messages Feed */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.msgBubble, item.isMe ? styles.myMsg : styles.otherMsg]}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.msgText}>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatFeed}
      />

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={colors.textSecondary}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.cardBg,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  backBtn: { marginRight: 12 },
  backText: { color: colors.accentBlue, fontWeight: 'bold' },
  title: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary },
  chatFeed: { padding: 16, gap: 12 },
  msgBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
  },
  otherMsg: {
    backgroundColor: colors.cardBg,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  myMsg: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  sender: { fontSize: 11, color: colors.accentBlue, marginBottom: 2, fontWeight: 'bold' },
  msgText: { color: colors.textPrimary, fontSize: 14 },
  time: { fontSize: 10, color: colors.textSecondary, marginTop: 4, alignSelf: 'flex-end' },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.textPrimary,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  sendBtnText: { color: colors.textPrimary, fontWeight: 'bold' },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function HubChatScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', user: 'PixelKnight', text: 'Anyone running the new raid tonight?', time: '17:02' },
    { id: '2', user: 'VibeCoder', text: 'Yeah count me in, just testing out this build.', time: '17:05' },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), user: 'You', text: message, time: 'Just now' },
    ]);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>#{slug}</Text>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.user === 'You' ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.username}>{item.user}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatFeed}
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#777"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f14',
  },
  header: {
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: '#181820',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderColor: '#23232e',
  },
  backButton: {
    padding: 6,
  },
  backButtonText: {
    color: '#89b4fa',
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatFeed: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  otherMessage: {
    backgroundColor: '#181820',
    alignSelf: 'flex-start',
  },
  myMessage: {
    backgroundColor: '#6c5ce7',
    alignSelf: 'flex-end',
  },
  username: {
    color: '#a0a0ab',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
  timestamp: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#181820',
    borderTopWidth: 1,
    borderColor: '#23232e',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#0f0f14',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
  },
  sendButton: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
nano "app/(app)/game/[title].tsx"
nano "app/(app)/launchpad/index.tsx"
nano "app/(app)/launchpad/[id].tsx"
nano "app/(app)/launchpad/upload.tsx"
nano "src/api/client.ts"
nano "src/api/socket.ts"
nano "src/api/types.ts"
nano "src/api/tokenStorage.ts"
nano "src/context/AuthContext.tsx"
nano "src/screens/ScoreSelector.tsx"
git add .
git commit -m "Populate dynamic routes and API logic"
git push

