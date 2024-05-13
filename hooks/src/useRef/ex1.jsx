import {useEffect, useRef} from "react";


function RefExample1() {
    const buttonRef = useRef(null);

    useEffect(() => {
        buttonRef.current.focus();
        buttonRef.current.textContent = "Hey, I'm different!";
        let timeout = setTimeout(() => {
            buttonRef.current.textContent = 'Click me';
        }, 2000);
        return () => {
            clearTimeout(timeout);
        }
    }, []);
    return <button ref={buttonRef}>Click Me!</button>;
}

export {RefExample1}