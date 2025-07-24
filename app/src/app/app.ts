import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import translationsEN from '../assets/i18n/en.json';
import translationsFR from '../assets/i18n/fr.json';
import {AuthService} from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TranslatePipe, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(
    private translate: TranslateService,
    protected authService: AuthService
  ) {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.setTranslation('en', translationsEN);
    this.translate.setTranslation('fr', translationsFR);

    this.authService.authenticate();
  }

  setLocale(locale: string) {
    this.translate.use(locale);
  }

  isActiveLocale(locale: string) {
    return this.translate.currentLang.toLocaleLowerCase() === locale.toLocaleLowerCase();
  }
}
