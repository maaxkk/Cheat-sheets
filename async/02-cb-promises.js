"use strict";

// callbacks

// Javascript is single threaded programming language ---> It has single call stack ---> Can do 1 thing at a time
/*
// Callback are functions that get passed into other functions
// e.g
// myDiv.addEventListener('click', function() {
     // do something!
// })

// function addEventListener takes callback function (do something) and then calls it when myDiv was clicked

window.onload = function () {
    const fruits = ['banana', 'apple', 'pear'];

    function callback(val) {
        console.log(val);
    }
    fruits.forEach(callback);

    // it's the same as
    fruits.forEach(function(val){
        console.log(val);
    })

    console.log("Done")
}

function foo(callback) {
    // Есть что-то очень долгое, например супер сложное вычисление.
    // Вопрос, как нам выполнить код после того как это вычисление закончится и использовать результат этого действия?
    let b = 10000000000;
    let result = 0
    for (let i = 0; i <= b; i++) {
        result = 'result'
    }
    // И здесь появляется наш Callback! Он подождет пока вычисления в цикле закончатся и выведет наш результат в консоль.
    callback(result)
}

foo(function (res){
    console.log(res)
})

 */

// Promises
/*
// let p = new Promise((resolve, reject) => {
//     let a = 1 + 1;
//     if (a === 2){
//        resolve('Success')
//     } else {
//         reject('Failed')
//     }
// })
//
// p.then((message) => {
//     console.log('This is in the then ' + message)
// }).catch((message) => {
//     console.log('This is in the catch ' + message)
// })

const recordVideoOne = new Promise((resolve, reject) => {
    resolve('Video 1 Recorded')
})

const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded')
})

Promise.all([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((messages) => {
    console.log(messages) // we got array of Promises resolves
})

Promise.race([ // .race() returns first finished promise
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((message) => {
    console.log(message) // we got resolve of first finished Promise
})

// can be only 1 result

// let promise = new Promise(function(resolve, reject){
//     resolve('done');
//
//     // recommended to use Error with reject
//     reject(new Error('error...')); // will be ignored
//     setTimeout(() => resolve('...')); // will be ignored
// })


// syntax Promise + then


// promise.then(
//     function (result) { }, // обработает успешное выполнение,
//     function(error) { } // handle error
// )

 */

// let promise = new Promise(function(resolve, reject){
//     // setTimeout(() => resolve('done'), 1000);
//     setTimeout(() => reject(new Error('Whoops!')), 1000);
// });

// promise.then(
//     result => alert(result), // will alert done in 1 second
//     error => alert(error), // won't be launched
// )

// promise.then(
//     result => alert(result), // won't be launched
//     error => alert(error), // in 1 second ---> Error: Whoops!
// )

// if we want only successful result we can pass only 1 function to THEN
// promise.then(alert); // reject will be ignored

// The same is for error, we can use CATCH method
// Catch is the same as then(null, function)
// promise.catch(alert); // we got Error: Whoops!

// function getData(){
//     setTimeout(() => console.log('Hi'),1000);
// }
//
// getData() // It will be printed second, we will get There Hi
// console.log('There')// First it will be printed

// .then seems like await in Python, we can use .then here to wait for finish of promise or coroutine


// Finally

// finally does not have parameters
// new Promise((resolve, reject) => {
//     // setTimeout(() => resolve('value'), 1000);
//     throw new Error('error');
// })
//     // if finally returns error it goes to the first catch error mechanism
//     .finally(() => console.log('Promise finished')) // logs firstly
//     // .then(result => console.log(result)) // shows 'value'
//     // or we can use with finally + catch
//     .catch(err => console.log(err)) // throws error


// Practice of promises

// function with callbacks
// function loadScript(src, callback){
//     let script = document.createElement('script');
//     script.src = src;
//
//     script.onload = () => callback(null, script);
//     script.onerror = () => callback(new Error(`Error loading script ${src}`))
// }


// function with promises
// function coolLoadScript(src) { // No need in callback anymore, it returns PROMISE now
//     return new Promise(function(resolve, reject){
//         let script = document.createElement('script');
//         script.src = src;
//
//         script.onload = () => resolve(script);
//         script.onerror = () => reject(new Error(`Error handling script ${src}`))
//
//         document.head.appendChild(script);
//     })
// }
//
// let promise = coolLoadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

// promise.then(
//     script => console.log(`${script.src} loaded!`),
//     err => console.log(`${err.message} loaded!`),
// );
//
// promise.then(script => console.log('One more handler...'));


// ex1

// function delay(ms){
//     return new Promise(function(resolve, reject){
//         setTimeout(() => resolve(`Done in ${ms/1000} seconds`), ms)
//     })
// }
//
// delay(3000).then((message) => console.log(message))

// function delay(ms){
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// delay(3000).then(() => console.log(`Done in 3 seconds`))


const ogs = [
    { name: 'OG1', say: 'I am OG1'},
    { name: 'OG2', say: `I am OG2`}
];

function ogsSay() {
    setTimeout(() => {
        let output = '';
        ogs.forEach(og => {
            output += `<li>${og.say}</li>`
        });
        document.body.innerHTML = output;
    }, 1000)
}

// function addOg(man){
//     setTimeout(() => {
//         ogs.push(man);
//     }, 2000)
// }

ogsSay()
// addOg({name: 'OG3', say: 'I am OG3'}) // OG3 wont be rendered because rendering ended 1 second ago
// we can solve it using call back

// function addOg(man, cb){
//     setTimeout(() => {
//         ogs.push(man);
//         cb();
//     }, 2000)
// }

// addOg({name: 'OG3', say: 'I am OG3'}, ogsSay) // but promises a much better way to handle it

// promise
function addOg(man, cb){
    return new Promise(function (resolve)
    {
        setTimeout(() => {
            ogs.push(man);
            resolve();
        }, 2000)
    })
}

addOg({name: 'OG3', say: 'I am OG3'}).then(ogsSay) // more cleaner way
