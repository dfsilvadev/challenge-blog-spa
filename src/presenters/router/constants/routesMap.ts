const Routes = {
  SIGN_IN: '/sign-in',
  POSTS: '/posts',
  POST_DETAILS: '/posts/:id',
  DASHBOARD: '/dashboard/posts',
  DASHBOARD_EDIT_POST: '/dashboard/posts/:id/edit',
  NOT_FOUND: '*',
} as const;

export { Routes };
