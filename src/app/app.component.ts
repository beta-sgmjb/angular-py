import { Component } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navAuth = false;
  constructor(private authService: AuthService) { 

  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.navAuth = true
    }
  }

}
