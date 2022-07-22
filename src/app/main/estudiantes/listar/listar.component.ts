import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Usuario } from 'src/app/models/usuario';
import { Subscription } from 'rxjs';
declare var window: any;
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  formModal: any;
  formModal2: any;
  estudianteForm: FormGroup;
  pages: number = 1;
  updateIssueForm: FormGroup;

  usuario: any = {};
  persona: any = {};
  estudiante: any = {};

  estudiantes: any = [];
  removed: any = [];
  rol = "";

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private authService: AuthService
  ) {

    this.updateIssueForm = this.fb.group({
      id: [''],
      ciclo: [''],
      carreraProfesional: ['']
    })

    this.estudianteForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      rol: ['estudiante'],

      nombres: [''],
      apellidoP: [''],
      apellidoM: [''],
      edad: [''],
      fechaNacimiento: [''],
      idUsuario: [''],

      ciclo: [''],
      carreraProfesional: [''],
      estado: ['1'],
      idPersona: [''],
    });

  }

  ngOnInit(): void {
    this.rol = JSON.parse(this.authService.getTokenD()).usuario.rol;
    console.log(this.rol);

    this.formModal2 = new window.bootstrap.Modal(
      document.getElementById('myModal2')
    );
    /* Inicializar bootstrap */
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );

    this.GetEstudiantes();
  }

  /* Crear usuario */
  openFormModal() {
    this.estudianteForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      rol: ['estudiante'],

      nombres: [''],
      apellidoP: [''],
      apellidoM: [''],
      edad: [''],
      fechaNacimiento: [''],
      idUsuario: [''],

      ciclo: [''],
      carreraProfesional: [''],
      estado: ['1'],
      idPersona: [''],
    });
    this.formModal.show();
  }

  openFormModal2() {
    this.formModal2.show();
  }

  saveForm() {

    this.usuario.name = this.estudianteForm.value.name;
    this.usuario.email = this.estudianteForm.value.email;
    this.usuario.password = this.estudianteForm.value.password;
    this.usuario.rol = this.estudianteForm.value.rol;

    this.persona.nombres = this.estudianteForm.value.nombres;
    this.persona.apellidoP = this.estudianteForm.value.apellidoP;
    this.persona.apellidoM = this.estudianteForm.value.apellidoM;
    this.persona.edad = this.estudianteForm.value.edad;
    this.persona.fechaNacimiento = this.estudianteForm.value.fechaNacimiento;
    this.persona.idUsuario = this.estudianteForm.value.idUsuario;

    this.estudiante.ciclo = this.estudianteForm.value.ciclo;
    this.estudiante.carreraProfesional = this.estudianteForm.value.carreraProfesional;
    this.estudiante.estado = this.estudianteForm.value.estado;
    this.estudiante.idPersona = this.estudianteForm.value.idPersona;

    console.log(this.estudianteForm.value);

    this.usuarioService.CreateUsuario(this.usuario).subscribe((res) => {
      console.log('Se agregó el usuario!', res);
      this.persona.idUsuario = res.id
      this.personaService.CreatePersona(this.persona).subscribe((res1) => {
        console.log('Issue Se agregó la persona!', res1);
        this.estudiante.idPersona = res1.id
        this.estudianteService.CreateEstudiante(this.estudiante).subscribe((res2) => {
          console.log('Se agregó el estudiante!', res2);
          this.estudiantes = [];
          this.GetEstudiantes();
          this.formModal.hide();
        });
      });
    });
  }

  GetEstudiantes() {
    return this.estudianteService.GetEstudiantes().subscribe((data: {} | any) => {    
      for (const item of data) {
        console.log(item);
        this.personaService.GetPersona(item.idPersona).subscribe((data: any) => {
          this.removed.push(item, data);
          this.estudiantes.push(this.removed);
          this.removed = [];
        });
      }
    })
  }

  deleteEstudiante(data: any) {
    var index: any = index = this.estudiantes.map((x: any) => { return x.idPersona }).indexOf(data.idPersona);
    return this.estudianteService.DeleteEstudiante(data.id).subscribe(res => {
      this.estudiantes.splice(index, 1)
      console.log('Issue deleted!')
    })
  }

  updateEvent(id: number) {
    this.openFormModal2();
    this.estudianteService.GetEstudiante(id).subscribe((data: {} | any) => {
      console.log(data);
      
      this.updateIssueForm = this.fb.group({
        id: [data.id],
        ciclo: [data.ciclo],
        carreraProfesional: [data.carreraProfesional]
      })
    })
  }

  submitForm(){
    this.estudianteService.UpdateEstudiante(this.updateIssueForm.value.id, this.updateIssueForm.value).subscribe(res => {
      console.log(res);
      
      this.GetEstudiantes();
      this.formModal2.hide();
    })
  }
}
