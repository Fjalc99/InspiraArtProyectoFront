import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ObrasComponent } from './components/obras/obras.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { MatIconModule } from '@angular/material/icon';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ObrasFormComponent } from './components/obra-form/obra-form.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArtistaComponent,
    UsuariosComponent,
    AdminsComponent,
    ObrasComponent,
    ComentariosComponent,
    SidebarComponent,
    CategoriaComponent,
    CategoriaFormComponent,
    ObrasFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule ,
    MatSelectModule
    
    
    

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
