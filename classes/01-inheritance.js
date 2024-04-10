"use strict";

/*
// inheritance
const Person = function (firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course) {

    // If we will call Person constructor like this, it will just call it as regular function, and it does not create
    // "this = {} ... return this" like constuctor does
    // Person(firstName, birthYear)

    Person.call(this, firstName, birthYear);
    this.course = course;
}

Student.prototype = Object.create(Person.prototype)

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`)
}

const mike = new Student('Mike', 2020, 'Computer Science');

mike.introduce()
mike.calcAge()

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student)
console.log(mike instanceof Person)
console.log(mike instanceof Object)

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);


// Coding challenge # 3

function Car(brand, speed){
    this.brand = brand;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
}

Car.prototype.brake = function () {
    this.speed -= 5;
}

function ElectricCar(brand, speed, charge){
    Car.call(this, brand, speed)
    this.charge = charge;
}

ElectricCar.prototype = Object.create(Car.prototype)
ElectricCar.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(`Speed is ${this.speed} and charge is ${this.charge}`)
}

ElectricCar.prototype.chargeTo = function (value) {
    this.charge = value;
}


const tesla = new ElectricCar('Tesla', 120, 23)

console.log(tesla.speed, tesla.charge)
tesla.accelerate()
console.log(tesla.speed, tesla.charge)
tesla.chargeTo(50)
console.log(tesla.speed, tesla.charge)

 */


/*
// inheritance between classes
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

class Student extends PersonCl {
    constructor(fullName, birthYear, course) {
        // always needs to happen first
        super(fullName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this._fullName} and I study ${this.course}`)
    }

    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old`)
    }
}

const mike = new Student('Mike Jones', 2007, 'Computer Science')

mike.introduce()
mike.calcAge()

 */

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

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function () {
    console.log(`Hi I am ${2037-this.birthYear} years old`)
}

const jay = Object.create(StudentProto)
jay.init('Jay', 2010, 'Computer Science')
jay.introduce()
jay.calcAge()

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
class Account {
    // 1) Public fields(instances)
    locale = navigator.language;
    // _movements = []

    // 2) Private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        // this._movements = []
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}`)
    }
    // public methods

    // Public interface
    getMovements(){
        return this.#movements;
    }
    deposit(val) {
        this.#movements.push(val);
        return this; // chaining
    }

    withdraw(val) {
        this.deposit(-val);
        return this; // chaining
    }

    // approveLoan(val) {
    //     return true;
    // }

    requestLoan(val){
        if(this.#approveLoan(val)){
            this.deposit(val);
            console.log(`Loan approved`)
            return this; // chaining
        }
    }

    static helper() {
        console.log(`Helper`);
    }

    // private methods
    #approveLoan(val){
        return true
    }

}

const acc1 = new Account('Jonas', 'EUR', 1111)

// acc1.movements.push(250);
// acc1.movements.push(-150);

acc1.deposit(250);
acc1.withdraw(150);
acc1.requestLoan(1000);
// acc1.#approveLoan(1000); // error, also private method

console.log(acc1.getMovements())
console.log(acc1)

// static method
Account.helper()

// console.log(acc1.#movements); // error, we can't access private field
// console.log(acc1.pin); // should not be accessible
// console.log(acc1.#pin); // also error;

// Chaining
acc1.deposit(300).deposit(500).withdraw(250).requestLoan(25000).withdraw(4000)

// Coding challenge # 4
class CarCl{
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        return this;
    }
    brake() {
        this.speed -= 5;
        return this;
    }
    get speedUs(){
        this.speed = this.speed / 1.6;
        return this;
    }
    set speedUs(val){
        this.speed = val * 1.6;
        return this;
    }
}

class EVCl extends CarCl{
    #charge;
    constructor(brand, speed, charge) {
        super(brand, speed);
        this.#charge = charge;
    }
    chargeBattery(val){
        this.#charge = val;
        return this
    }
    accelerate() {
         this.speed += 20;
         this.#charge--;
         return this;
    }
}

const rivian = new EVCl('Rivian', 120, 23)
console.log(rivian)
rivian.chargeBattery(70).accelerate().accelerate().brake()
console.log(rivian)

// without using classes;
function CarConstructor(brand, speed){
    this.brand = brand;
    this.speed = speed;
    Object.defineProperty(this, 'speedUs', {
        get: function() {
            return this.speed / 1.6
        },
        set: function(speed) {
           return this.speed = speed * 1.6
        }
    })
}
CarConstructor.prototype.accelerate = function () {
    this.speed += 10;
    return this;
}

CarConstructor.prototype.brake = function () {
    this.speed -= 5;
    return this;
}

function ElectricCar(brand, speed, charge){
    let _charge = charge;
    CarConstructor.call(this, brand, speed)
    this.changeCharge = function (value) {
        _charge = _charge + value;
    }
    this.getCharge = function () {
        return _charge;
    }
}

ElectricCar.prototype = Object.create(CarConstructor.prototype)

ElectricCar.prototype.accelerate = function () {
    this.speed += 20;
    this.changeCharge(-1);
    return this;
}

ElectricCar.prototype.chargeTo = function (value) {
    const currCharge = this.getCharge()
    this.changeCharge(-currCharge)
    this.changeCharge(value)
    return this;
}


const rivian2 = new ElectricCar('Rivian', 120, 23)
console.log(rivian2)
rivian2.chargeTo(70).accelerate().accelerate().brake()
console.log(rivian2)
console.log(rivian2.getCharge())
