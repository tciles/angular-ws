import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService} from '../services/auth.service';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.token()) {
    router.navigate(['login']);

    return false;
  }

  return true;
}
