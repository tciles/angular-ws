import {Component, input} from '@angular/core';
import {Article} from '../services/article.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-article-item',
  imports: [
    NgOptimizedImage
  ],
  template: `
    <div>
      <div class="uk-card uk-card-default uk-margin-bottom">
        <div class="uk-card-media-top">
          <img ngSrc="{{ article().imgPath }}" width="1800" height="1200" alt="{{ article().title }} Image" priority>
        </div>
        <div class="uk-card-body">
          <span class="uk-card-badge uk-badge">Auteur: {{ article().author }}</span>
          <h3 class="uk-card-title">{{ article().title }}</h3>
          <p>{{ article().desc }}</p>
        </div>
      </div>
    </div>
  `
})
export class ArticleItemComponent {
  article = input.required<Article>({});
}
