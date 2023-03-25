import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
    inputSearch: document.querySelector('#search-box'),
    countriesList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.countriesList.style.visibility = 'hidden';
refs.countryInfo.style.visibility = 'hidden';

refs.inputSearch.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
    event.preventDefault();

    const countryName = refs.inputSearch.value.trim();

    if (!countryName) {
        refs.countriesList.style.visibility = "hidden";
        refs.countryInfo.style.visibility = "hidden";
        clearPage();
        // refs.countriesList.innerHTML = '';
        // refs.countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(countryName)
        .then(result => {
            clearPage();
            // refs.countriesList.innerHTML = '';
            // refs.countryInfo.innerHTML = '';

            if (result.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please, enter a more specific name.');
                return;
            }

            renderedCountries(result);
        })
        .catch(error => {
            clearPage();
            // refs.countriesList.innerHTML = '';
            // refs.countryInfo.innerHTML = '';
            Notiflix.Notify.failure('Oops, there is no country with that name');
        })
};

function renderedCountries(result) {
    const inputCountryName = result.length;
    
    if (inputCountryName > 2 && inputCountryName <= 10) {
        refs.countryInfo.innerHTML = '';
        refs.countryInfo.style.visibility = "hidden";
        refs.countriesList.style.visibility = "visible";
        countryListMarkup(result);
    } else if (inputCountryName === 1) {
        refs.countriesList.innerHTML = '';
        refs.countriesList.style.visibility = "hidden";
        refs.countryInfo.style.visibility = "visible";
        countryInfoCardMarkup(result);
    };
};
    
function countryListMarkup(result) {
    const listMarkup = result.map((({ name, flags }) => {
        return `<li>
                <img src="${flags.svg}" alt="${name}" width="50" height="auto">
                <span>${name.official}</span>
            </li>`;
    })).join('');
    refs.countriesList.innerHTML = listMarkup;
    return listMarkup;
};
    
function countryInfoCardMarkup(result) {
    const cardMarkup = result.map(({ flags, name, capital, population, languages }) => {
        languages = Object.values(languages).join(", ");
        return `
                <img src="${flags.svg}" alt="${name}" width="250" height="auto">
                <h1> ${name.official}</h1>
                <p>Capital: <span> ${capital}</span></p>
                <p>Population: <span> ${population}</span></p>
                <p>Languages: <span> ${languages}</span></p>`;
    }).join('');
    refs.countryInfo.innerHTML = cardMarkup;
    return cardMarkup;
};

function clearPage() {
    refs.countriesList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
};
