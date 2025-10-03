import { useState, useEffect, useCallback } from 'react';
import type { User } from '../presenters/components/ui/user';
import type { LoginResponse } from '../presenters/components/ui/auth';

type UseAuthReturn = {
  isLoggedIn: boolean;
  user: User | null;
  login: (response: LoginResponse) => void;
  logout: () => void;
};

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

function safeParseUser(value: string | null): User | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (
      typeof parsed.id === 'string' &&
      typeof parsed.name === 'string' &&
      typeof parsed.email === 'string'
    ) {
      return parsed as User;
    }
    return null;
  } catch {
    return null;
  }
}

export function useAuth(): UseAuthReturn {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem(TOKEN_KEY)
  );
  const [user, setUser] = useState<User | null>(() =>
    safeParseUser(localStorage.getItem(USER_KEY))
  );

  const login = useCallback((response: LoginResponse) => {
    const { token, id, name, email } = response.details;

    const userData: User = { id, name, email };

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));

    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload();
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY) setIsLoggedIn(!!e.newValue);
      if (e.key === USER_KEY) setUser(safeParseUser(e.newValue));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return { isLoggedIn, user, login, logout };
}
