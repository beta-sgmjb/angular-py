import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChartData, ChartOptions } from 'chart.js';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuarios: any = {};
  usuario: Object | any = {};
  rol: string | any = "";
  constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

  pages: number = 1;
  dataset: any[] = [];

  ngOnInit(): void {
    this.usuario = JSON.parse(this.authService.getTokenD()).usuario;
    this.rol = this.usuario.rol
    console.log(this.rol);
    
    /* traer usuarios */
    this.usuarioService.GetUsuarios().subscribe(data => {
      this.usuarios = data;
      this.dataset = Object.entries(this.usuarios);
    });
  }

  salesData: ChartData<'doughnut'> = {
    labels: [
      'Redes',
      'Software',
      'TI'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: 30
    },
    plugins: {
      title: {
        display: true,
        text: 'Estudiantes por especialidad',
      },
    },
  };

  salesData2: ChartData<'bar'> = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Noviembre',
      'Diciembre'
    ],
    datasets: [{
      label: 'practicas',
      data: [65, 59, 80, 81, 56, 55, 40, 34, 63, 12, 21, 54],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  chartOptions2: ChartOptions = {
    responsive: true,
    layout: {
      padding: 30
    },
    plugins: {
      title: {
        display: true,
        text: 'Estadísticas en barra de las practicas por mes',
      },
    },
  };

  getUsuario() {
    
  }
}
