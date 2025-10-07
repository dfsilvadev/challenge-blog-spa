import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

import { Routes } from './constants/routesMap';

export default [
  // Layout principal
  layout('../layout/base.tsx', [
    // HOME quando não autenticado = POSTS
    index('../pages/posts.tsx'),

    // Rotas públicas
    route(Routes.POSTS.replace('/', ''), '../pages/posts.tsx'),
    route(Routes.POST_DETAILS.replace('/', ''), '../pages/post-details.tsx'),

    // Rotas privadas
    layout('./private/index.tsx', [
      route(Routes.DASHBOARD.replace('/', ''), '../pages/dashboard.tsx'),
      route(
        Routes.DASHBOARD_EDIT_POST.replace('/', ''),
        '../pages/post-edit.tsx'
      ),
      route(
        Routes.DASHBOARD_CREATE_POST.replace('/', ''),
        '../pages/post-create.tsx'
      ),
    ]),

    // NotFound
    route(Routes.NOT_FOUND, '../pages/not-found.tsx'),
  ]),

  // Layout de autenticação
  layout('../layout/auth.tsx', [
    route(Routes.SIGN_IN.replace('/', ''), '../pages/sign-in.tsx'),
  ]),
] satisfies RouteConfig;
