import { Outlet } from 'react-router';
import Header from '../components/header';
import Hero from '../assets/Hero.png';

const Base = () => {
  return (
    <div>
      <Header />
      <div
        className="bg-local brightness-75 w-full h-[80px] md:h-[300px] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${Hero})` }}
      ></div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Base;
