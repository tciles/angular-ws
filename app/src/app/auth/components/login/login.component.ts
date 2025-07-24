import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, LoginPayload} from '../../services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

type LoginForm = FormGroup<{
  email: FormControl<string|null>,
  password: FormControl<string|null>,
}>

@Component({
  imports: [ReactiveFormsModule],
  template: `
  <div class="uk-container uk-margin-top uk-margin-bottom">
    <h2>Connexion</h2>
    <form (submit)="onSubmit($event)" [formGroup]="loginForm">
      <div class="uk-form-controls">
        <label class="uk-form-label" for="email">Email</label>
        <input class="uk-input" type="email" id="email" formControlName="email">
      </div>
      <div class="uk-form-controls uk-margin-top">
        <label class="uk-form-label" for="password">Mot de pass</label>
        <input class="uk-input" type="password" id="password" formControlName="password">
      </div>
      <div class="uk-form-controls uk-margin-top">
        <button class="uk-button uk-button-primary">Connexion</button>
      </div>
    </form>
  </div>
  `
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);

  loginForm: LoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.authService.u$.subscribe(auth => {
      if (auth) {
        this.router.navigate(['movies']);
      } else {
        console.log("Unable to login");
      }
    });
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    this.authService.login(this.loginForm.value as LoginPayload);
  }
}
