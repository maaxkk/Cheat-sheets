"use strict";

/*
// ES5
var isMomHappy = true;

// Promise
var willGetNewPhone = new Promise(
    function(resolve, reject){
        if (isMomHappy){
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // Всё выполнено
        } else {
            var reason = new Error('mom is not happy')
            reject(reason); // reject
        }
    }
)

// Calling promise
// var askMom = function() {
//     willGetNewPhone // rn promise is pending
//         .then(function(fulfilled){
//             // yay, you got a new phone
//             console.log(fulfilled);
//             // output: {brand: 'samsumg', color: 'black'}
//         })
//         .catch(function(error){
//             // oops, mom dont buy it
//             console.log(error.message);
//             // output: 'mom is not happy'
//         })
// };
//
// askMom();

// Promise chain

// 2nd Promise
// var showOff = function(phone){
//     return new Promise(
//         function(resolve, reject){
//             var message = 'Hey friend, I have a new' + phone.color + '' + phone.brand + 'phone';
//             resolve(message)
//         }
//     )
// }

// if we use only resolve we can make this function shorter

var showOff = function (phone){
    var message = 'Hey friend, I have a new ' + phone.color + ' ' + phone.brand + ' phone';
    return Promise.resolve(message)
}

// chain promises
var askMom = function() {
    console.log('Before asking Mom'); // will be first
    willGetNewPhone
        .then(showOff) // link together
        .then(function(fulfilled){
            // will be third, it's microtask
            console.log(fulfilled) // output: Hey friend, I have a new black Samsung phone
        })
        .catch(function(err){
            // oops, mom don't buy it
            console.log(err.message)
            // output: mom is not happy
        })
    console.log('after asking mom ') // will be second
}

askMom()
*/

/*
// ES6 ---> var changed to const and function(resolve,reject) to (resolve,reject) =>
const isMomHappy = true;

// Промис
const willIGetNewPhone = new Promise(
    (resolve, reject) => { // fat arrow
        if (isMomHappy) {
            const phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            const reason = new Error('mom is not happy');
            reject(reason);
        }

    }
);

const showOff = function (phone) {
    const message = 'Hey friend, I have a new ' +
        phone.color + ' ' + phone.brand + ' phone';
    return Promise.resolve(message);
};

// Вызываем промис
const askMom = function () {
    willIGetNewPhone
        .then(showOff)
        .then(fulfilled => console.log(fulfilled)) // fat arrow
        .catch(error => console.log(error.message)); // fat arrow
};

askMom();

 */

// ES7 ---> was added async await
const isMomHappy = true;

// Промис
const willIGetNewPhone = new Promise(
    (resolve, reject) => { // fat arrow
        if (isMomHappy) {
            const phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            const reason = new Error('mom is not happy');
            reject(reason);
        }

    }
);

async function showOff(phone) {
    return new Promise(
        (resolve, reject) => {
            const message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';
            resolve(message);
        })}

// Вызываем промис

async function askMom(){
    try {
        console.log('Before asking Mom')

        let phone = await willIGetNewPhone; // we use await everytime we need to call promise
        let message = await showOff(phone)

        console.log(message)

        console.log('After asking mom')
    } catch (err) {
        console.error(err.message)
    }
}
(async () => {
    askMom()
})()
