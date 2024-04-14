"use strict";

/*
// Different ways to do the same

// function human() {
//     const name = 'Sina'
//     function sayHi(){
//         console.log(`Hi I am ${name}`)
//     }
//     function sayHowYouFeel(){
//         console.log(`${name} is feeling good!`)
//     }
//     sayHi()
//     sayHowYouFeel()
// }
// human()

// function human(n) {
//     const name = n
//     function sayHi(){
//         console.log(`Hi I am ${name}`)
//     }
//     function sayHowYouFeel(){
//         console.log(`${name} is feeling good!`)
//     }
//     sayHi()
//     sayHowYouFeel()
// }
// human('Sina')

function human(n) {
    const name = n
    function sayHi(){
        console.log(`Hi I am ${name}`)
    }
    function sayHowYouFeel(){
        console.log(`${name} is feeling good!`)
    }
    return {
        sayHi,
        sayHowYouFeel,
    }
}
const sina = human('Sina')
const qoli = human('Qoli')
sina.sayHi()
qoli.sayHowYouFeel()


// document.getElementById('size-12').onclick = function (){
//     document.body.style.fontSize = `12px`
// }
//
// document.getElementById('size-14').onclick = function (){
//     document.body.style.fontSize = `14px`
// }
//
// document.getElementById('size-16').onclick = function (){
//     document.body.style.fontSize = `16px`
// }

function clickHandler(size){
    return function () {
        document.body.style.fontSize = `${size}px`
    }
}

document.getElementById('size-12').onclick = clickHandler(12);
document.getElementById('size-14').onclick = clickHandler(14);
document.getElementById('size-16').onclick = clickHandler(16);

console.log(clickHandler(12)); // we give function body to onclick function and when use click onclick
// should call this function, and with magic of closures it knows value of SIZE variable, even when already
// onclick function calls it

*/


// getters setters with closure

/*
// Thermos
// class Thermostat {
//     constructor(fahrenheit) {
//         this.fahrenheit = fahrenheit;
//     }
//     get temperature() {
//         return 5/9 * (this.fahrenheit - 32)
//     }
//     set temperature(tempInC){
//         this.fahrenheit = tempInC * 9/5 + 32
//     }
// }
//
// const thermos = new Thermostat(76);
// console.log(thermos.temperature); // 24.4
// thermos.temperature = 26;
// console.log(thermos.temperature); // 26
// console.log(thermos.fahrenheit); // give access to temperature

// class Thermostat {
//     #fahrenheit;
//     constructor(fahrenheit) {
//         this.#fahrenheit = fahrenheit;
//     }
//     get temperature() {
//         return 5/9 * (this.#fahrenheit - 32)
//     }
//     set temperature(tempInC){
//         this.#fahrenheit = tempInC * 9/5 + 32
//     }
// }
//
// const thermos = new Thermostat(76);
// console.log(thermos.temperature); // 24.4
// thermos.temperature = 26;
// console.log(thermos.temperature); // 26
// console.log(thermos.farenheit); // error

// Closure is composed of 2 separate parts:
// A private scope contained within a function, and
// Some means of accessing variables within that scope

const Thermostat = (fahrenheit) => {
    // here we have the variable ---> fahrenheit
    // completely hidden from the outside world.

    // we'll define those same getters and setters
    // but note we access the variable, not property
    return {
        get temperature() {
            return 5/9 * (fahrenheit-32); // we have this variable
            // but instance won't have it.
        },
        set temperature(tempInC) {
            fahrenheit = tempInC * 9/5+32
        }
    }
}

// Factory function -> don't use NEW keyword
const thermos = Thermostat(76);
// but thermos.fahrenheit is not accessible

// Exactly the same as classes result
console.log(thermos.temperature); // 24.4
thermos.temperature = 26;
console.log(thermos.temperature); // 26


 */

// Example with TTT

// factory function
const TicTacToe = () => {
    let board = new Array(9).fill("");
    let player1 = {name: 'Margaret', icon: 'X'};
    let player2 = {name: 'Bert', icon: 'O'};
    let currentPlayer = player1;

    const switchPlayers = () => {
        if (currentPlayer === player1){
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    // our return interface
    return { // return object
        switchPlayers,
        player2,
        currentPlayer,
        board,
    }
}

// gameboard
const game = TicTacToe();

game.board[4] = game.currentPlayer.icon;
console.log(game.board); // board[4] = X

// switch to player2 with his icon O
game.switchPlayers();
// game.currentPlayer = game.player2; // works, but it has to do it by itself
game.board[0] = game.currentPlayer.icon;
console.log(game.board); // board[0] = X, but has to be O

console.log(game); // game object -> switchPlayer -> Scopes -> Closure -> Current player === Bert, O. But we get Margaret still
// because game.currentPlayer still refers to Margaret
// to solve this we need getter


console.log(game.player2); // Bert, O
console.log(game.currentPlayer) // Margaret, X
console.log(game.currentPlayer === game.player2); // false

// when we created object in factory function "return {}" -> we referred to the value at the moment we created it. We took a snapshot of that primitive
// Then we update the variable pointing it to a new memory location, but the object property is completely disconnected from the variable
// and even if inside switchPlayer, currentPlayer changed referrence to player2, object 'game' still has currentPlayer === player1
// and still game.currentPlayer === player1 as it was in "return {}"


const Player = (name, icon) => {
    return {
        get name() {return name; },
        get icon() {return icon; },
    }
}

const Board = () => {
    let board = new Array(9).fill("");
    // .at will be an interface method,
    // letting us get and set a board member/icon
    const at = (index) => ({
        get value() {return board[index]},
        set value(val) {board[index] = val;},
    })
    const reset = () => board.fill("");
    return {
        at,
        reset,
        get value(){return [...board];}
    }
}

const TicTacToe2 = (player1Name, player2Name) => {
    let board = Board()
    let player1 = Player(player1Name, 'X')
    let player2 = Player(player2Name, 'O')
    let currentPlayer = player1;

    const switchPlayers = () => {
        if (currentPlayer === player1){
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    return {
        switchPlayers,
        board,
        get currentPlayer() { return currentPlayer;}
    }
};


const game2 = TicTacToe2('Margaret', 'Bert');
game2.board.at(4).value = game.currentPlayer.icon;
console.log(game2.board.value); // board[4] = X

game2.switchPlayers();
game2.board.at(0).value = game2.currentPlayer.icon; // get currentPlayer() function works!
console.log(game2.board.value); // board[0] = O. Works!

// but we can do that
game2.board = new Array(9).fill('');
console.log(game2.board.value); // undefined. connection between board variable and board object was broken

// to solve this we can use Object.freeze(). It prevents "return {} object" in factory function be overwritten
const Player3 = (name, icon) => {
    return Object.freeze({
        get name() {return name; },
        get icon() {return icon; },
    })
}

const Board3 = () => {
    let board = new Array(9).fill("");
    // .at will be an interface method,
    // letting us get and set a board member/icon
    const at = (index) => ({
        get value() {return board[index]},
        set value(val) {board[index] = val;},
    })
    const reset = () => board.fill("");
    return Object.freeze({
        at,
        reset,
        get value(){return [...board];}
    })
}

const TicTacToe3 = (player1Name, player2Name) => {
    let board = Board3()
    let player1 = Player3(player1Name, 'X')
    let player2 = Player3(player2Name, 'O')
    let currentPlayer = player1;

    const switchPlayers = () => {
        if (currentPlayer === player1){
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    return Object.freeze({
        switchPlayers,
        board,
        get currentPlayer() { return currentPlayer;}
    })
};

const game3 = TicTacToe3('Margaret', 'Bert')
game3.switchPlayers(); // still works, even if it's also 'froze'
game3.board.at(8).value = game.currentPlayer.icon;
console.log(game3.board.value)
// game3.board = new Array(9).fill(''); // error, because of Object.freeze()
