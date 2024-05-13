import {useState} from "react";

function StateExample1() {
    const [counter, setCounter] = useState(0);
    const [value, setValue] = useState('');
    function increment() {
        setCounter(prev => prev + 1)
        console.log(counter)
    }
    function onChange(e) {
        setValue(e.target.value);
    }
    return (
        <div>
            <h1>{counter}</h1>
            <button onClick={increment}>Increment</button>
            <p>Value of input: {value}</p>
            <input type="text" onChange={onChange} value={value}/>
        </div>
    )
}

export {StateExample1}