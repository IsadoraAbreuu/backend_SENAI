import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AutoresComponent }from './pages/authors/authors.component';
import { EditorasComponent }from './pages/editoras/editoras.component';
import { LivrosComponent }from './pages/livros/livros.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'autores', component: AutoresComponent, canActivate: [authGuard]},
    {path: 'editoras', component: EditorasComponent, canActivate: [authGuard]},
    {path: 'livros', component: LivrosComponent, canActivate: [authGuard]},
    {path: 'pesquisas', component: LivrosComponent, canActivate: [authGuard]},
];
