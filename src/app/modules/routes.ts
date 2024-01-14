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

  {
    path: 'campaing',
    loadChildren: () =>
      import('./campaing/campaing.module').then(
        (module) => module.CampaingModule
      ),
  },

  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then(
        (module) => module.CategoryModule
      ),
  },

  {
    path: 'images',
    loadChildren: () =>
      import('./images/images.module').then((module) => module.ImagesModule),
  },

  {
    path: 'files',
    loadChildren: () =>
      import('./files/files.module').then((module) => module.FilesModule),
  },

  {
    path: 'operators',
    loadChildren: () =>
      import('./operators/operators.module').then(
        (module) => module.OperatorsModule
      ),
  },
];
