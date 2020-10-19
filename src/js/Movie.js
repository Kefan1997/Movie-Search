// import getMovieRating from './MovieRating';

export default class Movie {
  constructor(
    {

      Title, Poster, Year, imdbRating,
    },
  ) {
    this.Title = Title;
    this.Poster = Poster;
    this.Year = Year;
    this.imdbRating = imdbRating;
  }

  generateMovie() {
    let template = '';
    const div = document.createElement('div');
    div.className = 'swiper-slide';

    template += '<div class="film">';
    template += `<div class="film__title"><h3>${this.Title}</h3></div>`;
    template += `<img class="movie__poster" src="${this.Poster}">`;
    template += `<div class="movie__year"><h3>${this.Year}</h3></div>`;
    template += `<div class="film__rating"><span class="ico ico__star"></span>${this.imdbRating}</div>`;
    template += '<div class="space"></div>';
    template += '</div>';

    div.innerHTML = template;
    this.div = div;

    return div;
  }
}
