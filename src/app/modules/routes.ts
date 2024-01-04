export const routeModules = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((module) => module.UsersModule),
  },
  {
    path: 'videos',
    loadChildren: () =>
      import('./videos/videos.module').then((module) => module.VideosModule),
  },
];
