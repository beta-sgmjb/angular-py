import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var window: any;
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  
  usuarios: any[] = [];
  usuario: Object | any = {};
  rol: string | any = "";
  formModal: any;
  pages: number = 1;
  
  constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

  ngOnInit(): void {

    /* Inicializar bootstrap */
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    
    this.usuario = this.authService.getTokenD();
    this.rol = this.usuario['rol'];
    console.log(this.rol);

    /* traer usuarios */
    this.GetUsuarios();
  }

  /* Crear usuario */
  openFormModal() {
    this.formModal.show();
  }
  saveForm() {
    this.GetUsuarios();
    this.formModal.hide();
  }

  GetUsuarios() {
    this.usuarioService.GetUsuarios().subscribe(data => {
      this.usuarios = Object.entries(data);
    });
  }
}
