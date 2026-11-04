import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export type Chat = {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
};

type ChatListItemProps = {
  chat: Chat;
};

export function ChatListItem({ chat }: ChatListItemProps) {
  const hasUnread = !!chat.unreadCount;

  return (
    <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <ThemedView style={[styles.avatar, { backgroundColor: chat.avatarColor }]}>
        <ThemedText style={styles.avatarInitials}>{chat.avatarInitials}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.topRow}>
          <ThemedText type="smallBold" style={styles.name} numberOfLines={1}>
            {chat.name}
          </ThemedText>
          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={hasUnread && styles.unreadTime}>
            {chat.time}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.bottomRow}>
          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={styles.message}
            numberOfLines={1}>
            {chat.lastMessage}
          </ThemedText>
          {hasUnread && (
            <ThemedView style={styles.badge}>
              <ThemedText type="small" style={styles.badgeText}>
                {chat.unreadCount}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  pressed: {
    opacity: 0.6,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    gap: Spacing.half,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
  unreadTime: {
    color: '#25D366',
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  message: {
    flex: 1,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: Spacing.one,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
