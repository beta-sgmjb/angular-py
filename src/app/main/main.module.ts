import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainRoutingModule } from './main-routing.module';
import { AuthService } from '../services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { PppsModule } from './ppps/ppps.module';
import { SupervisoresModule } from './supervisores/supervisores.module';
import { TipoEmpresasModule } from './tipo-empresas/tipo-empresas.module';
import { EmpresasModule } from './empresas/empresas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
@NgModule({ 
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    HttpClientModule,
    EstudiantesModule,
    NgChartsModule,
    NgxPaginationModule,
    EstudiantesModule,
    PppsModule,
    SupervisoresModule,
    TipoEmpresasModule,
    EmpresasModule,
    UsuariosModule
  ],
  providers: [AuthService]
})
export class MainModule { }
