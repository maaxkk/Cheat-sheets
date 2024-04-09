"use strict";

import {renderCountry, renderError, getJson} from "./renderCountry.js";


/*
// example 1
async function helloAsync() {
    return 'hello';
}

function helloAsyncProm() {
    return new Promise(function (resolve) {
        resolve('hello')
    })
}

// async version
async function multiply(a, b) {
    return a * b
}

async function foo() {
    let result = await multiply(2, 5)
    return result;
}

// Errors will be here
(async function () {
    let result = await foo()
    console.log(result) // 10
})()

// Promise version
function multiplyProm(a, b) {
    return new Promise(function (resolve) {
        resolve(a * b)
    })
}

function fooProm() {
    return new Promise(function (resolve) {
        multiplyProm(2, 5).then(function (result) {
            resolve(result)
        })
    })
}

// Errors will be here(If they exist)
new Promise(function () {
    fooProm().then(function (result) {
        console.log(result) // logs 10
    })
})


// Important example
// async function foo2(){
//     someArray.forEach(function(value){
//         doSomethingAsync(value); // if value is promise, foreach won't wait for fulfilling this promises or rejecting
//         // it will launch all promises asynchronously and wont wait for them to complete
//     })
// }
//
//
// // we could try to use async and await inside forEach
// async function foo3(){
//     someArray.forEach(async function(value){
//         await doSomethingAsync(value); // but forEach won't await for them, and will run almost simultaneously
//          // we can run for every value in array async function or callback, but we can't stop it, we can't tell it when to stop
//     })
// }
//
// // to solve this we can use 'for of'
// for(item of someArray){
//     await foo() // just use 'for of'
// }

 */

/*// async / await

// recreating whereAmI from 04-async-vs-promise.js


const getPosition = function() {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)

        // we can rewrite with just

        // getCurrentPosition run one of two functions, depends if we could get coordinates of user or not
        // if yes - we call resolve(we can do this because we inside promise) or reject, very simple
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

const whereAmI = async function(country){
    try {
        const pos = await getPosition()
        const {latitude: lat, longitude: lng} = pos.coords;

        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=key`)
        // handle error in json response from API
        if (!resGeo.ok) throw new Error('Problem with getting location data')

        const dataGeo = await resGeo.json()

        // exactly the same as async / await
        // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res))

        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`); // await stop execution of function at this line
        if (!res.ok) throw new Error('Problem with getting country')
        // but it does not block call stack, because function is asynchronous
        const data = await res.json()
        renderCountry(data[0])
        // console.log(data) // information about country

        return `You are in ${dataGeo.city}, ${dataGeo.country}`

    } catch(err){
        console.error(err)
        renderError(`Something went wrong ${err.message}`)

        // reject promise returned from async function
        throw err;
    }

    // console.log(res)

};

// console.log('1: Will get location')

// whereAmI()
//     .then(city => console.log(`2 ${city}`))
//     .catch(err => console.error(`2: ${err.message}`))
//     .finally(()=> {
//         console.log(`3: finished getting location`)
//     })


(async function() {
    try {
        console.log('1: Will get location')
        const city = await whereAmI();
        console.log(`2: ${city}`);
        console.log(`3: finished getting location`)
    } catch (err) {
        console.log(`2: ${err.message}`)
    }
})();


console.log('FIRST') // will be displayed first, function whereAmI is asynchronous

// cant use .catch() but we can use try {} catch with async / await

// example of try catch
// try {
//     let y = 1;
//     const x = 2;
//     x = 3; // const variable
// } catch (err){
//     alert(err)
// }

*/


/*
const get3Countries = async function(c1, c2, c3){
    try {
        // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`)
        // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`)
        // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`)

        const data = await Promise.all([getJson(`https://restcountries.com/v3.1/name/${c1}`),
            getJson(`https://restcountries.com/v3.1/name/${c2}`),
            getJson(`https://restcountries.com/v3.1/name/${c3}`),
        ]) // Promise.all runs promises in parallel

        console.log(data.map(d=> d[0].capital))

        // console.log([data1.capital, data2.capital, data3.capital])
    } catch (err){
        console.error(err)
    }
}

get3Countries('portugal', 'canada', 'tanzania');


// Promise.race ---> first settled promise wins race (settled can be as fulfilled and aslo rejected)
(async function(){
    const res = await Promise.race([getJson(`https://restcountries.com/v3.1/name/italy`),
        getJson(`https://restcountries.com/v3.1/name/egypt`),
        getJson(`https://restcountries.com/v3.1/name/mexico`),
    ]) // if 1 promise is rejected, it returns error for every promise
    // console.log(res[0].capital) // fastest of the 3

})()

const timeout = function(sec) {
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error('Request took too long'))
        }, sec * 1000)
    })
}

Promise.race([
    getJson(`https://restcountries.com/v3.1/name/italy`),
    timeout(0.5)
]).then(res => console.log(res[0].capital)).catch(err => console.error(err))

// Promise.allSettled ---> takes an array of promises and returns all promises, does not depend is it fulfilled or rejected

Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Not success'),
    Promise.resolve('Another success'),
]).then(res => console.log(res))

Promise.all([
    Promise.resolve('Success'),
    Promise.reject('Not success'),
    Promise.resolve('Another success'),
]).then(res => console.log(res))
    .catch(err => console.error(err)) // will return error

// Promise.any ---> returns first fulfilled promise and ignore rejected promise
Promise.any([
    Promise.reject('Not Success'),
    Promise.reject('again Not success'),
    Promise.resolve('Another success'), // returns it
]).then(res => console.log(res))
    .catch(err => console.error(err)) // will return error

*/

// coding challenge

function wait(seconds){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds * 1000) // resolve here is like empty callback, but resolve also indicates
        // that promise will be fulfilled and there are no errors, it just marks promise like OK and let's us to call it with .then()
    })
}

const imageContainer = document.querySelector('.images')
//
function createImage(imgPath){
    return new Promise(function (resolve, reject){
        const img = document.createElement('img')
        img.classList.add('parallel')
        img.src = imgPath
        img.addEventListener('load', () => {
            imageContainer.append(img)
            resolve(img)
        })
        img.addEventListener('error', () => {
            reject(`Can not load image`)
        })
    })
}

//
// // part 1 - rewrite function from coding challenge 2 with async / await
// (async function() {
// const loadNPause = async function() {
//     try {
//         const creatingImage = await createImage('https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-1.jpg?raw=true')
//         console.log('Image 1 loaded')
//         await wait(2)
//         creatingImage.style.display = 'none'
//         const nextImage = await createImage('https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-2.jpg?raw=true')
//         console.log('Image 2 loaded')
//         await wait(2)
//         nextImage.style.display = 'none'
//     } catch (err) {
//         console.error(err)
//     }
// }
// loadNPause()
// })()

// part 2
async function loadAll(imgArr){
    // const output = []
    try {
        // const imgs = imgArr.map(async function (imgSource) {
        //     const currImg = await createImage(imgSource)
        //     // output.push(currImg)
        // })
        // return(output)
        Promise.all([
            createImage(imgArr[0]),
            createImage(imgArr[1]),
            createImage(imgArr[2]),
        ])
    } catch (err) {
        console.log(err)
    }
}

const arrOfImg = ['https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-1.jpg?raw=true',
    'https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-2.jpg?raw=true',
'https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-3.jpg?raw=true']

loadAll(arrOfImg)
    //.then(arr => console.log(arr))