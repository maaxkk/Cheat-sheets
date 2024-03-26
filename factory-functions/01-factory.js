"use strict";
// OOP
// factory vs constructor vs class

// factory
/*
function createElement(type, text, color){
    const el = document.createElement(type)
    el.innerText = text
    el.style.color = color
    document.body.append(el)
    return {
        el,
        setText(text){
            el.innerText = text
        },
        setColor(color){
            el.style.color = color
        },
    }
}
// const h1 = createElement('h1', 'hey guys', 'blue')


// constructor
function Person(name) {
    // const this = {}
    this.name = name;
    this.talk = () => {
        return `Hello I am ${this.name}`
    }
    // return this
}

function SuperElement(type, text, color){
    this.el = document.createElement(type)
    this.el.innerText = text
    this.el.style.color = `${color}`;
    document.body.append(this.el)
    this.el.addEventListener('click', () => {
        console.log(this.el)
    })
}
// const h1 = new SuperElement('h1', 'hey guys', 'blue')
const array = ['a', 'b', 'c']
const myElements = array.map(item => {
    return new SuperElement('p', item, 'green') // creates 3 super elements
})

// class
class Human {
    talk() {
        return `talking`;
    }
    // it creates Human.prototype.talk function
}

class SuperHuman extends Human { // now this class has talk and fly functions, but Human has only talk function
    fly() {
        return `Flyiiinggg`;
    }
}

function Humanoid() {
    this.age = 12; // instance will have 12 and Humanoid.age = undefined
    this.talk = function () {
        return `Talking`;
    }
    // it creates function inside instance
}

const person = {
    talk() {
        return `Talking`;
    }
}

const me = Object.create(person) // inheritance person's function
// or
Object.setPrototypeOf(me, person)

 */

// Prototype vs __proto__
/*
class Human {
    talk(){
        return `Talking`;
    }
}
class SuperHuman extends Human {
    fly() {
        return `Flying`;
    }
}
const ben = new SuperHuman(); // has funcs fly and talk()
// prototype is only for constructor
// __proto__ everything is instance of Object

function Dude(name) {
    this.name = name;
}

const me = new Dude('Sina') // me.prototype ---> undefined
// Dude.prototype exists
// me.__proto__ === Dude.prototype ----> true
// __proto__ property of every variable and pointing to object that he inherites from
// prototype property of constructor that instance will inherit
 */

// factory vs constructor vs class
/*
// factory

// It creates object but with Object parent, we can't make inheritance like in contructor
// function createPerson(name) {
//     return {
//         name: name,
//         talk() {
//             return `I am ${name}`;
//         }
//     }
// }

const myCoolProto = {
    talk() {
        return `hello, i am ${this.name}`
    }
}

// Now we inherit property ---> func talk() from myCoolProto

function createPerson(name) {
    return Object.create(myCoolProto, {
        name: {
            value: name
        }
    })
}

// constructor

function Person(name){
    this.name = name
}

const ben = new Person('Ben');
Person.prototype.talk = function () {
    return `Hello, I am ${this.name}` // Now Ben has also this function
}
// By default we don't have this in Factory
const sam = new Person('Sam'); // Also has function talk()

 */


