import { useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLogged] = useState(true);

  const handleAutClick = () => {
    if (isLoggedIn) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  };
  return (
    <header className="w-full px-[24px] py-[24px] text-white flex items-center justify-between fixed top-0">
      <a href="#" className="text-[20px]">
        Logo
      </a>

      <nav className="flex text-[15px] gap-[14px] items-center">
        <a href="#" className="text-white no-underline hover:text-gray-300">
          Home
        </a>

        <button
          onClick={handleAutClick}
          className="rounded-full px-[24px] py-[6px] border-none appearance-none bg-black text-white hover:bg-gray-800 transition-colors"
        >
          {isLoggedIn ? 'Sair' : 'Login'}
        </button>
      </nav>
    </header>
  );
}
