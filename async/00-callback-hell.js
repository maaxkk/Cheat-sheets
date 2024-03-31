"use strict";

// function task1(callback){
//     setTimeout(() => {
//         console.log('Task 1 complete')
//         callback()
//     }, 2000)
// }
// function task2(callback){
//     setTimeout(() => {
//         console.log('Task 2 complete')
//         callback()
//     }, 1000)
// }
// function task3(callback){
//     setTimeout(() => {
//         console.log('Task 3 complete')
//         callback()
//     }, 3000)
// }
// function task4(callback){
//     setTimeout(() => {
//         console.log('Task 4 complete')
//         callback()
//     }, 1500)
// }
//
// task1(() => {
//     task2(() => {
//         task3(() => {
//             task4(() => console.log('All tasks complete'))
//         })
//     })
// })


// The same but with promises

function task1(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Task 1 complete')
        }, 2000)
    })
}
function task2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Task 2 complete')
        }, 1000)
    })
}
function task3(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Task 3 complete')
        }, 3000)
    })
}
function task4(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Task 4 complete')
        }, 1500)
    })
}

task1().then(message => {console.log(message); return task2()})
    .then(message => {console.log(message); return task3()})
    .then(message => {console.log(message); return task4()})
    .then(message => {console.log(message)})


// Or with console.log()

// function task1(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('Task 1 complete')
//             resolve()
//         }, 2000)
//     })
// }
// function task2(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('Task 2 complete')
//             resolve()
//         }, 1000)
//     })
// }
// function task3(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('Task 3 complete')
//             resolve()
//         }, 3000)
//     })
// }
// function task4(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('Task 4 complete')
//             resolve()
//         }, 1500)
//     })
// }
//
// task1().then(() => { return task2()})
//     .then(() => { return task3()})
//     .then(() => { return task4()})
//     .then();