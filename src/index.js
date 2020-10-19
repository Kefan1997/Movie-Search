import Swiper from 'swiper';
import Movie from './js/Movie';
import {
  API_KEY, INPUT_SEARCH, FIRST_PAGE,
} from './js/Constants';

const mySwiper = new Swiper('.swiper-container', {
  loop: true,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  keyboard: true,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    780: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

// eslint-disable-next-line no-unused-vars
let countOfMovies;

INPUT_SEARCH.focus();
INPUT_SEARCH.setSelectionRange(INPUT_SEARCH.value.length, INPUT_SEARCH.value.length);

function getJsonWithFilms(searchText) {
  return fetch(`https://www.omdbapi.com/?s=${searchText}&page=${FIRST_PAGE}&apikey=${API_KEY}`)
    .then((response) => response.json());
}

function renderMovies(search) {
  const imdbIDs = search.Search.map((movie) => movie.imdbID);
  const urlsForRating = imdbIDs.map((imdbID) => `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
  const movies = urlsForRating.map((element) => fetch(element)
    .then((response) => response.json())
    .then((search) => {
      const movie = new Movie(search).generateMovie();
      mySwiper.appendSlide(movie);
    }));
  return movies;
}

function getMovies(searchText) {
  getJsonWithFilms(searchText)
    .then((search) => {
      countOfMovies = renderMovies(search).length;
      mySwiper.activeIndex = 0;
      mySwiper.removeAllSlides();
      mySwiper.update();
    });
}

function searchForm() {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', (e) => {
    const currentMovie = document.getElementById('search-text').value;
    getMovies(currentMovie);
    e.preventDefault();
    mySwiper.update();
  });
}

getMovies(INPUT_SEARCH.value);
searchForm();
