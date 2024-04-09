"use strict";

// /* //constructor
const Person = function(firstName, birthYear){
    // console.log(this) // empty object
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never create method inside constructor, it will make copies of function for every object we created with this constructor
    // and can slow down our program, better to use prototypes
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear)
    // }
};

const jonas = new Person('Jonas', 1991);
console.log(jonas)

// what happens behind scenes
// 1. New object{} is created
// 2. function is called, 'this' keyword = this empty object{}
// 3. object{} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017)
const jack = new Person('Jack', 1975)
console.log(matilda, jack)

const jay = 'Jay'

console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false

 // */

// prototypes
console.log(Person.prototype) // has calcAge method and constructor method

Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear)
};

// beauty of prototype inheritance
jonas.calcAge(); // 46, works and we even did not create this function inside every instance
matilda.calcAge(); // 20

console.log(jonas.__proto__); // calcAge and constructor
console.log(jonas.__proto__ === Person.prototype); // true, __proto__ is the same as [[Prototype]]

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false
// more honest name is --> .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda); // in [[Prototype]] has species property
console.log(jonas.species); // Homo sapiens

console.log(jonas.hasOwnProperty('species')); // false, not in inside jonas object, only in his prototype Person
console.log(jonas.hasOwnProperty('firstName')); // true
