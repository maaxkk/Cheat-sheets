import {useRef} from "react";

function RefExample2() {
    const inputRef = useRef(null);

    const onClick = () => {
        inputRef.current.value = '';
    }
    return (
        <div>
            <h1>Pedro</h1>
            <input ref={inputRef} type="text" placeholder={'Ex...'}/>
            <button onClick={onClick}>Change name</button>
        </div>
    )
}

export {RefExample2}