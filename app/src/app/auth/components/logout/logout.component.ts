import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  template: ``
})
export class LogoutComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
