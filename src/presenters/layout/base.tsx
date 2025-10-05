import { Outlet } from 'react-router';
import Header from '../components/header';
import Hero from '../assets/Hero.png';

const Base = () => {
  return (
    <div>
      <Header />

      <div
        className="w-full h-[180px] bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${Hero})` }}
      />

      <div className="bg-[#f2f3f5] rounded-t-[20px] -mt-[20px] relative z-10">
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Base;
