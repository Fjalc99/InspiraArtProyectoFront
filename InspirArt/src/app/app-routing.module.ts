import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroArtistaComponent } from './components/registro-artista/registro-artista.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { ActivarCuentaUsuarioComponent } from './components/activar-cuenta-usuario/activar-cuenta-usuario.component';
import { ActivarCuentaArtistaComponent } from './components/activar-cuenta-artista/activar-cuenta-artista.component';
import { HomeUsuarioComponent } from './components/home-usuario/home-usuario.component';
import { HomeArtistaComponent } from './components/home-artista/home-artista.component';
import { ListaObrasUsuarioComponent } from './components/lista-obras-usuario/lista-obras-usuario.component';
import { DetalleObraComponent } from './components/detalle-obra/detalle-obra.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ListaObraArtistaComponent } from './components/lista-obra-artista/lista-obra-artista.component';
import { ProfileArtistaComponent } from './components/profile-artista/profile-artista.component';
import { MisObrasComponent } from './components/mis-obras/mis-obras.component';
import { ActivarCuentaAdminComponent } from './components/activar-cuenta-admin/activar-cuenta-admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: 'registro-artista', component: RegistroArtistaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activar-cuenta-usuario', component: ActivarCuentaUsuarioComponent },
  { path: 'activar-cuenta-artista', component: ActivarCuentaArtistaComponent },
  {path: 'activar-cuenta-admin', component: ActivarCuentaAdminComponent},
 
  { path: 'home-usuario', component: HomeUsuarioComponent , 
    children: [
      { path: '', component: ListaObrasUsuarioComponent },
      { path: 'obra/:id', component: DetalleObraComponent},
       {path: 'favoritos', component: FavoritosComponent},
       { path: 'perfil', component: ProfileUserComponent } ,

       

    ]
  },
  
  { path: 'home-artista', component: HomeArtistaComponent,
    children: [
      {path: '', component: ListaObraArtistaComponent },
      { path: 'perfil', component: ProfileArtistaComponent },
        {path: 'mis-obras', component: MisObrasComponent},

    ]
   },


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
