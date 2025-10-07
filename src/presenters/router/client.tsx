import { createBrowserRouter, Navigate } from 'react-router';

import AuthLayout from '../layout/auth';
import BaseLayout from '../layout/base';

import { Routes as RoutePaths } from './constants/routesMap';
import PrivateRoutes from './private';

import Dashboard from '../pages/dashboard';
import NotFound from '../pages/not-found';
import PostCreate from '../pages/post-create.tsx';
import PostDetails from '../pages/post-details';
import PostEdit from '../pages/post-edit';
import Posts from '../pages/posts';
import SignIn from '../pages/sign-in';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <Navigate to={RoutePaths.POSTS} replace /> },
      { path: RoutePaths.POSTS.replace('/', ''), element: <Posts /> },
      {
        path: RoutePaths.POST_DETAILS.replace('/', ''),
        element: <PostDetails />,
      },

      {
        element: <PrivateRoutes />,
        children: [
          {
            path: RoutePaths.DASHBOARD.replace('/', ''),
            element: <Dashboard />,
          },
          {
            path: RoutePaths.DASHBOARD_EDIT_POST.replace('/', ''),
            element: <PostEdit />,
          },
          {
            path: RoutePaths.DASHBOARD_CREATE_POST.replace('/', ''),
            element: <PostCreate />,
          },
        ],
      },

      { path: RoutePaths.NOT_FOUND, element: <NotFound /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: RoutePaths.SIGN_IN.replace('/', ''), element: <SignIn /> },
    ],
  },
]);

export default router;
