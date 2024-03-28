"use strict";
/*
function createEnemy(name, health, attackPower){
    let id=1;
    return {
        name: name,
        health: health,
        attackPower: attackPower,
        attack: function(){
            console.log(this.name + ' attacks with ' + this.attackPower + ' attack power!');
            id++;
        }
    }
}

// Creating enemy objects using the factory function
const enemy1 = createEnemy('Goblin', 100, 20);
const enemy2 = createEnemy('Orc', 150, 30);
// result:
// object {
//     name: Orc,
//     attackPower: 30,
//     health: 150,
//     attack func()
//}


enemy1.attack(); // Goblin attacks with 20 attack power!
enemy2.attack(); // Orc attack wtih 30 attack power!

function createUser(userName, avatar) {
    return {
        userName,
        avatar,
        setUserName (userName){
            this.userName = userName;
            return this;
        }
    }
}

console.log(createUser('echo', 'echo.png'));
// {
//      setUserName: f(),
//     "userName": "echo",
//     "avatar": "echo.png"
// }

// Computed Property Keys
const arrToObj = ([key,value]) => ({
    [key]: value
});

// console.log(arrToObj(['foo', 'bar'])); // key:value foo:bar --> amazing
const computeKey = arrToObj(['foo', 'bar'])
console.log(computeKey['foo']); // bar



 */

// rewrite class to factory
/*
class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    getArea(){
        return Math.PI * this.radius * this.radius;
    }
}

const circle = new Circle(5)
console.log(circle.radius)// 5
console.log(circle.getArea()) // 78.53

function factoryCircle(radius){
    return {
        radius,
        getArea() {
            return Math.PI * radius * radius;
        }
    }
}

const factCircle = factoryCircle(5);
console.log(factCircle.radius); // 5
console.log(factCircle.getArea()); // 78.53

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}

const alice = new Person('Alice', 'Cooper')
console.log(alice.firstName); // Alice
console.log(alice.lastName); // Cooper
console.log(alice.getFullName())

function factoryPerson(firstName, lastName){
    return {
        firstName,
        lastName,
        getFullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }
}

const mark = factoryPerson('Mark', 'Two')
console.log(mark.firstName); // Mark
console.log(mark.lastName); // Two
console.log(mark.getFullName())


class Counter {
    constructor() {
        let count = 0;
        this.increment = function () {
            count++;
        };
        this.getCount = function (){
            return count;
        };
    }
}

const counter = new Counter()
console.log(counter.getCount()) // 0
counter.increment()
counter.increment()
console.log(counter.getCount()) // 2

function factCounter(){
    let counter = 0;
    return {
        increment(){
            counter++;
        },
        getCount(){
            return counter;
        }
    }
}

const factoryCounter = factCounter();
console.log(factoryCounter.getCount()) // 0
factoryCounter.increment()
factoryCounter.increment()
console.log(factoryCounter.getCount()) // 2

 */

class BankAccount {
    constructor(initialBalance) {
        let balance = initialBalance;

        this.deposit = function(amount){
            if (amount > 0){
                balance += amount;
            }
        };

        this.withdraw = function(amount){
            if (amount <= balance){
                balance -= amount;
            }
        };

        this.getBalance = function(){
            return balance;
        };
    }
}
const account = new BankAccount(100);
account.deposit(200);
account.deposit(200)
account.withdraw(100);
console.log(account.getBalance()); // 400
console.log(account); // has only 3 functions, 0 information about balance variable

function factBankAccount(initialBalance){
    return {
        deposit(amount){
            initialBalance += amount;
        },
        withdraw(amount){
            initialBalance -= amount;
        },
        getBalance(){
            return initialBalance;
        }
    }
}

const factoryAccount = factBankAccount(100);
factoryAccount.deposit(200);
factoryAccount.deposit(200);
factoryAccount.withdraw(100);
console.log(factoryAccount.getBalance()); // 400
