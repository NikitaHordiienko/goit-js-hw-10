import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import createdCountryList from './templates/countryList.hbs';
import createdCountryInfo from './templates/countryInfo.hbs';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

function clearInput() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}

inputEl.addEventListener('input', debounce(event => {
    const valueWithTrim = inputEl.value.trim();

    clearInput()
    if (valueWithTrim !== '') {
        fetchCountries(valueWithTrim).then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            } else if (data.length === 0) {
                Notiflix.Notify.failure('Oops, there is no country with that name')
            } else if (data.length >= 2 && data.length <= 10) {
                console.log(data)
                countryListEl.innerHTML = createdCountryList(data)
            } else if (data.length === 1) {                
                countryInfoEl.innerHTML = createdCountryInfo(data)
            }
        })
    }
}, DEBOUNCE_DELAY))

