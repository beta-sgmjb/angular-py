import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})

export class CrearComponent implements OnInit {

  issueFormUEP: FormGroup | any;
  usuario: any = {};
  persona: any = {};
  estudiante: any = {};

  ngOnInit() {
    this.addIssue();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private estudianteService: EstudianteService,
    private usuarioService: UsuarioService,
    private personaService: PersonaService
  ) { }

  addIssue() {
    this.issueFormUEP = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      rol: ['estudiante'],

      nombres: [''],
      apellidoP: [''],
      apellidoM: [''],
      edad: [''],
      fechaNacimiento: [''],
      idUsuario: ['1'],

      ciclo: [''],
      carreraProfesional: [''],
      estado: ['1'],
      idPersona: ['1'],
    });
  }

  submitForm() {

    this.usuario.name = this.issueFormUEP.value.name;
    this.usuario.email = this.issueFormUEP.value.email;
    this.usuario.password = this.issueFormUEP.value.password;
    this.usuario.rol = this.issueFormUEP.value.rol;

    this.persona.nombres = this.issueFormUEP.value.nombres;
    this.persona.apellidoP = this.issueFormUEP.value.apellidoP;
    this.persona.apellidoM = this.issueFormUEP.value.apellidoM;
    this.persona.edad = this.issueFormUEP.value.edad;
    this.persona.fechaNacimiento = this.issueFormUEP.value.fechaNacimiento;
    this.persona.idUsuario = this.issueFormUEP.value.idUsuario;

    this.estudiante.ciclo = this.issueFormUEP.value.ciclo;
    this.estudiante.carreraProfesional = this.issueFormUEP.value.carreraProfesional;
    this.estudiante.estado = this.issueFormUEP.value.estado;
    this.estudiante.idPersona = this.issueFormUEP.value.idPersona;

    console.log(this.issueFormUEP.value);
    console.log(this.usuario);
    console.log(this.persona);
    console.log(this.estudiante);

    this.usuarioService.CreateUsuario(this.usuario).subscribe((res) => {
      console.log('Issue added!', res);
      this.persona.idUsuario = res.id
      this.personaService.CreatePersona(this.persona).subscribe((res1: any) => {
        console.log('Issue added!', res1);
        this.estudiante.idPersona = res1.id
        this.estudianteService.CreateEstudiante(this.persona).subscribe((res2: any) => {
          console.log('Issue added!', res2);

          /* this.ngZone.run(() => this.router.navigateByUrl('/sys/estudiantes/listar')); */
        });
      });
    });
  }
}
