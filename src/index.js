import './sass/main.scss';
import { fetchCountries } from './service/fetchCountries.js'
import countryTpl from './tpl/country.hbs'
import countriesTpl from './tpl/countries.hbs'

import { error,  defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

import debounce from 'lodash.debounce';

const inputRef = document.querySelector('[name="country"]');
const resultRef = document.querySelector("#result");
const errorRef = document.querySelector("#error");

inputRef.addEventListener('input',debounce(onInputCountry, 500) );

function onInputCountry(e) {
    e.preventDefault();
    const country = e.target.value;

    resultRef.innerHTML = "";
    errorRef.innerHTML = "";
    if (!country) {
        return false;
    }

    fetchCountries(country).then(data => {
        if (data.length > 1 && data.length <= 10) {
            resultRef.innerHTML = countriesTpl(data);
        }
        if (data.length === 1) {
            resultRef.innerHTML = countryTpl(data);
        }
        if (data.length > 10) {
            error({
                text: 'Too many matches found. Please enter a specific query!'
            })
            resultRef.innerHTML = "";
        }
        
    }).catch(error=>handleError(error));
}

function handleError(error) {
  errorRef.textContent = error;
  resultRef.innerHTML = "";
}




