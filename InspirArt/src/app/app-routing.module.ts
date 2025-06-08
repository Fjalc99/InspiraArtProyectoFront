import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroArtistaComponent } from './components/registro-artista/registro-artista.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { ActivarCuentaUsuarioComponent } from './components/activar-cuenta-usuario/activar-cuenta-usuario.component';
import { ActivarCuentaArtistaComponent } from './components/activar-cuenta-artista/activar-cuenta-artista.component';
import { HomeUsuarioComponent } from './components/home-usuario/home-usuario.component';
import { HomeArtistaComponent } from './components/home-artista/home-artista.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: 'registro-artista', component: RegistroArtistaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activar-cuenta-usuario', component: ActivarCuentaUsuarioComponent },
  { path: 'activar-cuenta-artista', component: ActivarCuentaArtistaComponent },
  { path: 'home-usuario', component: HomeUsuarioComponent },
  { path: 'home-artista', component: HomeArtistaComponent },

  {
    path: '',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
