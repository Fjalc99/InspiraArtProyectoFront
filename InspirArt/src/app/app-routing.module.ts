import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ObrasComponent } from './components/obras/obras.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'artista', component: ArtistaComponent },
  { path: 'usuario', component: UsuariosComponent },
  { path: 'obra', component: ObrasComponent },
  { path: 'admin', component: AdminsComponent },
  { path: 'comntarios', component: ComentariosComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'categoria/nueva', component: CategoriaFormComponent },
  { path: 'categoria/editar/:id', component: CategoriaFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
