import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  template: ``
})
export class LogoutComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.u$.subscribe((auth) => {
      this.router.navigate(['login']);
    });

    this.authService.logout();
  }
}
