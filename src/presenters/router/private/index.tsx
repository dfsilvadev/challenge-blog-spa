import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { Routes } from '../constants/routesMap';

const PrivateRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={Routes.SIGN_IN} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
