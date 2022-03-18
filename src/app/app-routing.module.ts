import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { LibrosComponent } from './libros/libros.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { SeguridadRouter } from './seguridad/seguridad.router';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [SeguridadRouter] },
  {
    path: 'Libros',
    component: LibrosComponent,
    canActivate: [SeguridadRouter],
  },
  {
    path: 'Usuarios',
    component: UsuarioComponent,
    canActivate: [SeguridadRouter],
  },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'books', component: BooksComponent, canActivate: [SeguridadRouter] },
  {
    path: 'autores',
    component: AutoresComponent,
    canActivate: [SeguridadRouter],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
