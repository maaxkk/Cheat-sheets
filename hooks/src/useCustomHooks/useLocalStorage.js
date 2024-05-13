import {useState} from "react";

function useLocalStorage(key) {
    const [personData, setPersonData] = useState(
        () => JSON.parse(localStorage.getItem(`${key}`)) || {}
    )

    return [personData, setPersonData];
}

export {useLocalStorage}