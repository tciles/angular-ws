import {Component, inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService, LoginPayload} from '../../services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

type LoginForm = FormGroup<{
  email: FormControl<string | null>,
  password: FormControl<string | null>,
}>

@Component({
  imports: [ReactiveFormsModule, TranslatePipe],
  template: `
    <div class="uk-container uk-margin-top uk-margin-bottom">
      @if (authService.loginError()) {
        <div class="uk-alert-danger" uk-alert>
          <p>{{ "error.occur"|translate }}</p>
        </div>
      }

      <h2>{{ "title.login"|translate }}</h2>
      <form (submit)="onSubmit($event)" [formGroup]="loginForm">
        <div class="uk-form-controls">
          <label class="uk-form-label" for="email">{{ "email.login"|translate }}</label>
          <input class="uk-input" type="email" id="email" formControlName="email">
        </div>
        <div class="uk-form-controls uk-margin-top">
          <label class="uk-form-label" for="password">{{ "password.login"|translate }}</label>
          <input class="uk-input" type="password" id="password" formControlName="password">
        </div>
        <div class="uk-form-controls uk-margin-top">
          <button class="uk-button uk-button-primary">{{ "btn.login"|translate }}</button>
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

  constructor() {
    this.authService.authenticate();
  }

  ngOnInit(): void {
    if (this.authService.token()) {
      this.router.navigate(['movies']);
    }
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    this.authService.login(this.loginForm.value as LoginPayload).subscribe({
      next: () => {
        this.router.navigate(['movies']);
      },
      error: error => {
        console.error(error);
      }
    })
  }
}
