"use strict";

const sayHello = (name, lastName) => {
    return `Hello ${name} ${lastName}`;
}

const sayHello2 = name => { // no parenthesses
    return `Hello ${name}`;
}

const sayHello3 = function (){
    console.log(arguments)// logs array of arguments
}

const sayHello4 = () => {
    console.log(arguments) // error, does not have arguments feature
}

// callback function
setTimeout(() => {
    // console.log('Hello')
}, 1000)

// error, arrow functions are always anonymous, we can assign it to variable
// sayHello5() => {
//     console.log('Hello')
// }
function Person(n){
    this.name = n
}
const me = new Person('Sina')

const you = {
    name: 'Sina',
    talk: function(){
        return this;
    },
    arrowTalk: () => {
        return this;
    },
    talk2: this,
}

// console.log(you.talk()); // return object itself
// console.log(you.arrowTalk()); // returns Window object
// console.log(you.talk2); // returns window objects
//
// const me2 = {
//     name: 'Sina',
//     talk(){
//         setTimeout(() => {
//             console.log(this.name)
//         },1000)
//     },
// }
//
// me2.talk() // Sina
// it finds THIS outer of setTimeout function and we get 'Sina'

function Person3(n) {
    this.name = n;
}

Person3.prototype.talk = function (){
    return this
}

Person3.prototype.arrowTalk = () => {
    return this
}

const you2 = new Person3('Sina')
console.log(you2.talk()); // returns object itself
console.log(you2.arrowTalk()); // returns Window

// can't use arrow function in constructor

// const Person4 = () => {
//
// }
// const you3 = new Person4() // error


// don't use in event listener

document.body.addEventListener('click', () => {
    console.log(this)
})

function outer(callback) {
    callback()
}
function inner(){
    console.log(this)
}

outer(inner) // Window

function outer2(callback, obj) {
    callback.call(obj)
}
function inner2(){
    console.log(this)
}

outer2(inner2, {name: 'Sina'}) // Sina

