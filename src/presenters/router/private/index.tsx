import { Navigate, Outlet, useLocation } from 'react-router';

import { Routes } from '../constants/routesMap';

const PrivateRoutes = () => {
  const location = useLocation();
  const isAuthenticated = true;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={Routes.SIGN_IN} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
