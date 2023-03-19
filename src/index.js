import { name, capital, population, flags, languages } from './js/fetchCountries';
import throttle from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', _.debounce((fetchCountries), DEBOUNCE_DELAY));






createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success("Too many matches found. Please enter a more specific name.");
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });