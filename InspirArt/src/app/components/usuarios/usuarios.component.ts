import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioDto } from '../../interfaces/UsuarioDto';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  Usuarios: UsuarioDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  constructor(private usuarioService: UsuariosService) { }
  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios(this.page, this.size).subscribe(
      (data: any) => {
        this.Usuarios = data.content;
        this.totalPages = data.totalPages;
      },
      (error) => {
        console.error('Error fetching usuarios:', error);
        this.Usuarios = [];
        this.totalPages = 0;
      }
    );
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadUsuarios();
    }
  }



}
