"use strict";

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