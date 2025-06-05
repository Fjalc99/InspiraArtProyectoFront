import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ObrasComponent } from './components/obras/obras.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
