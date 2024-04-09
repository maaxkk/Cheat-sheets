"use strict";

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

export const renderCountry = function (data, className = '') {
    const language = Object.keys(data.languages)[0]
    const currency = Object.keys(data.currencies)[0]
    const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags['png']}" />
    <div class="country__data">
      <h3 class="country__name">${data.name['common']}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
    ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[language]}</p>
      <p class="country__row"><span>💰</span>${data.currencies[currency].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

export const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg)
    countriesContainer.style.opacity = 1;
}

export const getJson = function(url, errorMsg = 'Something went wrong') { // getJson will return promise
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${errorMsg} ${response.status}`);
            }
            return response.json()
        })
}


export default {renderCountry, renderError, getJson}