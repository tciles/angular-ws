import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {type Article, ArticleService} from '../services/article.service';
import {ArticleItemComponent} from './article-item.component';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-article-list',
  imports: [
    ArticleItemComponent,
    TranslatePipe,
  ],
  template: `
    <div class="uk-container uk-margin-small-top uk-margin-large-bottom">
      @if (isWithError()) {
        <div class="uk-alert-danger" uk-alert>
          <p>{{ "error.occur"|translate }}</p>
        </div>
      }

      <h1>{{ "app.articles"|translate }}</h1>

      <div
        class="uk-child-width-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small uk-grid-match uk-grid movies">
        @for (article of articles(); track $index) {
          <app-article-item [article]="article" (click)="readArticle(article)"/>
        }
      </div>
    </div>
  `
})
export class ArticleListComponent implements OnInit {
  articleService = inject(ArticleService);
  router = inject(Router);

  articles: WritableSignal<Article[]> = signal<Article[]>([]);
  isWithError = signal<boolean>(false)

  ngOnInit(): void {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles.set(articles);
      },
      error: (error) => {
        this.articles.set([]);
        this.isWithError.set(true);
      }
    })
  }

  readArticle(article: Article) {
    this.router.navigate(['articles', article.id]);
  }
}

