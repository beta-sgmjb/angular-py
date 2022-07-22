import { Component, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ref, uploadBytes } from '@firebase/storage';
import { AuthService } from 'src/app/services/auth.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PppService } from 'src/app/services/ppp.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var window: any;
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  pppForm: FormGroup;
  upForm: FormGroup;
  formModal: any;
  formModal2: any;
  ppps: any = [];
  removed: any = [];
  removede: any = [];
  estudiantes: any = [];
  pages: number = 1;
  ppp: any = {};
  rol = "";
  constructor(private fb: FormBuilder,
    private pppService: PppService,
    private estudianteService: EstudianteService,
    private personaService: PersonaService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private storage: Storage) {
    this.pppForm = this.fb.group({
      nombre: [''],
      idEstudiante: [''],
      cartaPresentacion: [''],
      cartaAceptacion: [''],
      convenioPPP: [''],
      planPPP: [''],
    });
    this.upForm = this.fb.group({
      id: [''],
      nombre: [''],
      idEstudiante: [''],
      cartaPresentacion: [''],
      cartaAceptacion: [''],
      convenioPPP: [''],
      planPPP: [''],
    });
  }

  ngOnInit(): void {
    this.rol = JSON.parse(this.authService.getTokenD()).usuario.rol;
    console.log(this.rol);
    /* Inicializar bootstrap */
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.formModal2 = new window.bootstrap.Modal(
      document.getElementById('myModal2')
    );
    this.GetEstudiantes();
    if (this.rol === "admin") {
      this.GetPpps();
    } else {
      this.GetPpps();
    }
  }

  GetEstudiantes() {
    return this.estudianteService.GetEstudiantes().subscribe((data: {} | any) => {
      for (const item of data) {
        this.personaService.GetPersona(item.idPersona).subscribe((data2: any) => {
          this.removede.push(item, data2);
          this.estudiantes.push(this.removede);
          console.log(this.estudiantes);

          this.removede = [];
        });
      }
    })
  }

  saveForm() {

    this.ppp.nombre = this.pppForm.value.nombre;
    this.ppp.idEstudiante = this.pppForm.value.idEstudiante;
    this.ppp.cartaPresentacion = this.pppForm.value.cartaPresentacion;
    this.ppp.cartaAceptacion = this.pppForm.value.cartaAceptacion;
    this.ppp.convenioPPP = this.pppForm.value.convenioPPP;
    this.ppp.planPPP = this.pppForm.value.planPPP;

    console.log(this.ppp.value);

    this.pppService.CreatePpp(this.ppp).subscribe((res) => {
      console.log('Se agregó el ppp!', res);
      this.ppps = [];
      this.GetPpps();
      this.formModal.hide();
    });
  }

  GetPpps() {
    return this.pppService.GetPpps().subscribe((data: {} | any) => {
      for (const item of data) {
        this.estudianteService.GetEstudiante(item.idEstudiante).subscribe((data2: any) => {
          this.personaService.GetPersona(data2.idPersona).subscribe((data3: any) => {
            this.removed.push(item, data2, data3);
            this.ppps.push(this.removed);
            this.removed = [];
          });
        });
      }
    })
  }

  /* Crear usuario */
  openFormModal() {
    this.pppForm = this.fb.group({
      nombre: [''],
      idEstudiante: [''],
      cartaPresentacion: [''],
      cartaAceptacion: [''],
      convenioPPP: [''],
      planPPP: [''],
    });
    this.formModal.show();
  }

  /* Crear usuario */
  openFormModal2() {
    this.upForm = this.fb.group({
      id: [''],
      nombre: [''],
      idEstudiante: [''],
      cartaPresentacion: [''],
      cartaAceptacion: [''],
      convenioPPP: [''],
      planPPP: [''],
    });
    this.formModal2.show();
  }

  updateEvent(id: number) {
    this.openFormModal2();
    this.pppService.GetPpp(id).subscribe((data: {} | any) => {
/*       console.log(data); */
      this.upForm = this.fb.group({
        id: [data.id],
        nombre: [data.nombre],
        idEstudiante: [data.idEstudiante],
        cartaPresentacion: [data.cartaPresentacion],
        cartaAceptacion: [data.cartaAceptacion],
        convenioPPP: [data.convenioPPP],
        planPPP: [data.planPPP],
      });
    })
  }

  updateForm() {
    console.log(this.upForm.value);
    this.pppService.UpdatePpp(this.upForm.value.id, this.upForm.value).subscribe((data: {} | any) => {
      this.GetPpps();
      this.ppps = [];
      this.formModal2.hide();
    })
  }

  uploadPdf($event : any) {
    const file = $event.target.files[0];
    console.log(file);
    const pdfRef = ref(this.storage, `documentos/${this.upForm.value.idEstudiante}-${this.upForm.value.id}-${file.name}`);
    /* this.upForm.value.cartaPresentacion = pdfRef.fullPath; */
    /* console.log(this.upForm.value.cartaPresentacion); */
    uploadBytes(pdfRef, file)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }
}
