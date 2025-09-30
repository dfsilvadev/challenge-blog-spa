import { useState, useEffect, useCallback } from 'react';

export function useAuth(tokenKey = 'token') {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem(tokenKey)
  );

  const login = useCallback(
    (token: string) => {
      localStorage.setItem(tokenKey, token);
      setIsLoggedIn(true);
    },
    [tokenKey]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(tokenKey);
    setIsLoggedIn(false);
  }, [tokenKey]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === tokenKey) {
        setIsLoggedIn(!!event.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [tokenKey]);

  return { isLoggedIn, login, logout };
}
