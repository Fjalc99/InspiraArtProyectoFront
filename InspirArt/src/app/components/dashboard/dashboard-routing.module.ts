import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ObrasComponent } from '../obras/obras.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { DashboardComponent } from './dashboard.component';
import { ArtistaComponent } from '../artista/artista.component';
import { AdminsComponent } from '../admins/admins.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'obra', component: ObrasComponent, canActivate: [AuthGuard] },
      { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard] },
      { path: 'usuario', component: UsuariosComponent, canActivate: [AuthGuard] },
      { path: 'artista', component: ArtistaComponent, canActivate: [AuthGuard] },
      { path: 'admins', component: AdminsComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'obra', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
