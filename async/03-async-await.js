"use strict";

// async vs promise

/*
// function getPersonsInfo(name) {
//     return server.getPeople().then(people => {
//         return people.find(person => {
//             return person.name === name
//         });
//     });
// }
//
// async function getPersonsInfo(name) {
//     const people = await server.getPeople();
//     const person = people.find(person => {
//         return person.name === name
//     })
//     return person;
// }

const server = {
    people: [
        {
            name: 'Odin',
            age: 20,
        },
        {
            name: 'Thor',
            age: 35,
        },
        {
            name: 'Freyja',
            age: 29,
        },
    ],

    getPeople() {
        return new Promise((resolve, reject) => {
            // simulating a delayed network call to the server
            setTimeout(() => {
                resolve(this.people);
            }, 2000)
        });
    },
}

// server.getPeople().then(people => console.log(people))

// If we can use normal function that means we can use async function also

// const yourAsyncFunction = async () => {
//     // do something asynchronously and return a promise
//     return result
// }
//
// anArray.forEach(async item => {
//     // do something asynchronously for each item in 'anArray'
//     // one could also use .map here to return an array of promises to use with 'Promise.all()'
// })

server.getPeople().then(async people => {
    people.forEach(person => {
        // do something asynchronoously for each people
        person.name = 'Cool ' + person.name
    })
})

// await something like ----> pause until this process done
// instead of then we use await now

// Error handling

// By default we still can use .catch()

// asyncFunctionCall().catch(err => {
//     console.error(err);
// })

// But we can use TRY CATCH, which even better

async function getPersonsInfo(name) {
    try {
        const people = await server.getPeople();
        const person = people.find(person => {
            return person.name === name
        })
        return person;
    } catch (error) {
        // Handle error any way you would like
    }
}

// rewriting promises function with async

const img = document.querySelector('img')

fetch('https://api.giphy.com/v1/gifs/translate?api_key=YOUR_API_KEY&s=cats', {mode: 'cors'})
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        img.src = response.data.images.original.url;
    });


// async function getCats() {
//     fetch('https://api.giphy.com/v1/gifs/translate?api_key=YOUR_API_KEY&s=cats', {mode: 'cors'})
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function(response) {
//              img.src = response.data.images.original.url;
//          })
// }

// async function getCats() {
//     const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=YOUR_API_KEY&s=cats', {mode: 'cors'})
//     response.json().then(function (response) {
//         img.src = response.data.images.original.url;
//     })
// }

// because .json() returns a promise we can also use await to assing the response to a variable

async function getCats() {
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=YOUR_API_KEY&s=cats', {mode: 'cors'})
    const catData = await response.json()
    img.src = catData.data.images.original.url;
}

getCats(); // that's all
 */


// async function f() {
//     // return 1;
//     return Promise.resolve(1)
// }
//
// f().then(console.log); // 1

// await ---> works only inside async functions

// async function f() {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('ready!'), 1000)
//     });
//
//     let result = await promise; // will wait unil promise completes
//
//     // result is not printing because of await, it's waiting until calculating result value
//     console.log(result); // 'ready!'
// }
//
// f();

// async function showAvatar() {
//
//     // запрашиваем JSON с данными пользователя
//     let response = await fetch('/article/promise-chaining/user.json');
//     let user = await response.json();
//
//     // запрашиваем информацию об этом пользователе из github
//     let githubResponse = await fetch(`https://api.github.com/users/${user.name}`)
//     let githubUser = await githubResponse.json()
//
//     // отображаем аватар пользователя
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = 'promise-avatar-example';
//     document.body.append(img);
//
//     // wait for 3 seconds and remove avatar
//     await new Promise((resolve, reject) => setTimeout(resolve, 3000))
//
//     img.resolve()
//
//     return githubUser;
// }

// showAvatar()

// Error handling

async function f() {
    await Promise.reject(new Error('Oops'))
}
// same as:
async function func() {
    throw new Error('Oops')
}

async function fTry() {
    try {
        let response = await fetch('https://no-such-url')
        let user = await response.json();
    } catch (err) {
        // перехватит любую ошибку в блоке try: и в fetch, и в response.json
        console.log(err); // failed to fetch
    }
}

fTry();

async function fCatch() {
    let response = await fetch('https://no-such-url')
}
// fCatch() will return promise in rejected state
fCatch().catch(console.log) // without catch it will be uncaught promise error

// if you need to wait several promises you can wrap them to Promise.all and then await

// let results = await.Promise.all([
//     fetch(url1),
//     fetch(url2),
// ]);

