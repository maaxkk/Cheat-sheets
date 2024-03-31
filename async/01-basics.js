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
    .then(onSuccess, onError)