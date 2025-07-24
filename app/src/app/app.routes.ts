import { Routes } from '@angular/router';
import {MoviesListComponent} from './movies/components/movie-list/movie-list.component';
import {LoginComponent} from './auth/components/login/login.component';
import {LogoutComponent} from './auth/components/logout/logout.component';
import {AuthGuard} from './auth/guard/auth.guard';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "movies", component: MoviesListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];
