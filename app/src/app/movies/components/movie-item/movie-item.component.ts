import {Component, input, InputSignal} from "@angular/core";
import {Movie} from '../../types/movie.type';
import {MovieRatingComponent} from '../movie-rating/movie-rating.component';

@Component({
  selector: "app-movie-item",
  templateUrl: "./movie-item.component.html",
  imports: [
    MovieRatingComponent
  ],
  styleUrls: ["./movie-item.component.scss"]
})
export class MovieItemComponent {
  movie: InputSignal<Movie> = input.required<Movie>();

  get title(): string {
    return this.movie().title;
  }

  get cover(): string {
    return this.movie().cover;
  }

  get year(): number {
    return this.movie().year;
  }

  get author(): string {
    return this.movie().author;
  }

  get duration(): number {
    return this.movie().duration;
  }

  get genre(): string {
    return this.movie().genre;
  }

  get synopsis(): string {
    return this.movie().synopsis;
  }

  get rating(): number {
    return this.movie().rating;
  }
}
