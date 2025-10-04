import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Routes } from '../../router/constants/routesMap';
import { useAuth } from '../../../hooks/useAuth';
import { useClickOutside } from '../../../hooks/useClickOutside'; // ✅ import do hook

interface User {
  id: string;
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const userJSON = localStorage.getItem('user');
  let userName = 'U';

  if (userJSON) {
    try {
      const userObj: User = JSON.parse(userJSON);
      if (userObj.name) userName = userObj.name;
    } catch (e) {
      console.error('Erro ao ler usuário do localStorage:', e);
    }
  }

  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = getInitials(userName);

  const handleAuthClick = (): void => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate(Routes.SIGN_IN);
    }
    setDropdownOpen(false);
  };

  return (
    <header className="w-full px-6 md:px-12 py-10 flex items-center justify-between fixed top-0 z-50">
      <button
        onClick={() => navigate(Routes.POSTS)}
        className="text-2xl md:text-3xl font-bold text-white"
      >
        Blog Escolar
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center w-15 h-15 text-lg md:text-2xl rounded-full border border-black bg-white font-semibold text-black"
        >
          {initials}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg py-1">
            <button
              onClick={handleAuthClick}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
