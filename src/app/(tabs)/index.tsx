import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatListItem, type Chat } from '@/components/chat-list-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const CHATS: Chat[] = [
  {
    id: '1',
    name: 'Mariana Alves',
    avatarInitials: 'MA',
    avatarColor: '#F08A5D',
    lastMessage: 'Combinamos pra sábado então? 😄',
    time: '09:41',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Família',
    avatarInitials: '👨‍👩‍👧',
    avatarColor: '#6C5CE7',
    lastMessage: 'João: Alguém viu minha chave do carro?',
    time: 'Ontem',
  },
  {
    id: '3',
    name: 'Carlos Eduardo',
    avatarInitials: 'CE',
    avatarColor: '#2E86AB',
    lastMessage: 'Vou chegar em 10 minutos',
    time: '11:02',
  },
];

export default function ConversationsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedText type="title" style={styles.header}>
          Conversas
        </ThemedText>

        <FlatList
          data={CHATS}
          keyExtractor={(chat) => chat.id}
          renderItem={({ item }) => <ChatListItem chat={item} />}
          ItemSeparatorComponent={() => <ThemedView type="backgroundElement" style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  header: {
    fontSize: 28,
    lineHeight: 34,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  listContent: {
    paddingBottom: BottomTabInset + Spacing.three,
  },
  separator: {
    height: 1,
    marginLeft: Spacing.four + 52 + Spacing.three,
  },
});
