import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  usuario: any | Object = {};
  rol = "";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(this.authService.getTokenD());
    
  }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['auth/login']);
  }
}
