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
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'token') setIsLoggedIn(!!e.newValue);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return { isLoggedIn, login, logout };
}
