"use strict";

// import {whereIAmKey} from "./api-keys";



/*
// event loop
console.log('Test start') // push and pop from stack
setTimeout(() => console.log('0 sec timer'), 0) // macrotask

Promise.resolve('Resolved promise 1').then(res => {
    console.log(res) // microtask(priority) > macrotask(priority), microtask will be launched first
})

Promise.resolve('Resolved promise 2').then(res => {
    for (let i = 0; i < 1000000000; i++) {} // simulate heavy task
    // even if macrotask finished faster than microtask, it will wait for microtask
    console.log(res)
})

console.log('Test end') // push and pop from stack

 */

/*
// Promises

const lotteryPromise = new Promise(function (resolve, reject) {

    console.log('Lottery draw is happening 🔮')
    setTimeout(function () {
        if (Math.random() >= 0.5) {
            resolve('You WIN $$') // resolve automatically mark promise as fulfilled
        } else {
            reject(new Error('You lost your money'))
        }
    }, 2000)
})

lotteryPromise
    .then(res => console.log(res))
    .catch(err => console.log(err))

// Promisifying setTimeout
const wait = function (seconds) {
    return new Promise(function (resolve) { // can use only resolve if we know that function will finish successfully
        setTimeout(resolve, seconds * 1000)
    })
}

wait(2).then(() => {
    console.log(`1 second passed`)
    return wait(1)
    })
    .then(() => {
        console.log(`2 seconds passed`)
        return wait(1)
    })
    .then(() => {
        console.log(`3 seconds passed`)
        return wait(1)
    })
    .then(() => console.log('4 seconds passed'))

// beauty of promises vs callbacks

// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 second passed');
//             setTimeout(() => {
//                 console.log('4 second passed');
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

 */


/* //Promises
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

// getPosition().then(pos => console.log(pos))

function whereAmI() {
    getPosition().then(pos => {
        const { latitude: lat, longitude: lng} = pos.coords;

        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=key`)

    })
        .then(response => {
            if (response.status === 403) throw new Error('Please dont make more than 3 requests in 1 second')
            return response.json()
        })
        .then(data => {
            const country = data.country
            console.log(`You are in ${country}!`)
        })
        // .catch(err => console.log(`Something went wrong ${err}`))
        .catch(err => {
            // countriesContainer.insertAdjacentText('beforeend', `Something went wrong ${err.message}`)
        })
}


whereAmI()

 */


// Coding challenge 2

function wait(seconds){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds * 1000) // resolve here is like empty callback, but resolve also indicates
        // that promise will be fulfilled and there are no errors, it just marks promise like OK and let's us to call it with .then()
    })
}

// my solution

// function createImage(imgPath){
//     return new Promise(function(resolve, reject){
//         resolve(imgPath)
//     })
// }
//
// createImage('https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-1.jpg?raw=true')
// .then((imgSrc => {
//     const img = document.createElement('img')
//     img.src = imgSrc
//     document.body.append(img)
//     return img
// }))
// .then((img) => {
//     wait(2).then(() => {
//          img.style.display = 'none'
//         return img
//     }).then ((img) => {
//         img.src = 'https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-2.jpg?raw=true'
//         img.style.display = 'block'
//     })
// })

// rewritten solution
const imageContainer = document.querySelector('.images')

function createImage(imgPath){
    return new Promise(function (resolve, reject){
        const img = document.createElement('img')
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

let globalImage;
createImage('https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-1.jpg?raw=true')
    .then(img => {
        globalImage = img
        console.log('Image 1 loaded')
        return wait(2) // setTimeout was set to call resolve() callback after 2 seconds, and then promise 'wait()'
        // returns promise for which now we can use .then() after setTimeout complete
    })
    .then(() => {
        globalImage.style.display = 'none'
        return createImage('https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-2.jpg?raw=true')
    })
    .then(img => {
        globalImage = img;
        console.log('Image 2 loaded')
        return wait(2)
    })
    .then (() => globalImage.style.display = 'none')



// Jonas's solution

// const imgContainer = document.querySelector('.images')
// const createImage = function(imgPath) {
//     return new Promise(function(resolve, reject){
//         const img = document.createElement('img')
//         img.src = imgPath
//
//         img.addEventListener('load', function () {
//             imgContainer.append(img)
//             resolve(img)
//         })
//         img.addEventListener('error', function () {
//             reject (new Error('Image not found'))
//         })
//     })
// }
//
// let currentImg;
// createImage('https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-1.jpg?raw=true')
// .then(img => {
//     currentImg = img
//     console.log('Image 1 loaded')
//     return wait(2)
// })
//     .then(() =>  {
//         currentImg.style.display = 'none'
//         return createImage('https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/16-Asynchronous/final/img/img-2.jpg?raw=true')
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('Image 2 loaded')
//         return wait(2)
//     })
//     .then(() => {
//         currentImg.style.display = 'none'
//     })
//     .catch(err => console.error(err))