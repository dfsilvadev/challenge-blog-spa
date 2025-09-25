import { useState } from 'react';
import { List, X } from 'phosphor-react';

export default function Header() {
  const [isLoggedIn, setIsLogged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAutClick = () => setIsLogged(prevState => !prevState);

  return (
    <header className="w-full text-white px-8 py-6 flex items-center justify-between fixed top-0 z-50">
      <a href="#" className="text-3xl">
        Logo
      </a>

      {/* Menu Desktop */}
      <nav className="hidden lg:flex text-2xl gap-x-8 items-center">
        <a href="#">Home</a>
        <button
          onClick={handleAutClick}
          className="rounded-full px-12 py-2 bg-black"
        >
          {isLoggedIn ? 'Sair' : 'Login'}
        </button>
      </nav>

      {/* Botão Hamburguer (mobile/tablet) */}
      <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={32} /> : <List size={32} />}
      </button>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full flex flex-col items-center text-xl py-6 gap-6 md:hidden">
          <a href="#" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <button
            onClick={() => {
              handleAutClick();
              setMenuOpen(false);
            }}
            className="rounded-full px-12 py-2 bg-black"
          >
            {isLoggedIn ? 'Sair' : 'Login'}
          </button>
        </div>
      )}
    </header>
  );
}
