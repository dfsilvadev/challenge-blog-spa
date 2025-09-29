import { Outlet } from 'react-router';

const Auth = () => {
  return (
    <div>
      <header>
        <h1>Auth Layout</h1>
      </header>

      <Outlet />
    </div>
  );
};

export default Auth;
