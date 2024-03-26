'use strict'

/* // this

// let user = {
//     name: 'John',
//     age: 30
// };
//
// function sayHi() {
//     console.log('Hi!')
// }
//
// user.sayHi = sayHi;
// user.sayHi();

// let user = {name: 'John'};
// let admin = {name: 'Admin'}
//
// function sayHi() {
//     console.log(this.name)
// }
//
// function sayHello() {
//     console.log(this)
// }
//
// sayHello(); // undefined
//
// user.f = sayHi;
// admin.f = sayHi;
//
// user.f(); // John
// admin.f(); // Admin
//
// admin['f'](); // Admin

// let user = {
//     firstName: 'Ilya',
//     sayHi() {
//         let arrow = () => console.log(this.firstName);
//         arrow();
//     }
// };
//
// user.sayHi(); // Ilya

//ex1
// function makeUser() {
//     return {
//         name: 'John',
//         ref() {
//             return this;
//         }
//     }
// }
//
// let user = makeUser();
// console.log(user.ref())

//ex2
// let calculator = {
//     read(){
//         this.a = +prompt('a: ', 0)
//         this.b = +prompt('b: ', 0)
//     },
//     sum() {
//         return this.a + this.b;
//     },
//     mul() {
//         return this.a * this.b;
//     }
//
// };
//
// calculator.read();
// console.log(calculator.sum());
// console.log(calculator.mul());

// ex3
//
// let ladder = {
//     step: 0,
//     up() {
//         this.step++;
//         return this;
//     },
//     down() {
//         this.step--;
//         return this;
//     },
//     showStep() {
//         console.log(this.step);
//         return this;
//     },
// }
//
// ladder.up().up().down().showStep().down().showStep(); // показывает 1 затем 0
*/

/* // Operator NEW, Function-Constructor

// function User(name){
    // this = {};  (неявно)
    // this.name = name;
    // this.isAdmin = false;

    // return this;  (неявно)
// }

// let user = new User('Jack');
//
// console.log(user.name); // Jack
// console.log(user.isAdmin); // false

// the same as:
// let user = {
//     name: 'Jack',
//     isAdmin: false,
// };

// check if we used NEW in constructor to create instance
// function User(name){
//     // this = {};  (неявно)
//     console.log(new.target)
//
//     // return this;  (неявно)
// }
//
// User(); // undefined
//
// new User(); // function User...

// function User(name){
//     if (!new.target) {
//         return new User(name); // if user forgot to use NEW
//     }
//     this.name = name;
// }
//
// let john = User('John') // Work because we check with new.target
// console.log(john.name); // John will work

// function BigUser() {
//     this.name = 'John';
//     return { name: 'Godzilla'};
// }
//
// console.log(new BigUser().name); // Godzilla
//
// function SmallUser() {
//     this.name = 'John';
//     return;
// }
//
// console.log(new SmallUser().name)// John


// function User(name){
//     this.name = name;
//     this.isAdmin = false;
//     this.sayHi = function () {
//         console.log('I am ', this.name)
//     }
//
// }
// let john = new User('John')
// john.sayHi(); // I am John

// ex2
// function Calculator(){
//     this.read = function (){
//         this.a = +prompt('a:', 0)
//         this.b = +prompt('b:', 0)
//     }
//     this.sum = function () {
//         return this.a + this.b;
//     }
//     this.mul = function () {
//         return this.a * this.b;
//     }
// }
//
// let calculator = new Calculator();
// calculator.read()
//
// console.log('sum=' + calculator.sum())
// console.log('mul=' + calculator.mul())

// ex3
// function Accumulator(startingValue){
//     this.value = startingValue;
//     this.read = function () {
//         this.value += +prompt('Enter how many to add:', 0)
//     }
// }
//
// let accumulator = new Accumulator(1);
// accumulator.read()
// accumulator.read()
//
// console.log(accumulator.value)

// ex1
// Конструктор может возвращать объект используя return, мы создали один объект в памяти и раскидали ссылки на
// 2 конструктора, оба возвращают ссылку на обьект в памяти оба равны друг другу
// let obj = {}
// function A() { return obj}
// function B() { return obj }
// let a = new A();
// let b = new B();
// console.log(a == b);
*/

/* // The "non-existent property" problem

// let user = {};
//
// // console.log(user.address.street); // error
// // console.log(user.address ? user.address.street : undefined); // not best way to solve this
// // console.log(user.address ? user.address.street ? user.address.street.name : null : null) // very bad
// // console.log(user.address && user.address.street && user.address.street.name); // check if everything exist, a bit better
//
// // ?.
//
// console.log(user?.address); // undefined
//
// let testUser = null;
//
// console.log(testUser?.address?.street); // undefined
// console.log(dontExistUser?.name); // error

// also with functions
let userAdmin = {
    admin() {
        console.log('I am admin')
    }
};

let key = 'firstName';
let user1 = {
    firstName: 'John'
};

let user2 = null;

let userGuest = {};

userAdmin.admin?.(); // I am admin
userGuest.admin?.(); // Nothing will happen
console.log(user1?.[key]); // John can be used ?.[]
console.log(user2?.[key])
delete user?.name; // удаляет user.name если пользователь существует
*/