"use strict";

import {whereIAmKey} from "./api-keys.js";

/*
// async vs promise

// function getData() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(46)
//         }, 1)
//     })
// }
//
// // const result = getData() // just return promise in PENDING state
// // const result = await getData() // error, await can be used only with async function
// // console.log(result)
//
// async function start() {
//     const data = await fetch('https://api.weather.gov/gridpoints/OKX/35,35/forecast')
//     const result = await data.json()
//     console.log(result.properties.periods[1].shortForecast)
// }
//
// // same but with .then()
// async function start3() {
//     fetch('https://api.weather.gov/gridpoints/OKX/35,35/forecast')
//         .then(data => data.json())
//         .then(result => {
//             console.log(result.properties.periods[1].shortForecast)
//         })
// }
// start()
// start3()

// async function start2() {
//     getData().then(result => {
//         console.log(result)
//     })
// }

// start() // 46, works!

// error handling

function getData() {
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            // resolve('Here is your data')
            reject('Something went wrong')
        }, 1)
    })
}

function onSuccess() {

}

function onFailure() {

}

async function start() {
    try {
        const result = await getData()
        onSuccess()
        // SUCCESS
    } catch (error) {
        // FAILURE
        onFailure()
        console.log(`ERRROR: ${error}`)
    }
}

// async function start2() {
//     const result = await getData()
//         .catch(error => {
//             console.log(`ERRROR: ${error}`)
//         })
//     console.log(result)
// }

start()

*/


// promises

// const request = fetch(`https://restcountries.com/rest/v2/name/portugal`)
// console.log(request)


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
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
    // countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/ukraine`)
//         .then(function(response) {
//            return response.json() // handle fulfilled promise
//         })
//         .then(function(data) {
//             console.log(data[0])
//             renderCountry(data[0])
//         });
// }

// same with arrow functions

// function to handle errors when we catch them
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg)
    // countriesContainer.style.opacity = 1;
}

const getJson = function(url, errorMsg = 'Something went wrong') { // getJson will return promise
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${errorMsg} ${response.status}`);
            }
            return response.json()
        })
}

// How can we handle errors? e.g user lost connection with Internet or wi-fi
// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         // handle error by checking was promise fulfilled or no
//         .then(response => {
//
//             if (!response.ok) // catch does not handle error at API level, like 404 or 401, it returns fulfilled promise
//                 // have to check response from server manually
//                 // and throwing Error means that promise is rejected and catch automatically catches error and propagate down to .catch()
//                 throw new Error(`Country not found ${response.status}`)
//
//             return response.json()//, err => console.log(err))// handle fulfilled promise and returns one more promise with .json()
//         })
//
//
//         // we can handle error passing second argument to .then() ----> then(onSuccess, onError)
//         .then(data => {
//             renderCountry(data[0])
//             const neighbour = data[0].borders[0]
//
//             // Country 2
//             if (!neighbour) return;
//             return fetch(`https://restcountries.com/v3.1/alpha/{neighbour}`) // returns one more promise
//
//             // we could call .then methods of promise inside of outer promise like this
//             // return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`).then(response => response.json())
//             // but this is bad practice, almost the same as callback hell
//
//             // return 23; // return is very important in .then() CHAINING, return value will be transfered into another .then()
//             // we still return promise, but his fulfilled value will be 23
//
//             // much better than callbacks
//         })
//         // we also need check for error here, for second fetch, cause first fetch could be valid and this is not
//
//         .then(response => {
//             if(!response.ok){
//                 // again throw new Error, and catch() can automatically handle it!
//                 throw new Error(`Country not found ${response.status}`)
//             }
//             return response.json()
//         })
//         .then(data => renderCountry(data[0], 'neighbour'))
//
//         .catch(err => {
//             console.error(`${err} 👿👿👿`) // catch checks for any error in WHOLE CHAIN so we dont need to check every fetch promise for validity
//             renderError(`Something went wrong  ${err.message} 👿👿👿. Try again!`) // err in .catch() is real JS object and we can call his message property
//         })
//
//         .finally(() => { // no matter was promise fulfilled or rejected, finally will be called everytime
//             // good example to use finally ----> start of async function and website shows spinner
//             // and finally() can hide this spinner when operation completes
//             // finally works because catch() also returns promise
//
//             // shows container with error or with countries
//             countriesContainer.style.opacity = 1;
//         })
//
// }

// DRY
// const getCountryData = function (country) {
//     getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//         .then(data => {
//             renderCountry(data[0])
//
//             if (!data[0].borders) throw new Error('No neighbour found!')
//
//             const neighbour = data[0].borders[0];
//
//             // country 2
//             return getJson(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found')
//         })
//         .then(data => renderCountry(data[0], 'neighbour'))
//         .catch(err => {
//             console.error(`${err} 👿👿👿`)
//             renderError(`Something went wrong  ${err.message} 👿👿👿. Try again!`)
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         })
// }


// exercise


let country = '';
function whereAmI(lat, lon) {
    return fetch(`https://geocode.xyz/${lat},${lon}?geoit=json&auth=${whereIAmKey}`)
        .then(response => {
            if (response.status === 403) throw new Error('Please dont make more than 3 requests in 1 second')
            return response.json()
        })
        .then(data => {
            country = data.country
        })
        .catch(err => console.log(`Something went wrong ${err}`))
}

// rewrite function from memory
function getCountryData(country){
    return fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            if (!response.ok) throw new Error(`Something went wrong`)
            return response.json()
        })
        .then(data => {
            renderCountry(data[0])

            if (!data[0].borders) throw new Error('Country does not have neighbours')

            const neighbour = data[0].borders[0]

            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then(response => {
            if (!response.ok) throw new Error(`Something went wrong`)
            return response.json()
        })
        .then(data => {
            renderCountry(data[0], 'neighbour')
        })
        .catch(err => {
            countriesContainer.insertAdjacentText('beforeend', `Something went wrong ${err.message}`)
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        })
}

btn.addEventListener('click', function () {
        whereAmI(19.037, 72.873).then(() => getCountryData(country))
})

