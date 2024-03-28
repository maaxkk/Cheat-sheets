"use strict";

// const a = 1
// const b = 1
// const c = [1]
// const d = [1]
// console.log(a === b) // true
// console.log(c === d) // false

const a = {skill: 'Cooking'}
const b = {skill: 'Cooking'}

console.log(a === b); // false

function incrementAge(age){
    age = age + 1
}

const myAge = 10;

incrementAge(myAge); // pass value not variable, that's why variable did not change

console.log(myAge); // 10

function incrementAge2(user){
    user.age = user.age + 1
}

const me = {age: 10}

incrementAge2(me); // not primitive was passed, object was passed as reference and change his value in memory

console.log(me); // age is 11

let a2 = 1 // 1
let b2 = a2 // 1

a2 = 7; // 7, b2 = 1

let a3 = {name: 'Sina'}
let b3 = a3

console.log(b3); // Sina
a3.name = 'Qoli' // Qoli
console.log(b3.name); // Qoli

a3 = {name: 'CRAIG'}; // New object in memory
console.log(b3); // still has referrence to previous object
