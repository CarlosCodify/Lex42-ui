import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/main-page/main-page.component').then(m => m.MainPageComponent)
  },
  {
    path: 'servicios',
    loadComponent: () => import('./features/services-detail/services-detail.component').then(m => m.ServicesDetailComponent)
  },
  {
    path: 'equipo',
    loadComponent: () => import('./features/team-detail/team-detail.component').then(m => m.TeamDetailComponent)
  },
  {
    path: 'noticias',
    loadComponent: () => import('./features/news/news.component').then(m => m.NewsComponent)
  }
];
