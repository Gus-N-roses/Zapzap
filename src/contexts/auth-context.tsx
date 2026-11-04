import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  phone: string | null;
  signIn: (phone: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState<string | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: phone !== null,
      phone,
      signIn: setPhone,
      signOut: () => setPhone(null),
    }),
    [phone],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
