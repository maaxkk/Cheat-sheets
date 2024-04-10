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
// console.log(jonas)

// what happens behind scenes
// 1. New object{} is created
// 2. function is called, 'this' keyword = this empty object{}
// 3. object{} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017)
const jack = new Person('Jack', 1975)
// console.log(matilda, jack)

const jay = 'Jay'

// console.log(jonas instanceof Person); // true
// console.log(jay instanceof Person); // false

Person.hey = function () {
    console.log('Hey there')
    console.log(this); // constructor function
};

Person.hey(); // static method
// jonas.hey(); // Jonas and his prototype does not have this method


// prototypes
// console.log(Person.prototype) // has calcAge method and constructor method

Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear)
};

// beauty of prototype inheritance
// jonas.calcAge(); // 46, works and we even did not create this function inside every instance
// matilda.calcAge(); // 20

// console.log(jonas.__proto__); // calcAge and constructor
// console.log(jonas.__proto__ === Person.prototype); // true, __proto__ is the same as [[Prototype]]

// console.log(Person.prototype.isPrototypeOf(jonas)); // true
// console.log(Person.prototype.isPrototypeOf(matilda)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false
// more honest name is --> .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
// console.log(jonas, matilda); // in [[Prototype]] has species property
// console.log(jonas.species); // Homo sapiens

// console.log(jonas.hasOwnProperty('species')); // false, not in inside jonas object, only in his prototype Person
// console.log(jonas.hasOwnProperty('firstName')); // true

// Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__); // property of THE MAIN object
// console.log(jonas.__proto__.__proto__.__proto__); // nulll

// console.dir(Person.prototype.constructor)

const arr = [3,6,4,3,6,9,9] // same as new Array === []
// console.log(arr.__proto__)
// console.log(arr.__proto__ === Array.prototype) // true

// console.log(arr.__proto__.__proto__); // again MAIN object

// better to avoid this
Array.prototype.unique = function() {
    return [...new Set(this)] // this = current array
}

// console.log(arr.unique())

// all elements in DOM are also objects
const body = document.querySelector('body')


 // */

/*
// coding challenge # 1
function Car(brand, speed){
    this.brand = brand;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    return `Current speed is ${this.speed}`
}

Car.prototype.brake = function () {
    this.speed -= 5;
    return `Current speed ${this.speed}`;
}

const bmw = new Car('BMW', 120)
const mercedes = new Car('Mercedes', 95)

console.log(bmw.speed) // 120
console.log(mercedes.speed) // 95

console.log(bmw.accelerate()) // 130
console.log(bmw.brake()) // 125

console.log(mercedes.accelerate()) // 105
console.log(mercedes.accelerate()) // 115


 */

// /*
// classes

// class expression
// const PersonCl = class {
//
// }

// class declaration
class PersonCl {
   constructor(fullName, birthYear) {
       // this = {}
       this.fullName = fullName;
       this.birthYear = birthYear;

   }

   calcAge() { // will create function in .prototype and more comfortable way
       console.log(2037 - this.birthYear);
   }

   // instance method
   greet() {
       console.log(`Hey ${this.firstName}`)
   }

    get age() {
        return 2037 - this.birthYear
    }

    set fullName(name) {
       console.log(name)
       if (name.includes(' ')) {
            this._fullName = name;
       }
       else alert(`${name} is not a full name!`)
    }

    get fullName() {
       return this._fullName
    }

    // static method
    static hey() {
        console.log('Hey there')
        console.log(this)
    }
}

const jessica = new PersonCl('Jessica Davis', 1996);

// console.log(jessica)
// jessica.calcAge();
// console.log(jessica.age)

// console.log(jessica.__proto__ === PersonCl.prototype); // true

// PersonCl.prototype.greet = function() {
//     console.log(`Hey ${this.firstName}`);
// }

// jessica.greet();

const walter = new PersonCl('Walter White', 1985)

PersonCl.hey()

// 1. Classes are NOT hoisted ---> we can use them only after initialization
// 2. Classes are first-class citizens
// 3. Classes executed in strict mode

// */

// getters setters


const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },


};

// console.log(account.latest); // 300

account.latest = 50;
// console.log(account.movements);


// static methods ---> attached to constructor, not to instance


// Object.create()
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto); // manually set Prototype for object 'steven' without using 'new' keyword
console.log(steven)
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge()

// Coding challenge # 2

class CarCl {
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }
    get speedUs() {
        return Math.floor((this.speed / 1.6) * 10) / 10;
    }
    set speedUs(value) {
        this.speed = Math.floor(value * 1.6)
        return this.speed
    }
}

const ford = new CarCl('Ford', 120)
console.log(ford.speedUs); // 75
ford.speedUs = 100; // 100 mi/h
console.log(ford.speed); // 160 km/h
