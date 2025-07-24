import {Component, inject, OnInit, signal} from '@angular/core';
import {Article, ArticleService} from '../services/article.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-article-view',
  imports: [
    NgOptimizedImage,
    RouterLink,
    TranslatePipe
  ],
  template: `
    <div class="uk-container uk-margin-top">
      <a class="uk-button uk-button-default uk-margin-bottom" routerLink="/articles">{{ "btn.return"|translate }}</a>

      @if (article() !== null) {
        <div>
          <div class="uk-card uk-card-default uk-margin-bottom">
            <div class="uk-card-media-top">
              <img ngSrc="{{ article()?.imgPath }}" width="1800" height="1200" alt="{{ article()?.title }} Image"
                   priority>
            </div>
            <div class="uk-card-body">
              <span class="uk-card-badge uk-badge">Auteur: {{ article()?.author }}</span>
              <h3 class="uk-card-title">{{ article()?.title }}</h3>
              <p>{{ article()?.desc }}</p>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ArticleViewComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  articleService = inject(ArticleService);

  id = signal<number>(0);
  article = signal<Article | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.id.set(Number.parseInt(id));
    }
  }

  ngOnInit() {
    this.articleService.getArticle(this.id()).subscribe({
      next: (article: Article) => {
        this.article.set(article);
      },
      error: (err) => {
        this.router.navigate(['articles']);
      }
    });
  }
}

