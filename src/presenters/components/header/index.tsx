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
    <header className="w-full px-[24px] py-[24px] flex items-center justify-between fixed top-0">
      <a href="#" className="text-[20px] text-white">
        Logo
      </a>

      <nav className="flex text-[15px] gap-[14px] items-center">
        <a href="#" className=" no-underline hover:text-gray-300 text-white">
          Home
        </a>

        <button
          onClick={handleAutClick}
          className="rounded-full px-[24px] py-[6px] text-white border-none appearance-none bg-black hover:bg-gray-800 transition-colors"
        >
          {isLoggedIn ? 'Sair' : 'Login'}
        </button>
      </nav>
    </header>
  );
}
