"use strict";

// IIFE
// function outer(name) {
//     let message = 'Hello';
//     ( function () {
//         console.log(`${message}, ${name}`)
//     })();
// }
//
// outer(); // Hello, undefined
//
// (() => {
//     let firstName = 'Max';
//     outer(firstName) // Hello, Max
// })();


/* // closure 1
// function outer() {
//     let message = 'Hello';
//
//     function iner() {
//         console.log(message);
//     }
//
//     iner();
// }
//
// outer();


// function increment() {
//     let count = 0;
//     count++;
//     console.log(`Count increased to ${count}`)
// }
//
// increment(); // 1
// increment(); // 1
// increment(); // 1
// increment(); // 1


// function createCounter() {
//     let count = 0;
//     function increment() {
//         count++;
//         console.log(`Count increased to ${count}`)
//     }
//
//     function getCount(){
//         return count;
//     }
//
//     return {increment, getCount};
// }
//
// const counter = createCounter();
// counter.increment(); // 1
// counter.increment(); // 2
// counter.increment(); // 3
// counter.increment(); // 4
//
// console.log(counter.count); // undefined
// console.log(`The current count is ${counter.getCount()}`) // 4

// let score = 0;
//
// function increaseScore(points) {
//     score += points;
//     console.log(`+${points}pts`)
// }
// function decreaseScore(points) {
//     score -= points;
//     console.log(`-${points}pts`)
// }
//
// function getScore(){
//     return score;
// }
//
// score = 10000; // now user hacked our game :(
//
// increaseScore(5);
// increaseScore(6);
// decreaseScore(3);
// console.log(getScore())// 8,  5 + 6 - 3 = 8 but user hacked us and he has 10008 points

// function createGame() {
//     let score = 0;
//
//     function increaseScore(points) {
//         score += points;
//         console.log(`+${points}pts`)
//     }
//
//     function decreaseScore(points) {
//         score -= points;
//         console.log(`-${points}pts`)
//     }
//
//     function getScore() {
//         return score;
//     }
//
//     return {increaseScore, decreaseScore, getScore}
// }
//
// let game = createGame()
// game.increaseScore(5);
// game.increaseScore(6);
// game.decreaseScore(3);
// console.log(`The final score is ${game.getScore()}`); // 8 everything is cool


 */

/* // closure 2

 */
// code blocks
// {
//     let message = 'Hello';
//
//     console.log(message); // hello
// }
//
// // console.log(message); // error
//
// {
//     let message = 'Goodbye';
//     console.log(message); // goodbye
// }
//
// // variables cant be accessed inside if or for
// if (true) {
//     let phrase = 'Hello';
//     console.log(phrase);
// }
//
// // console.log(phrase); // error
//
// for (let i = 0; i < 3; i++) {
//     console.log(i);
// }
// // console.log(i); // error

// nested function
// function sayHiBye(firstName, lastName){
//     function getFullName() {
//         return firstName + ' ' + lastName;
//     }
//
//     console.log('Hello, ' + getFullName())
//     console.log('Bye, ' + getFullName())
//
// }

// function makeCounter(){
//     let count = 0;
//     return function() {
//         return count++;
//     };
// }
//
// let counter = makeCounter();
// console.log(counter()) // 1;
// console.log(counter()) // 2;
// console.log(counter()) // 3;
//
// let name = 'max'
// {
//     {
//         {
//             console.log(name);
//         }
//     }
// }

// garbage collector
// function f(){
//     let value = 123;
//
//     return function() {
//         console.log(value);
//     }
// }
//
// // let g = f(); // g.[[Environment]] saves link on lexical environment from calling f()
// let arr = [f(), f(), f()]; // all 3 are referred to lexical environment of f() and f() will exist in lexical environment
// arr = null; // memory erased

// function f() {
//     let value = Math.random();
//
//     function g() {
//         debugger; // if we will write alert(value) in console, it returns value is not defined!
//         // V8 optimizes code and we dont see this variable, it was deleted
//     }
//
//     return g;
// }
//
// let g = f();
// g();


// const func1 = function() {
//     let count = 0;
//     function inner() {
//         ++count;
//     }
//     inner();
//     return count;
// }
//
// const func2 = function() {
//     let count = 0;
//     return function(){
//         return ++count;
//     }
// }
//
// console.log(func1()) // 1
// console.log(func1()) // 1
// console.log(func1()) // 1
//
// const counter = func2()
// console.log(counter()) // 1
// console.log(counter()) // 2
// console.log(counter()) // 3

//ex1
// function sum(x){
//     return function (y){
//         return x+y; // takes x from outer LE(lexical environment)
//     }
// }
// let result = sum(5)(-1); // 4

// ex2
// let x = 1;
// function func() {
//     console.log(x); // v8 knows about local x, but zone before let is dead zone and x not initialized, we get error
//
//     let x = 2;
// }
// func();

// ex3
// let arr = [1, 2, 3, 4, 5, 6, 7];
//
// function inBetween(a, b) {
//     return function (value) {
//         return value >= a && value <= b;
//     }
// }
//
// function inArray(array) {
//     return function (value) {
//         for (let i = 0; i < array.length; i++) {
//             if (array[i] === value) {
//                 return value;
//             }
//         }
//     }
// }
//
// console.log(arr.filter(inBetween(3, 6))) // 3 4 5 6
// console.log(arr.filter(inArray([2, 5, 7, 10]))) // 2, 5, 7
// ex 4

let users = [
    {
        name: 'John', age: 20, surnmae: 'Johnson'
    },
    {
        name: 'Pete', age: 18, surnmae: 'Johnson'
    },
    {
        name: 'Ann', age: 19, surnmae: 'Johnson'
    }
]
//
// function byField(field){
//     return function (obj, obj2){
//         return (obj[field] > obj2[field]) ? 1 : -1;
//     }
// }
//
// console.log(users.sort(byField('name'))); // Ann John Pete
// console.log(users.sort((obj, obj2) => obj['age'] > obj2['age'] ? 1 : -1)) // same as below
// console.log(users.sort(byField('age'))); // Pete Ann John

// ex 5
function makeArmy(){
    let shooters = [];

    let i = 0;
    while(i < 10){
        let j = i; // bad way
        let shooter = function() {
            console.log(j);
        };
        shooters.push(shooter);
        i++;
    }

    return shooters
}


let army = makeArmy();

army[0]();
army[1]();


// const boxFactory = {
//     type: 'box',
//     count: 0,
//     produce: function(){
//         this.count++;
//         return 'Box №' + this.count;
//     }
// }
//
// const produceBox = (produceFn) => {
//     const boxName = produceFn();
//     console.log(boxName);
// }
//
// for(let i = 0; i < 25; i++) {
//     produceBox(boxFactory.produce.bind(boxFactory));
// }