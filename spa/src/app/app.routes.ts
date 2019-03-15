import { Routes } from '@angular/router';
import { StatusComponent } from './components/status/status.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './_pages/home/home.module#HomeModule',
  },
  {
    path: 'server-error',
    component: StatusComponent,
    data: {
      status: 500,
    },
  },
  {
    path: 'access-denied',
    component: StatusComponent,
    data: {
      status: 403,
    },
  },
  {
    path: '**',
    component: StatusComponent,
    data: {
      status: 404,
    },
  },
];
