import {useEffect, useState} from "react";

// Disabled Strict mode

// with dependencies array

// So we have 2 reactive variables or 2 states => counter and someMessage
// First render -> we console.log(counter) and useEffect keeps in mind 'return function' which he will run on the next
// render. current output in console.log is 0 => we press first button it triggers re-render of component
// now useEffect compares dependencies array old value with new, 0 != 1 it means he returns function he kept in mind
// and goes to the next render and console.log(counter). Current output is 0->42->1
// Now if we press second button(message) it's also triggers re-render of component, but useEffect will compare
// old value of counter and new, it did not change and then it wont do anything

// without dependencies array

// First render -> useEffect console.log(counter) and keeps in mind 'return function'. We press ANY of buttons, they
// both triggers re-render and now useEffect returns function which console.log(42) and logs console.log(counter)
// if we pressed 'message' button then output right now is: 0->42->0

function TestUseEffect() {
    const [counter, setCounter] = useState(0)
    const [someMessage, setSomeMessage] = useState('message')

    useEffect(() => {
        console.log(counter)
        return () => console.log(42)
    })

    function handleCounter() {
        setCounter(prevCounter => prevCounter + 1)
    }

    function handleMessage() {
        setSomeMessage(prevMessage => {
            const randomNum = Math.random() * 100
            return `${randomNum}`
        })
    }

    return (
        <div>
            <button onClick={handleCounter}>{counter}</button>
            <button onClick={handleMessage}>{someMessage}</button>
        </div>
    )

}

export default TestUseEffect