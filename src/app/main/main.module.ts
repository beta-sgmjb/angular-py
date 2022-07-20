import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainRoutingModule } from './main-routing.module';
import { AuthService } from '../services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { LoginComponent } from '../auth/login/login.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({ 
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    HttpClientModule,
    EstudiantesModule,
    NgChartsModule
  ],
  providers: [AuthService]
})
export class MainModule { }
