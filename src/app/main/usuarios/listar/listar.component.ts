import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  usuarios: any = {};
  usuario: Object | any = {};
  rol: string | any = "";
  constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

  pages: number = 1;
  dataset: any[] = [];

  ngOnInit(): void {
    this.usuario = this.authService.getTokenD();
    this.rol = this.usuario['rol'];
    console.log(this.rol);

    /* traer usuarios */
    this.usuarioService.GetUsuarios().subscribe(data => {
      this.usuarios = data;
      this.dataset = Object.entries(this.usuarios);
      console.log(this.dataset);
    });
  }
}
