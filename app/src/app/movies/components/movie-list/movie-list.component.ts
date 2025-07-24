import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Movie} from '../../types/movie.type';
import {MovieService} from '../../services/movie.service';
import {MovieItemComponent} from '../movie-item/movie-item.component';
import {TranslatePipe} from '@ngx-translate/core';

declare const UIkit: any;

enum NetworkStatus {
  NONE,
  PENDING,
  FINISHED,
  ERROR
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  imports: [
    MovieItemComponent,
    TranslatePipe
  ]
})
export class MoviesListComponent implements OnInit {
  movies: WritableSignal<Movie[]> = signal<Movie[]>([]);
  status: WritableSignal<NetworkStatus> = signal<NetworkStatus>(NetworkStatus.NONE);
  apiService: MovieService = inject(MovieService);

  constructor() {
    console.log('MoviesListComponent');
  }

  ngOnInit() {
    this.status.set(NetworkStatus.PENDING);
    const modal = UIkit.modal("#loader");
    modal?.show();

    this.apiService.getMovies().subscribe({
      next: (movies) => {
        modal?.hide();
        this.status.set(NetworkStatus.FINISHED);
        this.movies.set(movies);
      },
      error: (error) => {
        modal?.hide();
        this.status.set(NetworkStatus.ERROR);
        console.error(error);
      }
    });
  }

  protected readonly NetworkStatus = NetworkStatus;
}


