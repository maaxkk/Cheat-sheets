"use strict";

// callback
/*

// let pizza = undefined
//
// // not heavy task ---> we don't need async here
// function orderPizza() {
//     console.log('Order pizza')
//     pizza = `🍕`
//     console.log('Pizza was ordered')
// }
//
// orderPizza()
//
// console.log(`Eat ${pizza}`)

// let pizza = undefined
//
// // simulate heavy task using setTimeout()
// function orderPizza() {
//     console.log('Order pizza')
//     setTimeout(() => {
//         pizza = `🍕`
//         console.log(`${pizza} is ready`)
//     }, 2000)
//     console.log('Pizza was ordered')
// }
//
// orderPizza()
//
// console.log('Call Qoli')
// console.log(`Eat ${pizza}`); // eat undefined


// solution with callback
function orderPizza(callback) {
    setTimeout(() => {
        const pizza = `🍕`
        callback(pizza)
    }, 2000)
}

function pizzaReady(pizza) {
    console.log(`Eat the ${pizza}`)
}

orderPizza(pizzaReady)

console.log(`Call Qoli`)

// We used callback before
window.addEventListener('click', callback)
function callback() {
    console.log('clicked')
}

// but the problem with callbacks ----> callback hell 00-callback-hell.js

// function thing1(){
//     // call pizza shop ---> waiting to hear back
// }
//
// function thing2(){
//     // order the pizza ----> waiting to pizza be delivered
// }
//
// function thing3(){
//     // eat the pizza
// }

function thing1(callback){
    callback()
}
function thing2(callback){
    callback()
}
function thing3(callback){
    callback()
}

thing1(() => {
    thing2(() => {
        thing3(() => alert(1))
    })
})
 */

// promises
/*
 */

// weather
/*
function getWeather() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('No')
        }, 100)
    })
}

function getWeatherIcon(weather) {
    return new Promise(function(resolve, reject) {
        switch (weather) {
            case 'Sunny':
                resolve("🌞")
                break
            case 'Cloudy':
                resolve('☁️')
                break
            case 'Rainy':
                resolve('🌧️')
                break
            default:
                reject('NO ICON FOUND')
        }
    })
}

function onSuccess(data) {
    console.log(`Success ${data}`)
}

function onError(error) {
    console.log(`Error ${error}`)
}

getWeather()
    .then(getWeatherIcon)
    .then(onSuccess)
    .catch(onError)
 */

function fun1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('404')
        }, 100)
    })
}

// function fun2() {
//     console.log('Function 2') // wont be called until fun1 returns reject
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('😎')
//         }, 100)
//     })
// }

// function onSuccess(data) {
//     console.log(`Success: ${data}`)
// }
//
// function onError(errorCode) {
//     console.log(`Error: ${errorCode}`)
// }
//
// function onFinally() {
//     console.log(`FINALLY WE BE DONE YO`)
// }
//
// fun1()
// another way to catch error to pass second variable to .then(onFullField, onRejected)
// since fun1 rejects, fun2 calls onError function with data value: 404
// .then(fun2, onError) // then onSuccess will be called but fun2 could return any value, so we will get
// .then(onSuccess) // success: undefined
// .catch(onError) // as fun1 promise returns reject chain does not advance and we catch reject

// another method is finally
// fun1()
//     .then(fun2)
//     .then(onSuccess)
//     .catch(onError)
//     .finally(onFinally) // still will be called


// fetch
function fetchData() {
    return new Promise(function (resolve, reject) {
        fetch('https://api.weather.gov/gridpoints/OKX/35,35/forecast')
            .then(response => response.json())
            .then(data => resolve(data.properties.periods[1].shortForecast))
    })
}

function displayData(weather) {
    // console.log(weather)
}

function onError(err){
    console.log(`Error ${err}`)
}


fetchData()
    .then(displayData) // Mostly Cloudy then Light Rain Likely
    .catch(onError)

// async

const one = () => Promise.resolve('Test');

async function f() {
    console.log('In function');
    const data = await one()
    console.log(data)
}

console.log('Before function')

f()

console.log('After function')

// before function
// in function
// after function
// test