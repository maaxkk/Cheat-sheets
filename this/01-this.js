"use strict";


// THIS keyword
/*
function talk(lang) {
    return this
}

function alsoTalk(lang, isPolite) {
    if (isPolite) {
        if (lang === 'en') {
            return `I am ${this.name}`
        } else if (lang === 'it') {
            return `Ciao bella, sono ${this.name}`
        }
    }
    if (!isPolite) {
        if (lang === 'en') {
            return `${this.name}, what you want?`
        } else if (lang === 'it') {
            return `Sono ${this.name}, 👎`
        }
    }
}

const me = {
    name: 'Sina',
    talk: talk, // link to talk() function
    talkSecond: alsoTalk,
}
console.log(me.talk()) // returns ME object
const meTalk = alsoTalk.bind(me, 'it', true); // bind Name of ME to meTalk, now NAME is accesible in meTalk
// we can pass additional variables in Bind and Call functions
// returns I am Sina in italian
const meTalkSecond = alsoTalk.call(me, 'it', false); // same result as above, but we don't call it, no second ()
// apply is the same but in array, also does not need second ()
const meTalkThird = alsoTalk.apply(me, ['it', false]); // same result as above, but we don't call it, no second ()

// constructor THIS

// function Person(n) {
//     this.name = n
//     console.log(this)
// }
//
// const you = new Person('Sina') // logs in console --> object YOU

function Person(n) {
    this.name = n
    this.talk = function() {
        console.log(this)
    }
    // callback function
    // setTimeout(function() {
    //     console.log(this) // returns Window object!
    // }, 100);
    // Когда открываются {} внутри setTimeout мы внутри колбэк функции поэтому возврат Window Object
    // Когда закрываются скобки мы снова в конструкторе поэтому можно добавить
    // bind(this) и оно само понимает к кому биндить
    setTimeout(function() {
        console.log(this) // returns Window object!
    }.bind(this), 100); // can fix it using bind(this)
    // or use arrow function
    // arrow functions has specific properties with THIS
    setTimeout(() => {
        console.log(this)
    }, 100)
}

const you = new Person('Sina');
you.talk() // again, logs in console YOU object

 */


// THIS Keyword
/*

// Arrow functions

// with 2+ lines we need {}
// with 1 line  we don't need {} and return, it returns automatically
// arrow functions dont have argument
// they don't create their THIS

// const sayHi = () => {
//     console.log(arguments)
// }

// sayHi() // error

// const sayBye = () => 5
// const value = sayBye()
// console.log(value)

const brokenlinks = ['youtube', 'facebook', 'instagram']

const fixLinksArray = (linksArray) => {
    const correctLinks = [];
    // linksArray.forEach(function(brokenLink){
    //     const fixedLink = `https://${brokenLink}.com`
    //     correctLinks.push(fixedLink)
    // })

    // Can be rewrite with arrow function

    linksArray.forEach((brokenLink) => correctLinks.push(`https://${brokenLink}.com`))
    return correctLinks;
}

// console.log(fixLinksArray(brokenlinks))


// THIS

function wrapper() {
    function myFunction() {
        console.log(this)
    }
    myFunction()
}
// returns undefined with strict mode
// wrapper() // returns window object without strict mode

const item = {
    title: 'Phone',
    fullprice: 100,
    calculatePrice(discountPercent = 0){
        // console.log(this); // returns object itself
        console.log(`${this.fullprice - discountPercent/100 * this.fullprice}`); // 100
    }
}

// item.calculatePrice(20) // 80

function calcDiscount(age){
    if (age > 65){
        console.log(this.price / 2);
    } else {
        console.log(this.price);
    }
}
const product = {title: 'Phone', price: 1000}
// calcDiscount.call(product, 70); // price 500
// const newPrice = calcDiscount.bind(product, 72)(); // price 500

 */

// THIS in constructor

// function myFunction() {
//     console.log(this);
// }
// new myFunction() // ----> empty object myFunction

function CreateItem(title, price){
    this.title = title
    this.price = price
    // console.log(this);
    return this // function with new automatically ---> return this
    // without NEW we will get error, and window object without strict mode
}

const item1 = new CreateItem('phone', 100)
const item2 = new CreateItem('phone', 300)
const item3 = new CreateItem('phone', 1000)
console.log(item1, item2, item3)


// THIS in arrow functions

// arrow functions dont have their THIS and they take it from outer function
// if does not have outer function then it takes from global environment THIS
// and returns WINDOW

const obj = {
    getThis1: function(){
        console.log(this);
    },
    getThis2: () => {
        console.log(this)
    },
    wrapper: function() {
        (() => console.log(this))()
    }
}

obj.getThis1(); // normal function ---> returns THIS object
obj.getThis2(); // arrow function ----> returns Window object
obj.wrapper(); // arrow function is inside normal function, THIS goes to outer function - normal function
// and THIS gets context of just function and returns just THIS object

const person = {
    lastName: 'Ivanov',
    firstNames: ['Petr', 'Ivan'],
    logFullNames1: function(){
        this.firstNames.forEach(function(name) {
            console.log(`${this.lastName} ${name}`);
            // }.bind(this)) // forEach uses callback and this becomes global and returns undefined
            // it does not know about lastName inside our person
        }, this) // also fixs undefined
    },
    // arrow version
    logFullNames2: function(){
        this.firstNames.forEach((name) => {
            console.log(`${this.lastName} ${name}`)
        })
    },
};

// person.logFullNames1(); // error, lastName is in person THIS
person.logFullNames1()
person.logFullNames2(); // works, arrow funcs dont have THIS and they go to nearest function with THIS and returns
// this.lastName

// With SetTimeout
const item = {
    title: 'Phone',
    logTitle: function() {
        setTimeout(function() {
            console.log(`Product: ${this.title}`); // Здесь колбэк функция которая вызывается отдельно
            // соответственно у неё другой будет THIS context поэтому и про this.title она никак не может знать
            console.log(this) // как и сказали будет Window object - глобальный THIS
        })
        // rewrite with arrow function
        setTimeout(() => {
            console.log(`Product: ${this.title}`); // arrow function takes this from outer functino --> what we need
        })
        // secret ninja weapon to use normal function with callback function that returns our THIS context
        setTimeout((function (){
            console.log(`Product: ${this.title}`)
        }).bind(this)); // magic :)
        // before .bind(this) we already left callback function and now we can bind our THIS to callback THIS

    }
}

item.logTitle(); // Product undefined

// var a = 12;
// function foo(){
//     this.a = 21;
// }
//
// console.log(this.a); // 12

// var a = 12;
// function foo(){
//     this.a = 21;
// }
// const obj = {}
// foo.call(obj)
// console.log(obj.a); // 21
// console.log(this.a); // 12
