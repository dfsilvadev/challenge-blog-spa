import { Outlet } from 'react-router';

const Base = () => {
  return (
    <div>
      <header>
        <h1>Base Layout</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Base;
