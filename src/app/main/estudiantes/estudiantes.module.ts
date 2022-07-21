import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    EstudianteService
  ]
})

export class EstudiantesModule { }
