import { Outlet } from 'react-router';
import Hero from '../assets/Hero.png';
import Header from '../components/header';

const Base = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div
        className="w-full h-[180px] bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${Hero})` }}
      />

      <div className="bg-[#f2f3f5] rounded-t-[20px] -mt-[20px] relative z-10 flex-1">
        <main className="p-4 h-full">
          <Outlet />
        </main>
      </div>

      <div className="bg-black relative w-full h-25 mt-auto">
        <span className="flex justify-center pt-7 text-white text-2xl ">
          Todos direitos reservados © 2025{' '}
        </span>
      </div>
    </div>
  );
};

export default Base;
