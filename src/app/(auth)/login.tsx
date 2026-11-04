import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useTheme } from '@/hooks/use-theme';

const WHATSAPP_GREEN = '#25D366';

function formatPhone(digits: string) {
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function LoginScreen() {
  const theme = useTheme();
  const { signIn } = useAuth();
  const [phone, setPhone] = useState('');

  const digits = phone.replace(/\D/g, '');
  const canContinue = digits.length >= 10;

  function handleChangePhone(text: string) {
    setPhone(formatPhone(text.replace(/\D/g, '').slice(0, 11)));
  }

  function handleContinue() {
    if (!canContinue) return;
    signIn(phone);
    router.replace('/');
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.heroSection}>
            <ThemedView style={[styles.logoCircle, { backgroundColor: WHATSAPP_GREEN }]}>
              <ThemedText style={styles.logoEmoji}>💬</ThemedText>
            </ThemedView>
            <ThemedText type="title" style={styles.appName}>
              Zapzap
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.formSection}>
            <ThemedText type="subtitle" style={styles.formTitle}>
              Digite seu número de telefone
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.formHint}>
              O Zapzap vai enviar um SMS (encargos poderão ser aplicados) para confirmar seu
              número de telefone.
            </ThemedText>

            <ThemedView type="backgroundElement" style={styles.inputRow}>
              <ThemedView type="backgroundSelected" style={styles.countryCode}>
                <ThemedText type="smallBold">🇧🇷 +55</ThemedText>
              </ThemedView>
              <TextInput
                value={phone}
                onChangeText={handleChangePhone}
                placeholder="(11) 91234-5678"
                placeholderTextColor={theme.textSecondary}
                keyboardType="phone-pad"
                style={[styles.input, { color: theme.text }]}
                maxLength={16}
                autoFocus
              />
            </ThemedView>

            <Pressable
              onPress={handleContinue}
              disabled={!canContinue}
              style={({ pressed }) => [
                styles.continueButton,
                { backgroundColor: canContinue ? WHATSAPP_GREEN : theme.backgroundSelected },
                pressed && canContinue && styles.pressed,
              ]}>
              <ThemedText
                type="smallBold"
                style={{ color: canContinue ? '#ffffff' : theme.textSecondary }}>
                Avançar
              </ThemedText>
            </Pressable>
          </ThemedView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 44,
  },
  appName: {
    fontSize: 32,
    lineHeight: 38,
  },
  formSection: {
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  formTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  formHint: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  countryCode: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: Spacing.one,
  },
  continueButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.five,
  },
  pressed: {
    opacity: 0.85,
  },
});
