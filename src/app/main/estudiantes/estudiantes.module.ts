import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from 'src/app/services/auth.service';
import { AuthInterceptor } from 'src/app/services/auth-interceptor.service';

@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    EstudianteService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})

export class EstudiantesModule { }
